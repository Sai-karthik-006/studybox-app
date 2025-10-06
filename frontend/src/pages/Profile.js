import React from 'react';
import { useAuth } from '../context/AuthContext';
import Header from '../components/Common/Header';
import { FaUser, FaEnvelope, FaPhone, FaVenusMars, FaCalendar, FaEdit } from 'react-icons/fa';

const Profile = () => {
  const { user } = useAuth();

  return (
    <div className="page-container">
      <Header />
      
      <div className="page-content">
        <div className="profile-header">
          <h1>My Profile</h1>
          <p>Manage your account information</p>
        </div>

        <div className="profile-card">
          <div className="profile-header-section">
            <div className="profile-avatar">
              {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
            </div>
            <div className="profile-info">
              <h2>{user?.firstName} {user?.lastName}</h2>
              <p className="user-role">{user?.role}</p>
              <button className="edit-profile-btn">
                <FaEdit />
                Edit Profile
              </button>
            </div>
          </div>

          <div className="profile-details">
            <div className="detail-section">
              <h3>Personal Information</h3>
              <div className="detail-grid">
                <div className="detail-item">
                  <FaUser className="detail-icon" />
                  <div className="detail-content">
                    <label>Full Name</label>
                    <p>{user?.firstName} {user?.lastName}</p>
                  </div>
                </div>

                <div className="detail-item">
                  <FaEnvelope className="detail-icon" />
                  <div className="detail-content">
                    <label>Email Address</label>
                    <p>{user?.email}</p>
                  </div>
                </div>

                <div className="detail-item">
                  <FaPhone className="detail-icon" />
                  <div className="detail-content">
                    <label>Phone Number</label>
                    <p>{user?.phone || 'Not provided'}</p>
                  </div>
                </div>

                <div className="detail-item">
                  <FaVenusMars className="detail-icon" />
                  <div className="detail-content">
                    <label>Gender</label>
                    <p>{user?.gender ? user.gender.charAt(0).toUpperCase() + user.gender.slice(1) : 'Not specified'}</p>
                  </div>
                </div>

                <div className="detail-item">
                  <FaCalendar className="detail-icon" />
                  <div className="detail-content">
                    <label>Member Since</label>
                    <p>{user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Unknown'}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="detail-section">
              <h3>Account Statistics</h3>
              <div className="stats-grid">
                <div className="stat-item">
                  <span className="stat-number">15</span>
                  <span className="stat-label">Resources Viewed</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">8</span>
                  <span className="stat-label">Resources Downloaded</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">12</span>
                  <span className="stat-label">Feedbacks Given</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">5</span>
                  <span className="stat-label">Resources Liked</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;