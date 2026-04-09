import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import GalleryPage from './pages/GalleryPage';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (email, password) => {
    // Dummy credentials
    if (email === 'user@example.com' && password === 'password123') {
      setIsLoggedIn(true);
    } else {
      alert('Invalid credentials! Use user@example.com / password123');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={isLoggedIn ? <GalleryPage onLogout={handleLogout} /> : <LoginPage onLogin={handleLogin} />} 
        />
      </Routes>
    </Router>
  );
}

export default App;
