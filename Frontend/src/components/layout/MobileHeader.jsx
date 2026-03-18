import React from 'react';
import './MobileHeader.scss';

const MobileHeader = () => {
  return (
    <header className="mobile-header">
      <button className="menu-btn">
        <div className="hamburger"></div>
      </button>
      <span className="mobile-logo">Lyra AI</span>
      <div className="header-actions">
        <div className="profile-icon">👤</div>
        <button className="power-btn">⚡</button>
      </div>
    </header>
  );
};

export default MobileHeader;
