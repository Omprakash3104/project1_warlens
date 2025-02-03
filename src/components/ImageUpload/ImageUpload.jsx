import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import './ImageUpload.css';

function ImageUpload() {
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    setPreview(URL.createObjectURL(file));
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png']
    },
    multiple: false
  });

  const handleClassify = async () => {
    if (!preview) return;

    setLoading(true);
    try {
      const formData = new FormData();
      const response = await fetch(preview);
      const blob = await response.blob();
      formData.append('image', blob, 'image.jpg');

      const result = await axios.post('http://localhost:5000/upload', formData);
      navigate('/result', { state: { data: result.data } });
    } catch (error) {
      console.error('Error classifying image:', error);
      alert('Error processing image. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="upload-container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="upload-box"
      >
        <div {...getRootProps()} className={`dropzone ${isDragActive ? 'active' : ''}`}>
          <input {...getInputProps()} />
          {preview ? (
            <img src={preview} alt="Preview" className="preview-image" />
          ) : (
            <div className="upload-prompt">
              <i className="upload-icon">📁</i>
              <p>Drag & drop an image here, or click to select</p>
            </div>
          )}
        </div>
        
        {preview && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="classify-button"
            onClick={handleClassify}
            disabled={loading}
          >
            {loading ? 'Processing...' : 'Classify Image'}
          </motion.button>
        )}
      </motion.div>
    </div>
  );
}

export default ImageUpload;