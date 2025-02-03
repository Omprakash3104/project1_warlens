import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="container header-content">
        <Link to="/" className="logo">
          WarZone Detector
        </Link>
        <nav className="nav-links">
          <Link to="/">Home</Link>
          <a href="#about">About</a>
          <a href="#features">Features</a>
          <a href="#how-to-use">How to Use</a>
          <Link to="/upload" className="btn-primary">
            Get Started
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;