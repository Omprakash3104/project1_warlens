import React from 'react';
import Header from '../components/Header/Header';
import Hero from '../components/Hero/Hero';
import About from '../components/About/About';
import Features from '../components/Features/Features';
import HowToUse from '../components/HowToUse/HowToUse';
import Footer from '../components/Footer/Footer';

function Home() {
  return (
    <>
      <Header />
      <Hero />
      <About />
      <Features />
      <HowToUse />
      <Footer />
    </>
  );
}

export default Home;