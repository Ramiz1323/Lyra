import React from 'react';
import './Navbar.scss';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <header className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <div className="brand-logo">
            <span className="material-symbols-outlined">auto_awesome</span>
          </div>
          <span className="brand-name">Lyra AI</span>
        </div>

        <div className="navbar-menu">
          <a href="#models" className="nav-link">Models</a>
          <a href="#pricing" className="nav-link">Pricing</a>
          <a href="#enterprise" className="nav-link">Enterprise</a>
          <a href="#docs" className="nav-link">Docs</a>
        </div>

        <div className="navbar-actions">
          <Link to="/chat" className="launch-btn">
            Launch Lyra
            <span className="material-symbols-outlined">rocket_launch</span>
          </Link>
          <div className="profile-section">
            <div className="user-info">
              <span className="user-name">{user?.name || 'Explorer'}</span>
              <span className="user-plan">Pro Member</span>
            </div>
            <div className="profile-circle">
              <img src={user?.avatar || "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"} alt="User" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
