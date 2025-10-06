import React, { useState, useEffect } from 'react';
import { getDashboardStats } from '../../utils/api';
import { FaUsers, FaBook, FaUniversity, FaEye, FaChartLine, FaCalendar, FaGraduationCap } from 'react-icons/fa';

const DashboardStats = ({ onAddResource, onManageColleges, onViewUsers, onViewAnalytics }) => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalResources: 0,
    totalColleges: 0,
    totalBranches: 0,
    totalSubjects: 0,
    totalYears: 0,
    totalSemesters: 0,
    recentActivity: [],
    recentUsers: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getDashboardStats();
      
      if (response.data && response.data.success) {
        setStats(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      setError('Failed to load dashboard data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Total Users',
      value: stats.totalUsers,
      icon: FaUsers,
      color: '#4F46E5',
      description: 'Registered users'
    },
    {
      title: 'Total Resources',
      value: stats.totalResources,
      icon: FaBook,
      color: '#10B981',
      description: 'Study materials'
    },
    {
      title: 'Colleges',
      value: stats.totalColleges,
      icon: FaUniversity,
      color: '#F59E0B',
      description: 'Partner colleges'
    },
    {
      title: 'Branches',
      value: stats.totalBranches,
      icon: FaGraduationCap,
      color: '#EF4444',
      description: 'Academic branches'
    },
    {
      title: 'Subjects',
      value: stats.totalSubjects,
      icon: FaBook,
      color: '#8B5CF6',
      description: 'Course subjects'
    },
    {
      title: 'Years/Semesters',
      value: `${stats.totalYears}/${stats.totalSemesters}`,
      icon: FaCalendar,
      color: '#06B6D4',
      description: 'Academic structure'
    }
  ];

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="loading-spinner large"></div>
        <p>Loading dashboard data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-error">
        <p>{error}</p>
        <button onClick={fetchDashboardStats} className="retry-btn">
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="dashboard-stats">
      {/* Welcome Header */}
      <div className="dashboard-header">
        <h1>Admin Dashboard</h1>
        <p>Overview of your StudyBox platform</p>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        {statCards.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <div key={index} className="stat-card">
              <div className="stat-icon" style={{ backgroundColor: stat.color }}>
                <IconComponent />
              </div>
              <div className="stat-info">
                <h3>{stat.value}</h3>
                <p className="stat-title">{stat.title}</p>
                <p className="stat-description">{stat.description}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Users */}
      <div className="dashboard-section">
        <div className="section-header">
          <h2>Recent Users</h2>
          <button onClick={onViewUsers} className="view-all-btn">
            View All Users
          </button>
        </div>
        <div className="activity-list">
          {stats.recentUsers && stats.recentUsers.length > 0 ? (
            stats.recentUsers.map((user, index) => (
              <div key={user._id || index} className="activity-item">
                <div className="activity-avatar" style={{ backgroundColor: user.role === 'admin' ? '#4F46E5' : '#10B981' }}>
                  {user.firstName?.charAt(0)}{user.lastName?.charAt(0)}
                </div>
                <div className="activity-details">
                  <p className="user-name">
                    {user.firstName} {user.lastName}
                  </p>
                  <p className="user-email">{user.email}</p>
                  <span className={`user-role ${user.role}`}>
                    {user.role}
                  </span>
                </div>
                <div className="activity-time">
                  {new Date(user.createdAt).toLocaleDateString()}
                </div>
              </div>
            ))
          ) : (
            <div className="empty-activity">
              <p>No users registered yet</p>
            </div>
          )}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="dashboard-section">
        <h2>Recent Activity</h2>
        <div className="activity-list">
          {stats.recentActivity && stats.recentActivity.length > 0 ? (
            stats.recentActivity.map((activity, index) => (
              <div key={index} className="activity-item">
                <div className="activity-icon">
                  <FaUsers />
                </div>
                <div className="activity-details">
                  <p className="activity-description">
                    {activity.description}
                  </p>
                  <span className="activity-time">
                    {new Date(activity.time).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="empty-activity">
              <p>No recent activity</p>
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="dashboard-section">
        <h2>Quick Actions</h2>
        <div className="quick-actions">
          <button className="action-btn primary" onClick={onAddResource}>
            <FaBook />
            <span>Add New Resource</span>
          </button>
          <button className="action-btn secondary" onClick={onManageColleges}>
            <FaUniversity />
            <span>Manage Colleges</span>
          </button>
          <button className="action-btn secondary" onClick={onViewUsers}>
            <FaUsers />
            <span>View Users</span>
          </button>
          <button className="action-btn secondary" onClick={onViewAnalytics}>
            <FaChartLine />
            <span>View Analytics</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardStats;