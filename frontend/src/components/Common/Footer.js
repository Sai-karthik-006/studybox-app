import React from 'react';
import { FaBook, FaPhone, FaEnvelope, FaHeart } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="main-footer">
      <div className="footer-content">
        <div className="footer-section">
          <div className="footer-logo">
            <FaBook className="logo-icon" />
            <span className="logo-text">StudyBox</span>
          </div>
          <p className="footer-description">
            Your gateway to academic excellence. Access comprehensive study resources 
            and expert-curated content for engineering students.
          </p>
        </div>

        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul className="footer-links">
            <li><a href="/">Home</a></li>
            <li><a href="/colleges">Colleges</a></li>
            <li><a href="/resources">Resources</a></li>
            <li><a href="/admin-login">Admin</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Support</h4>
          <ul className="footer-links">
            <li><a href="/help">Help Center</a></li>
            <li><a href="/contact">Contact Us</a></li>
            <li><a href="/feedback">Feedback</a></li>
            <li><a href="/privacy">Privacy Policy</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Contact Info</h4>
          <div className="contact-info">
            <div className="contact-item">
              <FaPhone className="contact-icon" />
              <span>+91 8919472701</span>
            </div>
            <div className="contact-item">
              <FaEnvelope className="contact-icon" />
              <span>support@studybox.com</span>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          &copy; 2024 StudyBox. Made with <FaHeart className="heart-icon" /> for students.
          All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;