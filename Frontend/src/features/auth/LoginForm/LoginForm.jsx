import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import GlassInput from '../../../components/common/GlassInput/GlassInput';
import GlassButton from '../../../components/common/GlassButton/GlassButton';
import SocialButton from '../../../components/common/SocialButton/SocialButton';
import Divider from '../../../components/common/Divider/Divider';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import './LoginForm.scss';

const LoginForm = () => {
  const { handleLogin, loading, error } = useAuth();
  const [ formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;
    await handleLogin({ email, password });
    navigate("/");
  };

  return (
    <div className="login-form">
      <div className="login-form__glass-card">
        {/* Header */}
        <div className="login-form__header">
          <h2 className="login-form__title">Welcome back</h2>
          <p className="login-form__subtitle">Access your AI-powered workspace</p>
        </div>

        {/* Social Buttons */}
        <div className="login-form__social">
          <SocialButton provider="google" id="login-google-btn" />
        </div>

        <Divider />

        {/* Form */}
        <form className="login-form__fields" onSubmit={handleSubmit}>
          {error && <div className="login-form__error">{error}</div>}
          
          <GlassInput
            label="Email Address"
            type="email"
            placeholder="name@company.com"
            icon="mail"
            id="login-email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            autoComplete="email"
          />

          <div className="login-form__password-header">
            <GlassInput
              label="Password"
              type="password"
              placeholder="••••••••"
              icon="lock"
              id="login-password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              autoComplete="current-password"
            />
            <Link to="/forgot-password" className="login-form__forgot">
              Forgot password?
            </Link>
          </div>

          <GlassButton
            type="submit"
            variant="primary"
            fullWidth
            icon={loading ? null : "arrow_forward"}
            id="login-submit-btn"
            disabled={loading}
          >
            {loading ? "Signing In..." : "Sign In"}
          </GlassButton>
        </form>

        {/* Footer */}
        <p className="login-form__footer">
          Don't have an account?{' '}
          <Link to="/signup" className="login-form__link">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
