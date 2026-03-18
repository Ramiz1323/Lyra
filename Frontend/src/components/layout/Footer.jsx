import React from 'react';
import './Footer.scss';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-left">
          <p>© 2024 Lyra AI Research Inc. All rights reserved.</p>
        </div>
        <div className="footer-right">
          <a href="#privacy">Privacy</a>
          <a href="#terms">Terms</a>
          <a href="#status">Status</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
