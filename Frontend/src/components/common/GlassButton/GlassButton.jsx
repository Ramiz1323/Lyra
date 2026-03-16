import React from 'react';
import './GlassButton.scss';

const GlassButton = ({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  fullWidth = false,
  icon,
  disabled = false,
  id,
}) => {
  return (
    <button
      id={id}
      type={type}
      className={`glass-btn glass-btn--${variant} ${fullWidth ? 'glass-btn--full' : ''}`}
      onClick={onClick}
      disabled={disabled}
    >
      <span className="glass-btn__content">
        <span className="glass-btn__text">{children}</span>
        {icon && (
          <span className="glass-btn__icon material-symbols-outlined">
            {icon}
          </span>
        )}
      </span>
    </button>
  );
};

export default GlassButton;
