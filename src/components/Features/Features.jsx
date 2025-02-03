import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { aiAnalysisIcon, realTimeIcon, accuracyIcon, humanitarianIcon } from '../../assets';
import './Features.css';

const featuresList = [
  {
    icon: aiAnalysisIcon,
    title: "AI-Powered Analysis",
    description: "Advanced machine learning algorithms for accurate warzone imagery classification"
  },
  {
    icon: realTimeIcon,
    title: "Real-Time Processing",
    description: "Instant analysis and results for quick decision making"
  },
  {
    icon: accuracyIcon,
    title: "High Accuracy",
    description: "Precise detection and classification with state-of-the-art models"
  },
  {
    icon: humanitarianIcon,
    title: "Humanitarian Aid",
    description: "Facilitating quick response for disaster relief and aid distribution"
  }
];

function FeatureCard({ icon, title, description, index }) {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true
  });

  return (
    <motion.div
      ref={ref}
      className="feature-card"
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="feature-icon">
        <img src={icon} alt={title} />
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
    </motion.div>
  );
}

function Features() {
  return (
    <section id="features" className="features">
      <div className="container">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          Key Features
        </motion.h2>
        <div className="features-grid">
          {featuresList.map((feature, index) => (
            <FeatureCard key={index} {...feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;