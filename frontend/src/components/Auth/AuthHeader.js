import React from 'react';
import { FaBook } from 'react-icons/fa';

const AuthHeader = ({ title, description, icon: Icon }) => {
  return (
    <div className="auth-header">
      <div className="auth-logo">
        <FaBook className="logo-icon" />
        <span className="logo-text">StudyBox</span>
      </div>
      <div className="auth-title">
        {Icon && <Icon className="title-icon" />}
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default AuthHeader;