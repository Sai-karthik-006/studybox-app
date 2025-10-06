import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { FaUserShield, FaLock, FaSave, FaEye, FaEyeSlash, FaEnvelope, FaPhone, FaUser } from 'react-icons/fa';

const AdminProfile = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    if (formData.newPassword !== formData.confirmPassword) {
      setMessage('New passwords do not match!');
      setLoading(false);
      return;
    }

    if (formData.newPassword.length < 6) {
      setMessage('New password must be at least 6 characters long!');
      setLoading(false);
      return;
    }

    try {
      // Simulate API call to change password
      setTimeout(() => {
        setMessage('Password changed successfully!');
        setFormData({
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        });
        setLoading(false);
      }, 1000);
    } catch (error) {
      setMessage('Error changing password: ' + error.message);
      setLoading(false);
    }
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords({
      ...showPasswords,
      [field]: !showPasswords[field]
    });
  };

  return (
    <div className="admin-profile">
      <div className="profile-header">
        <h1>Admin Profile</h1>
        <p>Manage your administrator account and security settings</p>
      </div>

      <div className="profile-content">
        {/* Admin Information Card */}
        <div className="profile-card">
          <div className="card-header">
            <FaUserShield className="header-icon" />
            <h3>Administrator Information</h3>
          </div>
          <div className="card-content">
            <div className="info-grid">
              <div className="info-item">
                <FaUser className="info-icon" />
                <div className="info-content">
                  <label>Full Name</label>
                  <p>{user?.firstName} {user?.lastName}</p>
                </div>
              </div>
              <div className="info-item">
                <FaEnvelope className="info-icon" />
                <div className="info-content">
                  <label>Email Address</label>
                  <p>{user?.email}</p>
                </div>
              </div>
              <div className="info-item">
                <FaUserShield className="info-icon" />
                <div className="info-content">
                  <label>Role</label>
                  <p className="role-badge admin">{user?.role}</p>
                </div>
              </div>
              {user?.phone && (
                <div className="info-item">
                  <FaPhone className="info-icon" />
                  <div className="info-content">
                    <label>Phone</label>
                    <p>{user?.phone}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Password Change Card */}
        <div className="profile-card">
          <div className="card-header">
            <FaLock className="header-icon" />
            <h3>Change Password</h3>
          </div>
          <div className="card-content">
            {message && (
              <div className={`message ${message.includes('successfully') ? 'success-message' : 'error-message'}`}>
                {message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="password-form">
              <div className="form-group">
                <label>Current Password</label>
                <div className="password-input">
                  <FaLock className="input-icon" />
                  <input
                    type={showPasswords.current ? 'text' : 'password'}
                    value={formData.currentPassword}
                    onChange={(e) => setFormData({...formData, currentPassword: e.target.value})}
                    placeholder="Enter current password"
                    required
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => togglePasswordVisibility('current')}
                  >
                    {showPasswords.current ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              <div className="form-group">
                <label>New Password</label>
                <div className="password-input">
                  <FaLock className="input-icon" />
                  <input
                    type={showPasswords.new ? 'text' : 'password'}
                    value={formData.newPassword}
                    onChange={(e) => setFormData({...formData, newPassword: e.target.value})}
                    placeholder="Enter new password (min. 6 characters)"
                    required
                    minLength="6"
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => togglePasswordVisibility('new')}
                  >
                    {showPasswords.new ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              <div className="form-group">
                <label>Confirm New Password</label>
                <div className="password-input">
                  <FaLock className="input-icon" />
                  <input
                    type={showPasswords.confirm ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                    placeholder="Confirm new password"
                    required
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => togglePasswordVisibility('confirm')}
                  >
                    {showPasswords.confirm ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              <button 
                type="submit" 
                className="auth-btn primary"
                disabled={loading}
              >
                <FaSave />
                {loading ? 'Changing Password...' : 'Change Password'}
              </button>
            </form>
          </div>
        </div>

        {/* Security Notes Card */}
        <div className="profile-card">
          <div className="card-header">
            <FaUserShield className="header-icon" />
            <h3>Security Guidelines</h3>
          </div>
          <div className="card-content">
            <div className="security-notes">
              <div className="note-item important">
                <strong>Important Security Practices:</strong>
              </div>
              <div className="note-item">
                • Use a strong, unique password with mix of characters
              </div>
              <div className="note-item">
                • Change your password every 90 days
              </div>
              <div className="note-item">
                • Never share your admin credentials with anyone
              </div>
              <div className="note-item">
                • Always log out when not using the admin panel
              </div>
              <div className="note-item">
                • Use secure networks when accessing the admin panel
              </div>
              <div className="note-item">
                • Report any suspicious activity immediately
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;