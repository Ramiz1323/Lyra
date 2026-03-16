import React from 'react';
import './Divider.scss';

const Divider = ({ text = 'OR CONTINUE WITH' }) => {
  return (
    <div className="divider">
      <div className="divider__line" />
      <span className="divider__text">{text}</span>
      <div className="divider__line" />
    </div>
  );
};

export default Divider;
