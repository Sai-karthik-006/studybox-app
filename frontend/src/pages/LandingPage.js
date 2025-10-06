import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserShield, FaUserGraduate, FaBook, FaGraduationCap } from 'react-icons/fa';
import '../styles/App.css';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      {/* Header */}
      <header className="landing-header">
        <div className="header-content">
          <FaBook className="logo-icon" />
          <h1 className="logo-text">StudyBox</h1>
          <p className="tagline">Your Gateway to Academic Excellence</p>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h2 className="hero-title">
            Welcome to <span className="highlight">StudyBox</span>
          </h2>
          <p className="hero-description">
            Access comprehensive study resources, college-specific materials, 
            and expert-curated content for engineering students.
          </p>
          
          <div className="role-selection">
            <div className="role-card" onClick={() => navigate('/admin-login')}>
              <div className="role-icon admin">
                <FaUserShield />
              </div>
              <h3>Admin</h3>
              <p>Manage content and monitor platform</p>
              <button className="role-btn">Enter as Admin</button>
            </div>

            <div className="role-card" onClick={() => navigate('/student-auth')}>
              <div className="role-icon student">
                <FaUserGraduate />
              </div>
              <h3>Student</h3>
              <p>Access study materials and resources</p>
              <button className="role-btn">Enter as Student</button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="features-container">
          <h3>Why Choose StudyBox?</h3>
          <div className="features-grid">
            <div className="feature-item">
              <FaGraduationCap className="feature-icon" />
              <h4>College Specific</h4>
              <p>Resources tailored to your college curriculum</p>
            </div>
            <div className="feature-item">
              <FaBook className="feature-icon" />
              <h4>Comprehensive Materials</h4>
              <p>Textbooks, notes, videos, and more</p>
            </div>
            <div className="feature-item">
              <FaUserShield className="feature-icon" />
              <h4>Expert Verified</h4>
              <p>All content reviewed by professionals</p>
            </div>
          </div>
        </div>
      </section>
      
      // Add this in the role-selection section, after the admin card:
<div className="setup-option">
  <p>First time setup?</p>
  <button 
    onClick={() => navigate('/admin-setup')}
    className="setup-btn"
  >
    Create Admin Account
  </button>
</div>
      {/* Footer */}
      <footer className="landing-footer">
        <p>Need help? Contact: 8919472701</p>
        <p>&copy; 2024 StudyBox. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;