// src/SignupView.jsx
import React, { useState } from 'react';

export default function SignupView({ onSignupSuccess, onSwitchToLogin }) {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    shopName: '',
    ownerName: '',
    phone: '',
    address: '',
    gstin: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess('Account created successfully! Redirecting to login...');
        setTimeout(() => onSignupSuccess(), 1500);
      } else {
        setError(data.error || 'Registration failed.');
      }
    } catch (err) {
      setError('Cannot connect to backend server.');
    }
  };

  return (
    <div style={authStyles.loginBodyBlue}>
      <div style={authStyles.cardBlue}>
        <h1 style={authStyles.titleBlue}>Sign Up & Store Profile</h1>
        {error && <p style={{ color: '#ef4444', marginBottom: '1rem', fontSize: '0.9rem' }}>{error}</p>}
        {success && <p style={{ color: '#10b981', marginBottom: '1rem', fontSize: '0.9rem' }}>{success}</p>}
        <form onSubmit={handleSubmit}>
          <div style={authStyles.inputGroup}>
            <label style={authStyles.label}>Username *</label>
            <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Choose a username" style={authStyles.inputFieldBlue} required />
          </div>
          <div style={authStyles.inputGroup}>
            <label style={authStyles.label}>Email *</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="eg: something@gmail.com" style={authStyles.inputFieldBlue} required />
          </div>
          <div style={authStyles.inputGroup}>
            <label style={authStyles.label}>Password *</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Create a password" style={authStyles.inputFieldBlue} required />
          </div>
          <div style={authStyles.inputGroup}>
            <label style={authStyles.label}>Shop Name *</label>
            <input type="text" name="shopName" value={formData.shopName} onChange={handleChange} placeholder="e.g. Sharma General Store" style={authStyles.inputFieldBlue} required />
          </div>
          <div style={authStyles.inputGroup}>
            <label style={authStyles.label}>Owner Name *</label>
            <input type="text" name="ownerName" value={formData.ownerName} onChange={handleChange} placeholder="e.g. Rajesh Sharma" style={authStyles.inputFieldBlue} required />
          </div>
          <div style={authStyles.inputGroup}>
            <label style={authStyles.label}>Phone Number (10 Digits) *</label>
            <input type="tel" maxLength="10" name="phone" value={formData.phone} onChange={handleChange} placeholder="9876543210" style={authStyles.inputFieldBlue} required />
          </div>
          <div style={authStyles.inputGroup}>
            <label style={authStyles.label}>Shop Address * (Compulsory)</label>
            <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="14/2 Park Street" style={authStyles.inputFieldBlue} required />
          </div>
          <div style={authStyles.inputGroup}>
            <label style={authStyles.label}>GSTIN * (Compulsory)</label>
            <input type="text" name="gstin" value={formData.gstin} onChange={handleChange} placeholder="19AABCT1332L1ZS" style={authStyles.inputFieldBlue} required />
          </div>
          <button type="submit" style={authStyles.submitBtnBlue}>Complete Sign Up</button>
        </form>
        <div style={authStyles.signupText}>
          Already have an account? <span onClick={onSwitchToLogin} style={authStyles.linkBlue}>Login</span>
        </div>
      </div>
    </div>
  );
}

const authStyles = {
  loginBodyBlue: {
    backgroundColor: '#040912',
    backgroundImage: 'radial-gradient(circle at center, rgba(30, 58, 138, 0.25) 0%, rgba(4, 9, 18, 0.95) 70%)',
    backgroundAttachment: 'fixed', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#d1d5db', fontFamily: 'system-ui, sans-serif', padding: '20px 0'
  },
  cardBlue: {
    backgroundColor: '#0b1120', border: '1px solid rgba(59, 130, 246, 0.2)', borderRadius: '1.5rem', width: '100%', maxWidth: '460px', padding: '2.5rem', boxShadow: '0 20px 40px rgba(0, 0, 0, 0.6)'
  },
  titleBlue: { fontSize: '1.8rem', fontWeight: '700', color: '#60a5fa', marginBottom: '1.5rem' },
  inputFieldBlue: { width: '100%', backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '0.5rem', padding: '0.75rem 1rem', color: '#ffffff', fontSize: '0.95rem', outline: 'none', boxSizing: 'border-box', marginTop: '5px' },
  submitBtnBlue: { width: '100%', background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)', border: 'none', borderRadius: '0.5rem', padding: '0.8rem', color: '#ffffff', fontSize: '1rem', fontWeight: '600', cursor: 'pointer', marginTop: '1.2rem' },
  linkBlue: { color: '#60a5fa', cursor: 'pointer', fontWeight: '500' },
  inputGroup: { marginBottom: '1rem' },
  label: { display: 'block', fontSize: '0.85rem', color: '#d1d5db', marginBottom: '0.2rem' },
  signupText: { textAlign: 'center', marginTop: '1.5rem', fontSize: '0.85rem', color: '#9ca3af' }
};