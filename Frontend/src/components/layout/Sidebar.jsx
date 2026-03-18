import React from 'react';
import './Sidebar.scss';

const Sidebar = () => {
  const menuItems = [
    { icon: '🏠', label: 'Home', active: true },
    { icon: '🧭', label: 'Research', active: false },
    { icon: '💻', label: 'Code', active: false },
    { icon: '🎨', label: 'Visuals', active: false },
    { icon: '🕒', label: 'History', active: false },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="logo-icon">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L2 19H22L12 2Z" fill="currentColor" />
          </svg>
        </div>
        <span className="logo-text">Lyra AI</span>
      </div>

      <nav className="sidebar-nav">
        {menuItems.map((item, index) => (
          <div key={index} className={`nav-item ${item.active ? 'active' : ''}`}>
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </div>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="pro-card">
          <span className="pro-tag">PRO PLAN</span>
          <p>Get 10x more research depth and faster generations.</p>
          <button className="upgrade-btn">
            <span className="btn-icon">⚡</span>
            Upgrade
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
