import React from 'react';
import './MobileLayout.scss';

const MobileLayout = ({ children }) => {
  return (
    <div className="mobile-only">
      <main className="mobile-content">
        {children}
      </main>
    </div>
  );
};

export default MobileLayout;
