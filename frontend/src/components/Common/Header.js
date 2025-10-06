import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FaBook, FaUser, FaSignOutAlt, FaHome } from 'react-icons/fa';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="main-header">
      <div className="header-left">
        <div className="logo" onClick={() => navigate('/')}>
          <FaBook className="logo-icon" />
          <span className="logo-text">StudyBox</span>
        </div>
        
        <nav className="nav-links">
          <button onClick={() => navigate('/colleges')} className="nav-link">
            <FaHome />
            Colleges
          </button>
        </nav>
      </div>

      <div className="header-right">
        <div className="user-info">
          <FaUser className="user-icon" />
          <span className="user-name">
            {user?.firstName} {user?.lastName}
          </span>
          <span className="user-role">{user?.role}</span>
        </div>
        
        <button onClick={handleLogout} className="logout-btn">
          <FaSignOutAlt />
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;