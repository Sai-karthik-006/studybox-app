import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import DashboardStats from '../components/Admin/DashboardStats';
import UserManagement from '../components/Admin/UserManagement';
import ContentManagement from '../components/Admin/ContentManagement';
import CollegeManagement from '../components/Admin/CollegeManagement';
import AdminProfile from './AdminProfile';
import { FaTachometerAlt, FaUsers, FaBook, FaUniversity, FaSignOutAlt, FaBars, FaUserShield, FaCog } from 'react-icons/fa';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { user, logout } = useAuth();

  const tabs = [
    { id: 'dashboard', name: 'Dashboard', icon: FaTachometerAlt },
    { id: 'users', name: 'User Management', icon: FaUsers },
    { id: 'colleges', name: 'College Management', icon: FaUniversity },
    { id: 'content', name: 'Content Management', icon: FaBook },
    { id: 'profile', name: 'Admin Profile', icon: FaUserShield }
  ];

  // Handler functions for quick actions
  const handleAddResource = () => {
    setActiveTab('content');
  };

  const handleManageColleges = () => {
    setActiveTab('colleges');
  };

  const handleViewUsers = () => {
    setActiveTab('users');
  };

  const handleViewAnalytics = () => {
    // For future implementation
    alert('Analytics feature coming soon!');
  };

  const handleProfile = () => {
    setActiveTab('profile');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <DashboardStats 
            onAddResource={handleAddResource}
            onManageColleges={handleManageColleges}
            onViewUsers={handleViewUsers}
            onViewAnalytics={handleViewAnalytics}
          />
        );
      case 'users':
        return <UserManagement />;
      case 'colleges':
        return <CollegeManagement />;
      case 'content':
        return <ContentManagement />;
      case 'profile':
        return <AdminProfile />;
      default:
        return (
          <DashboardStats 
            onAddResource={handleAddResource}
            onManageColleges={handleManageColleges}
            onViewUsers={handleViewUsers}
            onViewAnalytics={handleViewAnalytics}
          />
        );
    }
  };

  return (
    <div className="admin-dashboard">
      {/* Sidebar */}
      <div className={`admin-sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <FaUniversity className="logo-icon" />
            <span className="logo-text">StudyBox Admin</span>
          </div>
          <p>Control Panel</p>
        </div>

        <nav className="sidebar-nav">
          {tabs.map(tab => {
            const IconComponent = tab.icon;
            return (
              <button
                key={tab.id}
                className={`nav-item ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <IconComponent className="nav-icon" />
                <span className="nav-text">{tab.name}</span>
              </button>
            );
          })}
        </nav>

        <div className="sidebar-footer">
          <div className="admin-info">
            <div className="admin-avatar">
              {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
            </div>
            <div className="admin-details">
              <span className="admin-name">{user?.firstName} {user?.lastName}</span>
              <span className="admin-role">{user?.role}</span>
              <span className="admin-email">{user?.email}</span>
            </div>
          </div>
          <div className="sidebar-actions">
            <button onClick={handleProfile} className="profile-btn">
              <FaUserShield />
              <span>My Profile</span>
            </button>
            <button onClick={logout} className="logout-btn">
              <FaSignOutAlt />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="admin-main">
        <header className="admin-header">
          <button 
            className="sidebar-toggle"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <FaBars />
          </button>
          
          <div className="header-title">
            <h1>
              {tabs.find(tab => tab.id === activeTab)?.name || 'Dashboard'}
            </h1>
            <p>
              {activeTab === 'dashboard' && 'Welcome back! Here is your dashboard overview.'}
              {activeTab === 'users' && 'Manage all users and their permissions.'}
              {activeTab === 'colleges' && 'Add, edit, and manage colleges in the system.'}
              {activeTab === 'content' && 'Manage and approve study resources.'}
              {activeTab === 'profile' && 'Manage your administrator account settings.'}
            </p>
          </div>

          <div className="header-actions">
            <div className="user-welcome">
              <span>Welcome, <strong>{user?.firstName}</strong></span>
            </div>
            <div className="notification-badge">
              <span>3</span>
            </div>
          </div>
        </header>

        <main className="admin-content">
          {renderContent()}
        </main>

        <footer className="admin-footer">
          <p>&copy; 2024 StudyBox Admin Panel. All rights reserved.</p>
          <p>Secure Admin Access - {user?.email}</p>
        </footer>
      </div>
    </div>
  );
};

export default AdminDashboard;