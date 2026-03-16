import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './AuthNavbar.scss';

const AuthNavbar = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';

  return (
    <nav className="auth-navbar">
      <div className="auth-navbar__inner">
        {/* Logo */}
        <Link to="/" className="auth-navbar__logo">
          <div className="auth-navbar__logo-icon">
            <span className="material-symbols-outlined">auto_awesome</span>
          </div>
          <span className="auth-navbar__logo-text">Lyra AI</span>
        </Link>

        {/* Nav Links */}
        <div className="auth-navbar__links">
          <a href="#product" className="auth-navbar__link">Product</a>
          <a href="#features" className="auth-navbar__link">Features</a>
          <a href="#pricing" className="auth-navbar__link">Pricing</a>
        </div>

        {/* CTA */}
        <Link
          to={isLoginPage ? '/signup' : '/login'}
          className="auth-navbar__cta"
        >
          {isLoginPage ? 'Sign Up' : 'Log In'}
        </Link>
      </div>
    </nav>
  );
};

export default AuthNavbar;
