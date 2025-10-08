import React, { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash, FaUniversity, FaSearch, FaSave, FaTimes } from 'react-icons/fa';
import { getColleges, createCollege, updateCollege, deleteCollege } from '../../utils/api';
import { toast } from 'react-toastify';

const CollegeManagement = () => {
  const [colleges, setColleges] = useState([]);
  const [filteredColleges, setFilteredColleges] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingCollege, setEditingCollege] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    fullName: '',
    code: '',
    established: '',
    location: '',
    logo: '',
    description: ''
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchColleges();
  }, []);

  useEffect(() => {
    const filtered = colleges.filter(college =>
      college.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      college.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      college.fullName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredColleges(filtered);
  }, [searchTerm, colleges]);

  const fetchColleges = async () => {
    try {
      setLoading(true);
      const response = await getColleges();
      if (response.data && response.data.success) {
        setColleges(response.data.data);
        setFilteredColleges(response.data.data);
      } else {
        toast.error('Failed to fetch colleges');
        setColleges([]);
      }
    } catch (error) {
      console.error('Error fetching colleges:', error);
      toast.error('Failed to load colleges');
      setColleges([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name || !formData.fullName || !formData.code) {
      toast.error('College name, full name, and code are required');
      return;
    }

    setSaving(true);

    try {
      if (editingCollege) {
        // Update existing college
        const response = await updateCollege(editingCollege._id, formData);
        if (response.data && response.data.success) {
          toast.success('College updated successfully');
          setColleges(colleges.map(college => 
            college._id === editingCollege._id ? response.data.data : college
          ));
        } else {
          throw new Error(response.data?.message || 'Update failed');
        }
      } else {
        // Create new college
        const response = await createCollege(formData);
        if (response.data && response.data.success) {
          toast.success('College created successfully');
          setColleges([...colleges, response.data.data]);
        } else {
          throw new Error(response.data?.message || 'Creation failed');
        }
      }

      // Reset form and close modal
      resetForm();
    } catch (error) {
      console.error('Save error:', error);
      toast.error(error.response?.data?.message || error.message || 'Failed to save college');
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (college) => {
    setEditingCollege(college);
    setFormData({
      name: college.name || '',
      fullName: college.fullName || '',
      code: college.code || '',
      established: college.established || '',
      location: college.location || '',
      logo: college.logo || '',
      description: college.description || ''
    });
    setShowAddModal(true);
  };

  const handleDelete = async (collegeId) => {
    if (window.confirm('Are you sure you want to delete this college? This will remove all associated data.')) {
      try {
        const response = await deleteCollege(collegeId);
        if (response.data && response.data.success) {
          toast.success('College deleted successfully');
          setColleges(colleges.filter(college => college._id !== collegeId));
        }
      } catch (error) {
        toast.error(error.response?.data?.message || 'Failed to delete college');
      }
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const resetForm = () => {
    setFormData({
      name: '',
      fullName: '',
      code: '',
      established: '',
      location: '',
      logo: '',
      description: ''
    });
    setEditingCollege(null);
    setShowAddModal(false);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner large"></div>
        <p>Loading colleges...</p>
      </div>
    );
  }

  return (
    <div className="college-management">
      <div className="management-header">
        <div className="header-left">
          <h2>College Management</h2>
          <p>Manage educational institutions in the system</p>
        </div>
        <button 
          className="add-btn primary"
          onClick={() => setShowAddModal(true)}
        >
          <FaPlus />
          Add New College
        </button>
      </div>

      <div className="management-controls">
        <div className="search-box">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search colleges by name or code..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="college-stats">
          <span>Total: {colleges.length} colleges</span>
          <span>Active: {colleges.filter(c => c.status === 'active').length}</span>
        </div>
      </div>

      <div className="colleges-table">
        <div className="table-header">
          <div className="col">College</div>
          <div className="col">Code</div>
          <div className="col">Location</div>
          <div className="col">Established</div>
          <div className="col">Branches</div>
          <div className="col">Status</div>
          <div className="col">Actions</div>
        </div>

        <div className="table-body">
          {filteredColleges.map(college => (
            <div key={college._id} className="table-row">
              <div className="col college-info">
                <div className="college-logo">
                  {college.logo ? (
                    <img src={college.logo} alt={college.name} />
                  ) : (
                    <FaUniversity className="default-logo" />
                  )}
                </div>
                <div className="college-details">
                  <strong>{college.name}</strong>
                  <span>{college.fullName}</span>
                </div>
              </div>
              
              <div className="col">
                <span className="college-code">{college.code}</span>
              </div>
              
              <div className="col">
                {college.location}
              </div>
              
              <div className="col">
                {college.established}
              </div>
              
              <div className="col">
                <span className="branches-count">
                  {college.branches ? college.branches.length : 0} branches
                </span>
              </div>
              
              <div className="col">
                <span className={`status-badge ${college.status || 'active'}`}>
                  {college.status || 'active'}
                </span>
              </div>
              
              <div className="col actions">
                <button 
                  className="action-btn edit"
                  onClick={() => handleEdit(college)}
                >
                  <FaEdit />
                </button>
                <button 
                  className="action-btn delete"
                  onClick={() => handleDelete(college._id)}
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {filteredColleges.length === 0 && !loading && (
        <div className="empty-state">
          <FaUniversity className="empty-icon" />
          <h3>No colleges found</h3>
          <p>{searchTerm ? 'Try adjusting your search terms' : 'Add your first college to get started'}</p>
        </div>
      )}

      {/* Add/Edit College Modal */}
      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>{editingCollege ? 'Edit College' : 'Add New College'}</h3>
              <button onClick={resetForm}>×</button>
            </div>
            
            <form onSubmit={handleSubmit} className="modal-content">
              <div className="form-group">
                <label>College Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g., ANITS"
                  required
                />
              </div>

              <div className="form-group">
                <label>Full Name *</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="e.g., Anil Neerukonda Institute of Technology & Sciences"
                  required
                />
              </div>

              <div className="form-group">
                <label>College Code *</label>
                <input
                  type="text"
                  name="code"
                  value={formData.code}
                  onChange={handleChange}
                  placeholder="e.g., ANITS"
                  required
                  style={{ textTransform: 'uppercase' }}
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Established Year</label>
                  <input
                    type="text"
                    name="established"
                    value={formData.established}
                    onChange={handleChange}
                    placeholder="e.g., 2001"
                  />
                </div>

                <div className="form-group">
                  <label>Location</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="e.g., Visakhapatnam, Andhra Pradesh"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Logo URL</label>
                <input
                  type="url"
                  name="logo"
                  value={formData.logo}
                  onChange={handleChange}
                  placeholder="https://example.com/logo.png"
                />
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Brief description about the college..."
                  rows="3"
                />
              </div>
            </form>

            <div className="modal-actions">
              <button 
                className="btn secondary"
                onClick={resetForm}
                disabled={saving}
              >
                <FaTimes />
                Cancel
              </button>
              <button 
                className="btn primary"
                onClick={handleSubmit}
                disabled={saving || !formData.name || !formData.fullName || !formData.code}
              >
                {saving ? (
                  <div className="loading-spinner small"></div>
                ) : (
                  <FaSave />
                )}
                {editingCollege ? 'Update College' : 'Add College'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CollegeManagement;