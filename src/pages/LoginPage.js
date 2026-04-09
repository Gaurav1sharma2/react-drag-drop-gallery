import React, { useState } from 'react';
import '../styles/LoginPage.css';

function LoginPage({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(email, password);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Login</h1>
        <p className="subtitle">Drag & Drop Gallery Demo</p>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="user@example.com"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="password123"
              required
            />
          </div>

          <button type="submit" className="login-btn">Login</button>
        </form>

        <div className="dummy-credentials">
          <h3>Demo Credentials:</h3>
          <p><strong>Email:</strong> user@example.com</p>
          <p><strong>Password:</strong> password123</p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
