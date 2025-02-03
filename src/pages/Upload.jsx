import React from 'react';
import Header from '../components/Header/Header';
import ImageUpload from '../components/ImageUpload/ImageUpload';
import Footer from '../components/Footer/Footer';
import './Upload.css';

function Upload() {
  return (
    <div className="upload-page">
      <Header />
      <main className="upload-main">
        <div className="upload-content">
          <h1>Upload Image for Analysis</h1>
          <p>Upload your warzone imagery for AI-powered analysis and classification</p>
          <ImageUpload />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Upload;