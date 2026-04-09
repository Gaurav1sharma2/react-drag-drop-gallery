import React, { useState } from 'react';
import '../styles/LoginPage.css';

function LoginPage({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    
    if (!email) {
      newErrors.email = 'Email is required';
    }
    if (!password) {
      newErrors.password = 'Password is required';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setErrors({});
    onLogin(email, password);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Login</h1>
        <p className="subtitle">Drag & Drop Gallery Demo</p>
        
        <form onSubmit={handleSubmit} noValidate aria-label="Login form">
          <div className="form-group">
            <label htmlFor="email">
              Email
              <span className="required-indicator" aria-label="required">*</span>
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) {
                  setErrors({ ...errors, email: '' });
                }
              }}
              placeholder="user@example.com"
              required
              aria-required="true"
              aria-describedby={errors.email ? 'email-error' : undefined}
              aria-invalid={!!errors.email}
            />
            {errors.email && (
              <span id="email-error" className="error-message" role="alert">
                {errors.email}
              </span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="password">
              Password
              <span className="required-indicator" aria-label="required">*</span>
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errors.password) {
                  setErrors({ ...errors, password: '' });
                }
              }}
              placeholder="password123"
              required
              aria-required="true"
              aria-describedby={errors.password ? 'password-error' : undefined}
              aria-invalid={!!errors.password}
            />
            {errors.password && (
              <span id="password-error" className="error-message" role="alert">
                {errors.password}
              </span>
            )}
          </div>

          <button 
            type="submit" 
            className="login-btn"
            aria-label="Submit login form"
          >
            Login
          </button>
        </form>

        <div className="dummy-credentials" role="region" aria-label="Demo credentials">
          <h3>Demo Credentials:</h3>
          <p><strong>Email:</strong> <code>user@example.com</code></p>
          <p><strong>Password:</strong> <code>password123</code></p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
