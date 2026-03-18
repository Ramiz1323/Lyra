import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import GlassInput from '@components/common/GlassInput/GlassInput';
import GlassButton from '@components/common/GlassButton/GlassButton';
import SocialButton from '@components/common/SocialButton/SocialButton';
import Divider from '@components/common/Divider/Divider';
import { useAuth } from '@features/auth/hooks/useAuth';
import './SignupForm.scss';

const SignupForm = () => {
  const navigate = useNavigate();
  const { handleSignup, user, loading, error } = useAuth();

  useEffect(() => {
    if (!loading && user) {
      navigate("/");
    }
  }, [user, loading, navigate]);

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, email, password } = formData;
    await handleSignup({ username, email, password });
    navigate("/login");
  };

  return (
    <div className="signup-form">
      <div className="signup-form__glass-card">
        {/* Header */}
        <div className="signup-form__header">
          <h2 className="signup-form__title">Create Account</h2>
        </div>

        {/* Form */}
        <form className="signup-form__fields" onSubmit={handleSubmit}>
          {error && <div className="signup-form__error">{error}</div>}

          <div className="signup-form__name-row">
            <GlassInput
              label="Username"
              type="text"
              placeholder="Jane123"
              id="signup-username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              autoComplete="username"
            />
          </div>

          <GlassInput
            label="Email Address"
            type="email"
            placeholder="jane@example.com"
            icon="mail"
            id="signup-email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            autoComplete="email"
          />

          <GlassInput
            label="Password"
            type="password"
            placeholder="Min. 8 characters"
            icon="lock"
            id="signup-password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            autoComplete="new-password"
          />

          {/* Terms */}
          <label className="signup-form__terms" htmlFor="signup-terms">
            <input
              type="checkbox"
              id="signup-terms"
              checked={agreedToTerms}
              onChange={(e) => setAgreedToTerms(e.target.checked)}
              className="signup-form__checkbox"
            />
            <span className="signup-form__checkmark" />
            <span className="signup-form__terms-text">
              I agree to the{' '}
              <a href="#terms" className="signup-form__link">Terms of Service</a>
              {' '}and{' '}
              <a href="#privacy" className="signup-form__link">Privacy Policy</a>.
            </span>
          </label>

          <GlassButton
            type="submit"
            variant="primary"
            fullWidth
            icon={loading ? null : "arrow_forward"}
            id="signup-submit-btn"
            disabled={!agreedToTerms || loading}
          >
            {loading ? "Creating Account..." : "Create Account"}
          </GlassButton>
        </form>

        <Divider text="OR SIGN UP WITH" />

        {/* Social Buttons */}
        <div className="signup-form__social">
          <SocialButton provider="google" id="signup-google-btn" />
        </div>

        {/* Footer */}
        <p className="signup-form__footer">
          Already have an account?{' '}
          <Link to="/login" className="signup-form__link">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupForm;
