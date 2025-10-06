import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaUserShield, FaEye, FaEyeSlash, FaArrowLeft } from 'react-icons/fa';
import LoadingSpinner from '../components/Common/LoadingSpinner';

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { loginAdmin } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    const result = await loginAdmin(formData.email, formData.password);
    
    setLoading(false);
    
    if (result.success) {
      navigate('/admin-dashboard');
    } else {
      setError(result.error || 'Login failed. Please check your credentials.');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <Link to="/" className="back-btn">
          <FaArrowLeft /> Back to Home
        </Link>
        
        <div className="auth-header">
          <div className="auth-icon admin">
            <FaUserShield />
          </div>
          <h2>Admin Login</h2>
          <p>Access the admin dashboard</p>
        </div>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter admin email"
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <div className="password-input">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter admin password"
                required
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <button 
            type="submit" 
            className="auth-btn primary"
            disabled={loading}
          >
            {loading ? <LoadingSpinner /> : 'Login as Admin'}
          </button>
        </form>

        <div className="auth-footer">
          <p><strong>Note:</strong> Only authorized administrators can access this panel.</p>
          <p>Contact system administrator for access credentials.</p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;