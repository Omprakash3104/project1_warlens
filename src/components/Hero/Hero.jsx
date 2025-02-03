import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Hero.css';

function Hero() {
  return (
    <section className="hero">
      <div className="container hero-content">
        <motion.div 
          className="hero-text"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1>Detect and Analyze War Zone Imagery</h1>
          <p>
            Advanced AI-powered platform for analyzing and classifying warzone 
            imagery to assist in humanitarian aid and disaster response.
          </p>
          <Link to="/upload" className="btn-primary">
            Start Analysis
          </Link>
        </motion.div>
        <motion.div 
          className="hero-image"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <img src="/hero-image.png" alt="AI Analysis Visualization" />
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;