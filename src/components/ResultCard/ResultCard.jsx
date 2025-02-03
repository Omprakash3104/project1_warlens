import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './ResultCard.css';

function ResultCard() {
  const location = useLocation();
  const result = location.state?.data;

  if (!result) {
    return (
      <div className="result-error">
        <h2>No Result Data Available</h2>
        <Link to="/upload" className="btn-primary">
          Try Again
        </Link>
      </div>
    );
  }

  return (
    <div className="result-page">
      <motion.div 
        className="result-card"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2>Analysis Results</h2>
        
        <div className="result-grid">
          <div className="result-item">
            <h3>Category</h3>
            <p>{result.category}</p>
          </div>
          
          <div className="result-item">
            <h3>Confidence</h3>
            <p>{result.confidence}</p>
          </div>
          
          <div className="result-item">
            <h3>Severity</h3>
            <div className={`severity-badge ${result.severity.toLowerCase()}`}>
              {result.severity}
            </div>
          </div>
          
          <div className="result-item">
            <h3>Aid Required</h3>
            <p>{result.aid_required}</p>
          </div>
          
          <div className="result-item full-width">
            <h3>Immediate Needs</h3>
            <ul className="needs-list">
              {result.immediate_needs.map((need, index) => (
                <li key={index}>{need}</li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="result-actions">
          <Link to="/upload" className="btn-secondary">
            Analyze Another Image
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

export default ResultCard;