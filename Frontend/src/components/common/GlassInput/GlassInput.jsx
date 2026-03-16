import React, { useState } from 'react';
import './GlassInput.scss';

const GlassInput = ({
  label,
  type = 'text',
  placeholder,
  icon,
  value,
  onChange,
  id,
  name,
  required = false,
  autoComplete,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const isPassword = type === 'password';
  const inputType = isPassword && showPassword ? 'text' : type;

  return (
    <div className={`glass-input-wrapper ${isFocused ? 'focused' : ''}`}>
      {label && <label className="glass-input__label" htmlFor={id}>{label}</label>}
      <div className="glass-input__container">
        {icon && (
          <span className="glass-input__icon material-symbols-outlined">
            {icon}
          </span>
        )}
        <input
          id={id}
          name={name}
          type={inputType}
          className="glass-input__field"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          autoComplete={autoComplete}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        {isPassword && (
          <button
            type="button"
            className="glass-input__toggle"
            onClick={() => setShowPassword(!showPassword)}
            tabIndex={-1}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            <span className="material-symbols-outlined">
              {showPassword ? 'visibility' : 'visibility_off'}
            </span>
          </button>
        )}
      </div>
    </div>
  );
};

export default GlassInput;
