import React, { useState, useEffect } from 'react';
import { FaSearch, FaEdit, FaTrash, FaUserShield, FaUser, FaEnvelope, FaPhone } from 'react-icons/fa';
import { getUsers, updateUserRole, deleteUser } from '../../utils/api';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    const filtered = users.filter(user =>
      user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [searchTerm, users]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await getUsers();
      if (response.data && response.data.success) {
        setUsers(response.data.data);
        setFilteredUsers(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      alert('Error loading users');
    } finally {
      setLoading(false);
    }
  };

  const makeAdmin = async (userId) => {
    try {
      const response = await updateUserRole(userId, 'admin');
      if (response.data && response.data.success) {
        setUsers(users.map(user => 
          user._id === userId ? { ...user, role: 'admin' } : user
        ));
        alert('User promoted to admin successfully!');
      }
    } catch (error) {
      alert('Error promoting user: ' + (error.response?.data?.message || error.message));
    }
  };

  const removeAdmin = async (userId) => {
    try {
      const response = await updateUserRole(userId, 'student');
      if (response.data && response.data.success) {
        setUsers(users.map(user => 
          user._id === userId ? { ...user, role: 'student' } : user
        ));
        alert('User role changed to student successfully!');
      }
    } catch (error) {
      alert('Error changing user role: ' + (error.response?.data?.message || error.message));
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        const response = await deleteUser(userId);
        if (response.data && response.data.success) {
          setUsers(users.filter(user => user._id !== userId));
          alert('User deleted successfully!');
        }
      } catch (error) {
        alert('Error deleting user: ' + (error.response?.data?.message || error.message));
      }
    }
  };

  if (loading) {
    return (
      <div className="user-management">
        <div className="loading-container">
          <div className="loading-spinner large"></div>
          <p>Loading users...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="user-management">
      <div className="management-header">
        <h2>User Management</h2>
        <p>Manage all users and their permissions</p>
      </div>

      <div className="management-controls">
        <div className="search-box">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="user-stats">
          <span>Total: {users.length} users</span>
          <span>Admins: {users.filter(u => u.role === 'admin').length}</span>
          <span>Students: {users.filter(u => u.role === 'student').length}</span>
        </div>
      </div>

      <div className="users-table">
        <div className="table-header">
          <div className="col">User</div>
          <div className="col">Contact</div>
          <div className="col">Role</div>
          <div className="col">Status</div>
          <div className="col">Joined</div>
          <div className="col">Actions</div>
        </div>

        <div className="table-body">
          {filteredUsers.map(user => (
            <div key={user._id} className="table-row">
              <div className="col user-info">
                <div className="user-avatar">
                  {user.firstName[0]}{user.lastName[0]}
                </div>
                <div className="user-details">
                  <strong>{user.firstName} {user.lastName}</strong>
                  <span>{user.email}</span>
                </div>
              </div>
              
              <div className="col">
                <div className="contact-info">
                  <FaEnvelope className="contact-icon" />
                  {user.email}
                </div>
                {user.phone && (
                  <div className="contact-info">
                    <FaPhone className="contact-icon" />
                    {user.phone}
                  </div>
                )}
              </div>
              
              <div className="col">
                <span className={`role-badge ${user.role}`}>
                  {user.role === 'admin' ? <FaUserShield /> : <FaUser />}
                  {user.role}
                </span>
              </div>
              
              <div className="col">
                <span className={`status-badge active`}>
                  Active
                </span>
              </div>
              
              <div className="col">
                {new Date(user.createdAt).toLocaleDateString()}
              </div>
              
              <div className="col actions">
                {user.role !== 'admin' ? (
                  <button 
                    className="action-btn promote"
                    onClick={() => makeAdmin(user._id)}
                    title="Make Admin"
                  >
                    <FaUserShield />
                  </button>
                ) : (
                  <button 
                    className="action-btn demote"
                    onClick={() => removeAdmin(user._id)}
                    title="Make Student"
                  >
                    <FaUser />
                  </button>
                )}
                
                <button 
                  className="action-btn delete"
                  onClick={() => handleDeleteUser(user._id)}
                  title="Delete User"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {filteredUsers.length === 0 && (
        <div className="empty-state">
          <FaUser className="empty-icon" />
          <h3>No users found</h3>
          <p>Try adjusting your search terms</p>
        </div>
      )}
    </div>
  );
};

export default UserManagement;