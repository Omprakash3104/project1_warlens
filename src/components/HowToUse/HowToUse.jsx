import React from 'react';
import { motion } from 'framer-motion';
import { step1Icon, step2Icon, step3Icon } from '../../assets';
import './HowToUse.css';

const steps = [
  {
    icon: step1Icon,
    title: "Upload Image",
    description: "Select or drag & drop your warzone imagery"
  },
  {
    icon: step2Icon,
    title: "AI Analysis",
    description: "Our advanced AI model processes the image"
  },
  {
    icon: step3Icon,
    title: "Get Results",
    description: "Receive detailed classification and aid recommendations"
  }
];

function HowToUse() {
  return (
    <section id="how-to-use" className="how-to-use">
      <div className="container">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          How It Works
        </motion.h2>
        <div className="steps-container">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="step-item"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <div className="step-icon">
                <img src={step.icon} alt={step.title} />
              </div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
              {index < steps.length - 1 && <div className="step-connector" />}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HowToUse;