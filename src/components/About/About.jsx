import React from 'react';
import { motion } from 'framer-motion';
import './About.css';

function About() {
  return (
    <section id="about" className="about">
      <div className="container">
        <motion.div 
          className="about-content"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2>About WarZone Detector</h2>
          <div className="about-grid">
            <div className="about-text">
              <p>
                WarZone Detector is an advanced AI-powered platform designed to analyze
                and classify warzone imagery. Our system helps humanitarian organizations
                and first responders quickly assess situations and coordinate aid efforts.
              </p>
              <p>
                Using state-of-the-art machine learning models, we provide accurate
                classifications and detailed analysis of disaster scenarios, enabling
                faster and more effective response strategies.
              </p>
            </div>
            <div className="about-stats">
              <div className="stat-item">
                <h3>95%</h3>
                <p>Accuracy Rate</p>
              </div>
              <div className="stat-item">
                <h3>24/7</h3>
                <p>Analysis Available</p>
              </div>
              <div className="stat-item">
                <h3>100+</h3>
                <p>Organizations Served</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default About;