import React from 'react';
import Header from '../components/Header/Header';
import ResultCard from '../components/ResultCard/ResultCard';
import Footer from '../components/Footer/Footer';
import './Result.css';

function Result() {
  return (
    <div className="result-page">
      <Header />
      <main className="result-main">
        <ResultCard />
      </main>
      <Footer />
    </div>
  );
}

export default Result;