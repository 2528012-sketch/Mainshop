// src/LoginView.jsx
import React, { useState } from 'react';

export default function LoginView({ onLoginSuccess, onSwitchToSignup }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      if (res.ok) {
        onLoginSuccess(data.token, data.user);
      } else {
        setError(data.error || 'Login failed.');
      }
    } catch (err) {
      setError('Cannot connect to backend server. Make sure server.js is running.');
    }
  };

  return (
    <div style={authStyles.loginBodyRed}>
      <div style={authStyles.cardRed}>
        <h1 style={authStyles.titleRed}>Login</h1>
        {error && <p style={{ color: '#f87171', marginBottom: '1rem', fontSize: '0.9rem' }}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <div style={authStyles.inputGroup}>
            <label style={authStyles.label}>Username</label>
            <input type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Enter your username" style={authStyles.inputFieldRed} required />
          </div>
          <div style={authStyles.inputGroup}>
            <label style={authStyles.label}>Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter your password" style={authStyles.inputFieldRed} required />
          </div>
          <button type="submit" style={authStyles.submitBtnRed}>Login</button>
        </form>
        <div style={authStyles.signupText}>
          Don't have an account? <span onClick={onSwitchToSignup} style={authStyles.linkRed}>Sign Up</span>
        </div>
      </div>
    </div>
  );
}

const authStyles = {
  loginBodyRed: {
    backgroundColor: '#120404',
    backgroundImage: 'radial-gradient(circle at center, rgba(153, 27, 27, 0.2) 0%, rgba(18, 4, 4, 0.95) 70%)',
    backgroundAttachment: 'fixed', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#d1d5db', fontFamily: 'system-ui, sans-serif'
  },
  cardRed: {
    backgroundColor: '#14110f', border: '1px solid rgba(220, 38, 38, 0.2)', borderRadius: '1.5rem', width: '100%', maxWidth: '440px', padding: '2.5rem', boxShadow: '0 20px 40px rgba(0, 0, 0, 0.6)'
  },
  titleRed: { fontSize: '2rem', fontWeight: '700', color: '#f87171', marginBottom: '1.5rem' },
  inputFieldRed: { width: '100%', backgroundColor: '#1a1614', border: '1px solid #292524', borderRadius: '0.5rem', padding: '0.75rem 1rem', color: '#ffffff', fontSize: '0.95rem', outline: 'none', boxSizing: 'border-box', marginTop: '5px' },
  submitBtnRed: { width: '100%', background: 'linear-gradient(135deg, #dc2626 0%, #991b1b 100%)', border: 'none', borderRadius: '0.5rem', padding: '0.8rem', color: '#ffffff', fontSize: '1rem', fontWeight: '600', cursor: 'pointer', marginTop: '1rem' },
  linkRed: { color: '#f87171', cursor: 'pointer', fontWeight: '500' },
  inputGroup: { marginBottom: '1rem' },
  label: { display: 'block', fontSize: '0.85rem', color: '#d1d5db', marginBottom: '0.2rem' },
  signupText: { textAlign: 'center', marginTop: '1.5rem', fontSize: '0.85rem', color: '#9ca3af' }
};