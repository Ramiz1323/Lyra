import React from 'react';
import './Hero.scss';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate('/chat');
  };

  const suggestions = [
    "Summarize the latest quantum news",
    "Write a Python FastAPI backend",
    "Design a glassmorphism landing page"
  ];

  return (
    <section className="hero" id="product">
      <div className="hero-content">
        <div className="badge">
          <span className="dot"></span>
          LYRA-3.0 NOW AVAILABLE
        </div>
        
        <h1 className="hero-title">
          The future of <span className="highlight">Intelligence</span>
        </h1>
        
        <p className="hero-subtitle">
          Experience the next-gen search engine powered by liquid-glass architecture. 
          Research, code, and create with unprecedented depth.
        </p>

        <div className="search-container-wrapper">
          <div className="search-area" onClick={handleSearch}>
            <div className="search-input-wrapper">
              <span className="material-symbols-outlined search-icon">search</span>
              <input type="text" placeholder="Explain anything with Lyra..." readOnly />
              <div className="search-actions">
                <span className="material-symbols-outlined">mic</span>
                <button className="search-btn">
                  <span className="material-symbols-outlined">arrow_forward</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="suggestions">
          {suggestions.map((text, i) => (
            <button key={i} className="suggestion-pill" onClick={handleSearch}>
              "{text}"
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
