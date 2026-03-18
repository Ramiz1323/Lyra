import React from 'react';
import './AuthHero.scss';

const AuthHero = () => {
  return (
    <div className="auth-hero">
      {/* Floating orbs for ambient effect */}
      <div className="auth-hero__orb auth-hero__orb--1" />
      <div className="auth-hero__orb auth-hero__orb--2" />
      <div className="auth-hero__orb auth-hero__orb--3" />

      <div className="auth-hero__content">

        <h1 className="auth-hero__title">
          The search for{' '}
          <span className="auth-hero__highlight">knowledge</span>{' '}
          ends here.
        </h1>

        <p className="auth-hero__description">
          Synthesize complex data into actionable insights instantly with Lyra's AI-powered search.
        </p>

        {/* Feature Cards */}
        <div className="auth-hero__features">
          <div className="auth-hero__feature-card">
            <div className="auth-hero__feature-icon">
              <span className="material-symbols-outlined">auto_awesome</span>
            </div>
            <div className="auth-hero__feature-info">
              <h4>Neural Synthesis</h4>
              <p>Advanced AI that understands context, not just keywords.</p>
            </div>
          </div>

          <div className="auth-hero__feature-card">
            <div className="auth-hero__feature-icon">
              <span className="material-symbols-outlined">security</span>
            </div>
            <div className="auth-hero__feature-info">
              <h4>Privacy First</h4>
              <p>Your data remains yours. Encrypted, private, and secure.</p>
            </div>
          </div>

          <div className="auth-hero__feature-card">
            <div className="auth-hero__feature-icon">
              <span className="material-symbols-outlined">bolt</span>
            </div>
            <div className="auth-hero__feature-info">
              <h4>Lightning Fast</h4>
              <p>Real-time results powered by our distributed neural engine.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthHero;
