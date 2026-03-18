import React from 'react';
import './Hero.scss';

const Hero = () => {
  const suggestions = [
    "Summarize the latest quantum news",
    "Write a Python FastAPI backend",
    "Design a glassmorphism landing page"
  ];

  return (
    <section className="hero">
      <div className="hero-content">
        <div className="badge">
          <span className="dot"></span>
          LYRA-2.5 NOW AVAILABLE
        </div>
        
        <h1 className="hero-title">
          The future of <span className="highlight">Intelligence</span>
        </h1>
        
        <p className="hero-subtitle">
          Experience the next-gen search engine powered by liquid-glass architecture. 
          Research, code, and create with unprecedented depth.
        </p>

        <div className="search-container-wrapper">
          <div className="search-container">
            <span className="search-icon">🔍</span>
            <input 
              type="text" 
              placeholder="Ask Lyra anything..." 
              className="search-input"
            />
            <div className="input-actions">
              <span className="mic-icon">🎙️</span>
              <button className="search-btn">
                <span className="btn-text">Search</span>
                <span className="arrow">→</span>
              </button>
            </div>
          </div>
        </div>

        <div className="suggestions">
          {suggestions.map((text, i) => (
            <button key={i} className="suggestion-pill">
              "{text}"
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
