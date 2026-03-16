import React from 'react';
import AuthNavbar from '../../components/layout/AuthNavbar/AuthNavbar';
import AuthHero from '../../features/auth/AuthHero/AuthHero';
import SignupForm from '../../features/auth/SignupForm/SignupForm';
import './SignupPage.scss';

const SignupPage = () => {
  return (
    <div className="signup-page">
      <AuthNavbar />
      <main className="signup-page__main">
        <div className="signup-page__hero-side">
          <AuthHero />
        </div>
        <div className="signup-page__form-side">
          <SignupForm />
        </div>
      </main>

      {/* Footer */}
      <footer className="signup-page__footer">
        <div className="signup-page__footer-inner">
          <span className="signup-page__copyright">
            &copy; 2026 Lyra AI Technologies
          </span>
          <div className="signup-page__footer-links">
            <a href="#status">Status</a>
            <a href="#help">Help Center</a>
          </div>
          <div className="signup-page__footer-right">
            <span className="signup-page__footer-label">Language</span>
            <a href="#lang">English (US)</a>
            <a href="#twitter">Twitter</a>
            <a href="#linkedin">LinkedIn</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SignupPage;
