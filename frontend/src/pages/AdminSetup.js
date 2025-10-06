import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserShield, FaArrowLeft } from 'react-icons/fa';
import LoadingSpinner from '../components/Common/LoadingSpinner';

const AdminSetup = () => {
  const [formData, setFormData] = useState({
    firstName: 'Karthik',
    lastName: 'Admin',
    email: 'attisivasaikarthik@gmail.com',
    password: 'Jaishu@1117',
    confirmPassword: 'Jaishu@1117',
    gender: 'male',
    adminCode: 'studybox123'
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    if (formData.password !== formData.confirmPassword) {
      setMessage('Passwords do not match!');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          role: 'admin'
        })
      });

      const data = await response.json();
      
      if (data.success) {
        setMessage('Admin account created successfully! You can now login.');
        setTimeout(() => {
          navigate('/admin-login');
        }, 2000);
      } else {
        setMessage(data.message || 'Failed to create admin account');
      }
    } catch (error) {
      setMessage('Error creating admin account: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setMessage('');
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <button onClick={() => navigate('/')} className="back-btn">
          <FaArrowLeft /> Back to Home
        </button>
        
        <div className="auth-header">
          <div className="auth-icon admin">
            <FaUserShield />
          </div>
          <h2>Admin Setup</h2>
          <p>Create admin account for first-time setup</p>
        </div>

        {message && (
          <div className={`message ${message.includes('successfully') ? 'success-message' : 'error-message'}`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-row">
            <div className="form-group">
              <label>First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Gender</label>
            <select name="gender" value={formData.gender} onChange={handleChange} required>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label>Admin Code</label>
            <input
              type="password"
              name="adminCode"
              value={formData.adminCode}
              onChange={handleChange}
              placeholder="Enter admin secret code"
              required
            />
            <small>Check your backend .env file for ADMIN_CODE</small>
          </div>

          <button 
            type="submit" 
            className="auth-btn primary"
            disabled={loading}
          >
            {loading ? <LoadingSpinner /> : 'Create Admin Account'}
          </button>
        </form>

        <div className="auth-footer">
          <p><strong>Note:</strong> This is for first-time setup only.</p>
          <p>After creating the admin account, use the regular admin login.</p>
        </div>
      </div>
    </div>
  );
};

export default AdminSetup;