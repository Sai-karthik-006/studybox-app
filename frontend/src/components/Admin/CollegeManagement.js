import React, { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash, FaUniversity, FaUpload, FaTimes } from 'react-icons/fa';
import { getColleges, addCollege, deleteCollege } from '../../utils/api';

const CollegeManagement = () => {
  const [colleges, setColleges] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentCollege, setCurrentCollege] = useState(null);
  const [newCollege, setNewCollege] = useState({
    name: '',
    description: '',
    code: '',
    established: '',
    location: '',
    logo: null
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchColleges();
  }, []);

  const fetchColleges = async () => {
    try {
      setLoading(true);
      const response = await getColleges();
      if (response.data && response.data.success) {
        setColleges(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching colleges:', error);
      alert('Error loading colleges');
    } finally {
      setLoading(false);
    }
  };

  const handleAddCollege = async () => {
    if (!newCollege.name || !newCollege.code) {
      alert('Please fill all required fields');
      return;
    }

    setLoading(true);
    try {
      const response = await addCollege(newCollege);
      if (response.data && response.data.success) {
        setColleges([...colleges, response.data.data]);
        setNewCollege({ name: '', description: '', code: '', established: '', location: '', logo: null });
        setShowAddModal(false);
        alert('College added successfully!');
      }
    } catch (error) {
      alert('Error adding college: ' + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  const handleEditCollege = async () => {
    if (!currentCollege.name || !currentCollege.code) {
      alert('Please fill all required fields');
      return;
    }

    setLoading(true);
    try {
      // For now, we'll update locally since we don't have update API
      setColleges(colleges.map(college => 
        college._id === currentCollege._id ? currentCollege : college
      ));
      setShowEditModal(false);
      setCurrentCollege(null);
      alert('College updated successfully!');
    } catch (error) {
      alert('Error updating college: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCollege = async (collegeId) => {
    if (window.confirm('Are you sure you want to delete this college?')) {
      try {
        const response = await deleteCollege(collegeId);
        if (response.data && response.data.success) {
          setColleges(colleges.filter(college => college._id !== collegeId));
          alert('College deleted successfully!');
        }
      } catch (error) {
        alert('Error deleting college: ' + (error.response?.data?.message || error.message));
      }
    }
  };

  const openEditModal = (college) => {
    setCurrentCollege({ ...college });
    setShowEditModal(true);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewCollege({
        ...newCollege,
        logo: URL.createObjectURL(file) // Create local URL for preview
      });
    }
  };

  if (loading && colleges.length === 0) {
    return (
      <div className="college-management">
        <div className="loading-container">
          <div className="loading-spinner large"></div>
          <p>Loading colleges...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="college-management">
      <div className="management-header">
        <div className="header-left">
          <h2>College Management</h2>
          <p>Manage all colleges in the system</p>
        </div>
        <button 
          className="add-btn primary"
          onClick={() => setShowAddModal(true)}
        >
          <FaPlus />
          Add New College
        </button>
      </div>

      <div className="colleges-grid">
        {colleges.map(college => (
          <div key={college._id} className="college-admin-card">
            <div className="college-header">
              <div className="college-logo">
                {college.logo ? (
                  <img src={college.logo} alt={college.name} />
                ) : (
                  <FaUniversity className="default-logo" />
                )}
              </div>
              <div className="college-actions">
                <button 
                  className="action-btn edit" 
                  onClick={() => openEditModal(college)}
                  title="Edit College"
                >
                  <FaEdit />
                </button>
                <button 
                  className="action-btn delete"
                  onClick={() => handleDeleteCollege(college._id)}
                  title="Delete College"
                >
                  <FaTrash />
                </button>
              </div>
            </div>

            <div className="college-info">
              <h3>{college.name}</h3>
              <p className="college-code">{college.code}</p>
              <p className="college-fullname">{college.description}</p>
              
              <div className="college-details">
                {college.established && (
                  <div className="detail-item">
                    <strong>Established:</strong> {college.established}
                  </div>
                )}
                {college.location && (
                  <div className="detail-item">
                    <strong>Location:</strong> {college.location}
                  </div>
                )}
                <div className="detail-item">
                  <strong>Status:</strong> 
                  <span className={`status-badge active`}>
                    Active
                  </span>
                </div>
              </div>
            </div>

            <div className="college-stats">
              <div className="stat">
                <span className="stat-number">0</span>
                <span className="stat-label">Students</span>
              </div>
              <div className="stat">
                <span className="stat-number">0</span>
                <span className="stat-label">Resources</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {colleges.length === 0 && (
        <div className="empty-state">
          <FaUniversity className="empty-icon" />
          <h3>No colleges found</h3>
          <p>Add your first college to get started</p>
        </div>
      )}

      {/* Add College Modal */}
      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>Add New College</h3>
              <button onClick={() => setShowAddModal(false)}>
                <FaTimes />
              </button>
            </div>
            
            <div className="modal-content">
              <div className="form-group">
                <label>College Name *</label>
                <input
                  type="text"
                  value={newCollege.name}
                  onChange={(e) => setNewCollege({...newCollege, name: e.target.value})}
                  placeholder="e.g., ANITS"
                />
              </div>

              <div className="form-group">
                <label>College Code *</label>
                <input
                  type="text"
                  value={newCollege.code}
                  onChange={(e) => setNewCollege({...newCollege, code: e.target.value})}
                  placeholder="e.g., ANITS"
                />
              </div>

              <div className="form-group">
                <label>Description</label>
                <input
                  type="text"
                  value={newCollege.description}
                  onChange={(e) => setNewCollege({...newCollege, description: e.target.value})}
                  placeholder="e.g., Anil Neerukonda Institute of Technology & Sciences"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Established Year</label>
                  <input
                    type="number"
                    value={newCollege.established}
                    onChange={(e) => setNewCollege({...newCollege, established: e.target.value})}
                    placeholder="e.g., 2001"
                  />
                </div>

                <div className="form-group">
                  <label>Location</label>
                  <input
                    type="text"
                    value={newCollege.location}
                    onChange={(e) => setNewCollege({...newCollege, location: e.target.value})}
                    placeholder="e.g., Visakhapatnam"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>College Logo</label>
                <div className="file-upload">
                  <FaUpload className="upload-icon" />
                  <span>Upload Logo</span>
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleFileUpload}
                  />
                </div>
                {newCollege.logo && (
                  <div className="logo-preview">
                    <img src={newCollege.logo} alt="Logo preview" />
                  </div>
                )}
              </div>
            </div>

            <div className="modal-actions">
              <button 
                className="btn secondary"
                onClick={() => setShowAddModal(false)}
                disabled={loading}
              >
                Cancel
              </button>
              <button 
                className="btn primary"
                onClick={handleAddCollege}
                disabled={loading || !newCollege.name || !newCollege.code}
              >
                {loading ? 'Adding...' : 'Add College'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit College Modal */}
      {showEditModal && currentCollege && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>Edit College</h3>
              <button onClick={() => setShowEditModal(false)}>
                <FaTimes />
              </button>
            </div>
            
            <div className="modal-content">
              <div className="form-group">
                <label>College Name *</label>
                <input
                  type="text"
                  value={currentCollege.name}
                  onChange={(e) => setCurrentCollege({...currentCollege, name: e.target.value})}
                />
              </div>

              <div className="form-group">
                <label>College Code *</label>
                <input
                  type="text"
                  value={currentCollege.code}
                  onChange={(e) => setCurrentCollege({...currentCollege, code: e.target.value})}
                />
              </div>

              <div className="form-group">
                <label>Description</label>
                <input
                  type="text"
                  value={currentCollege.description}
                  onChange={(e) => setCurrentCollege({...currentCollege, description: e.target.value})}
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Established Year</label>
                  <input
                    type="number"
                    value={currentCollege.established}
                    onChange={(e) => setCurrentCollege({...currentCollege, established: e.target.value})}
                  />
                </div>

                <div className="form-group">
                  <label>Location</label>
                  <input
                    type="text"
                    value={currentCollege.location}
                    onChange={(e) => setCurrentCollege({...currentCollege, location: e.target.value})}
                  />
                </div>
              </div>
            </div>

            <div className="modal-actions">
              <button 
                className="btn secondary"
                onClick={() => setShowEditModal(false)}
                disabled={loading}
              >
                Cancel
              </button>
              <button 
                className="btn primary"
                onClick={handleEditCollege}
                disabled={loading || !currentCollege.name || !currentCollege.code}
              >
                {loading ? 'Updating...' : 'Update College'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CollegeManagement;