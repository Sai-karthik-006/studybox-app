import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import LoadingSpinner from './LoadingSpinner';

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user, loading } = useAuth();

  console.log('ProtectedRoute - User:', user);
  console.log('ProtectedRoute - Loading:', loading);
  console.log('ProtectedRoute - AdminOnly:', adminOnly);

  if (loading) {
    return (
      <div className="full-page-loading">
        <LoadingSpinner size="large" />
        <p>Loading...</p>
      </div>
    );
  }

  if (!user) {
    console.log('No user found, redirecting to home');
    return <Navigate to="/" replace />;
  }

  if (adminOnly && user.role !== 'admin') {
    console.log('User is not admin, redirecting to colleges');
    console.log('User role:', user.role);
    return <Navigate to="/colleges" replace />;
  }

  console.log('Access granted to:', children.type?.name || 'Component');
  return children;
};

export default ProtectedRoute;