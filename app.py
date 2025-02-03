
import os
import numpy as np
from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.utils import secure_filename
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.image import load_img, img_to_array
from tensorflow.keras.applications.resnet50 import preprocess_input
import cv2
from PIL import Image
import io

app = Flask(__name__)
CORS(app)

# Configuration
UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}
MODEL_PATH = os.path.join('model', 'war_lens_resnet50.h5')

# Ensure upload folder exists
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16MB max file size

# Load the model
try:
    model = load_model(MODEL_PATH)
    print("Model loaded successfully!")
except Exception as e:
    print(f"Error loading model: {str(e)}")
    model = None

# Class labels for the model
CLASS_LABELS = {
    0: 'Bombing',
    1: 'Fire',
    2: 'Flooding',
    3: 'Military Invasion',
    4: 'Protest'
}

# Severity and aid information for each class
DISASTER_INFO = {
    'Bombing': {
        'severity': 'Critical',
        'aid_required': '$1,000,000',
        'immediate_needs': [
            'Emergency Medical Services',
            'Search and Rescue Teams',
            'Temporary Shelters',
            'Emergency Food and Water'
        ]
    },
    'Fire': {
        'severity': 'High',
        'aid_required': '$500,000',
        'immediate_needs': [
            'Firefighting Equipment',
            'Medical Supplies',
            'Evacuation Support',
            'Water Resources'
        ]
    },
    'Flooding': {
        'severity': 'High',
        'aid_required': '$750,000',
        'immediate_needs': [
            'Rescue Boats',
            'Water Pumps',
            'Emergency Housing',
            'Clean Water Supplies'
        ]
    },
    'Military Invasion': {
        'severity': 'Critical',
        'aid_required': '$2,000,000',
        'immediate_needs': [
            'Military Support',
            'Medical Aid',
            'Evacuation Plans',
            'Emergency Supplies'
        ]
    },
    'Protest': {
        'severity': 'Medium',
        'aid_required': '$250,000',
        'immediate_needs': [
            'Security Forces',
            'Medical Support',
            'Communication Systems',
            'Crowd Control Equipment'
        ]
    }
}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def preprocess_image(image_path):
    # Load and preprocess the image
    img = load_img(image_path, target_size=(224, 224))
    img_array = img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0)
    processed_img = preprocess_input(img_array)
    return processed_img

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'healthy', 'model_loaded': model is not None})

@app.route('/upload', methods=['POST'])
def upload_file():
    try:
        # Check if the post request has the file part
        if 'image' not in request.files:
            return jsonify({'error': 'No file part'}), 400
        
        file = request.files['image']
        
        # If user does not select file
        if file.filename == '':
            return jsonify({'error': 'No selected file'}), 400
        
        if not allowed_file(file.filename):
            return jsonify({'error': 'File type not allowed'}), 400
        
        if model is None:
            return jsonify({'error': 'Model not loaded'}), 500
        
        # Save the file temporarily
        filename = secure_filename(file.filename)
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)
        
        try:
            # Preprocess the image
            processed_img = preprocess_image(filepath)
            
            # Make prediction
            predictions = model.predict(processed_img)
            predicted_class_index = np.argmax(predictions[0])
            predicted_class = CLASS_LABELS[predicted_class_index]
            confidence_score = float(predictions[0][predicted_class_index])
            
            # Get disaster information
            disaster_info = DISASTER_INFO[predicted_class]
            
            # Prepare response
            response = {
                'category': predicted_class,
                'confidence': f"{confidence_score * 100:.2f}%",
                'severity': disaster_info['severity'],
                'aid_required': disaster_info['aid_required'],
                'immediate_needs': disaster_info['immediate_needs']
            }
            
            # Clean up - remove uploaded file
            os.remove(filepath)
            
            return jsonify(response)
            
        except Exception as e:
            # Clean up in case of error
            if os.path.exists(filepath):
                os.remove(filepath)
            raise e
            
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.errorhandler(413)
def too_large(e):
    return jsonify({'error': 'File is too large'}), 413

@app.errorhandler(500)
def internal_error(e):
    return jsonify({'error': 'Internal server error'}), 500

if __name__ == '__main__':
    app.run(debug=True)