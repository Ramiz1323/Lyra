import React from 'react';
import AuthNavbar from '../../components/layout/AuthNavbar/AuthNavbar';
import AuthHero from '../../features/auth/AuthHero/AuthHero';
import LoginForm from '../../features/auth/LoginForm/LoginForm';
import './LoginPage.scss';

const LoginPage = () => {
  return (
    <div className="login-page">
      <AuthNavbar />
      <main className="login-page__main">
        <div className="login-page__hero-side">
          <AuthHero />
        </div>
        <div className="login-page__form-side">
          <LoginForm />
        </div>
      </main>

      {/* Footer */}
      <footer className="login-page__footer">
        <div className="login-page__footer-inner">
          <div className="login-page__footer-links">
            <a href="#privacy">Privacy Policy</a>
            <a href="#terms">Terms of Service</a>
            <a href="#help">Help Center</a>
          </div>
          <p className="login-page__copyright">
            &copy; 2024 Lyra AI Search. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LoginPage;
