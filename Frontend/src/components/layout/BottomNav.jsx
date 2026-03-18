import React from 'react';
import './BottomNav.scss';

const BottomNav = () => {
  const navItems = [
    { icon: '🔍', label: 'Search', active: true },
    { icon: '🕒', label: 'History', active: false },
    { icon: '📚', label: 'Library', active: false },
    { icon: '⚙️', label: 'Settings', active: false },
  ];

  return (
    <nav className="bottom-nav">
      <div className="nav-items-left">
        {navItems.slice(0, 2).map((item, i) => (
          <div key={i} className={`nav-item ${item.active ? 'active' : ''}`}>
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </div>
        ))}
      </div>

      <div className="fab-container">
        <button className="fab">
          <span className="plus">+</span>
        </button>
      </div>

      <div className="nav-items-right">
        {navItems.slice(2).map((item, i) => (
          <div key={i} className={`nav-item ${item.active ? 'active' : ''}`}>
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </div>
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;
