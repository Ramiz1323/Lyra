import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub, FaApple } from 'react-icons/fa';
import './SocialButton.scss';

const providerIcons = {
  google: <FcGoogle size={20} />,
  github: <FaGithub size={20} />,
  apple: <FaApple size={20} />,
};

const SocialButton = ({ provider = 'google', onClick, id }) => {
  const label = provider.charAt(0).toUpperCase() + provider.slice(1);

  return (
    <button id={id} type="button" className="social-btn" onClick={onClick}>
      <span className="social-btn__icon">{providerIcons[provider]}</span>
      <span className="social-btn__label">{label}</span>
    </button>
  );
};

export default SocialButton;
