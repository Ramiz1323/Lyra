import React from 'react';
import './Capabilities.scss';

const Capabilities = () => {
  const items = [
    { title: "Semantic Reasoning", subtitle: "Context-aware multi-step logic", icon: "✨" },
    { title: "Live Data Sync", subtitle: "Connected to 140+ real-time APIs", icon: "📊" },
    { title: "Privacy First", subtitle: "Encrypted search & local processing", icon: "🔒" }
  ];

  return (
    <div className="capabilities-section">
      <h3 className="section-subtitle">CAPABILITIES</h3>
      <div className="capabilities-list">
        {items.map((item, i) => (
          <div key={i} className="capability-item">
            <div className="item-icon-wrapper">
              <span className="item-icon">{item.icon}</span>
            </div>
            <div className="item-text">
              <h4 className="item-title">{item.title}</h4>
              <p className="item-subtitle">{item.subtitle}</p>
            </div>
            <span className="chevron">›</span>
          </div>
        ))}
      </div>

      <div className="pro-feature-card">
        <img src="/assets/neural_canvas_pro.png" alt="Neural Canvas" className="card-bg" />
        <div className="card-content">
          <span className="pro-label">PRO FEATURE</span>
          <h3 className="card-title">Try Neural Canvas</h3>
        </div>
        <div className="card-overlay"></div>
      </div>
    </div>
  );
};

export default Capabilities;
