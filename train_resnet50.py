import os
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.applications import ResNet50
from tensorflow.keras.layers import Dense, GlobalAveragePooling2D
from tensorflow.keras.models import Model
from tensorflow.keras.optimizers import Adam

# Step 1: Define the number of classes (e.g., for conflict zones you might have 5 classes like war, protest, etc.)
num_classes = 5  # Change this to the actual number of categories in your dataset

# Step 2: Load Pre-trained ResNet50
base_model = ResNet50(include_top=False, weights='imagenet', input_shape=(224, 224, 3))

# Step 3: Add custom layers for classification
x = base_model.output
x = GlobalAveragePooling2D()(x)
x = Dense(1024, activation='relu')(x)
predictions = Dense(num_classes, activation='softmax')(x)  # Use num_classes here

model = Model(inputs=base_model.input, outputs=predictions)

# Step 4: Freeze ResNet50 layers
for layer in base_model.layers:
    layer.trainable = False

# Step 5: Compile the model
model.compile(optimizer=Adam(learning_rate=0.0001), loss='categorical_crossentropy', metrics=['accuracy'])

# Step 6: Prepare the dataset
train_datagen = ImageDataGenerator(rescale=1./255, validation_split=0.2)

train_generator = train_datagen.flow_from_directory(
    'war_events/',  # Path to dataset (relative)
    target_size=(224, 224),
    batch_size=32,
    class_mode='categorical',
    subset='training')

validation_generator = train_datagen.flow_from_directory(
    'war_events/',
    target_size=(224, 224),
    batch_size=32,
    class_mode='categorical',
    subset='validation')

# Step 7: Train the model
model.fit(train_generator, validation_data=validation_generator, epochs=10)

# Step 8: Save the model
model.save('war_lens_resnet50.h5')
