import React, { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash, FaCode, FaSearch, FaSave, FaTimes } from 'react-icons/fa';
import { addBranch, updateBranch, deleteBranch, getBranches } from '../../utils/api';
import { toast } from 'react-toastify';

const BranchManagement = () => {
  const [branches, setBranches] = useState([]);
  const [filteredBranches, setFilteredBranches] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingBranch, setEditingBranch] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    fullName: '',
    description: '',
    icon: 'FaCode',
    color: '#4F46E5'
  });

  // Available icons for branches
  const availableIcons = [
    { value: 'FaCode', label: 'Code', icon: FaCode },
    { value: 'FaLaptop', label: 'Laptop' },
    { value: 'FaRobot', label: 'AI/Robot' },
    { value: 'FaMicrochip', label: 'Microchip' },
    { value: 'FaBolt', label: 'Electronics' },
    { value: 'FaCogs', label: 'Mechanical' },
    { value: 'FaHardHat', label: 'Civil' },
    { value: 'SiAltiumdesigner', label: 'Design' }
  ];

  // Available colors for branches
  const availableColors = [
    { value: '#4F46E5', label: 'Blue' },
    { value: '#10B981', label: 'Green' },
    { value: '#F59E0B', label: 'Orange' },
    { value: '#EF4444', label: 'Red' },
    { value: '#8B5CF6', label: 'Purple' },
    { value: '#06B6D4', label: 'Cyan' },
    { value: '#DC2626', label: 'Dark Red' },
    { value: '#059669', label: 'Dark Green' }
  ];

  useEffect(() => {
    fetchBranches();
  }, []);

  useEffect(() => {
    const filtered = branches.filter(branch =>
      branch.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      branch.fullName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredBranches(filtered);
  }, [searchTerm, branches]);

  const fetchBranches = async () => {
    try {
      setLoading(true);
      // Since getBranches requires collegeId, we'll fetch all branches differently
      // For now, we'll manage branches globally
      const response = await getBranches();
      if (response.data && response.data.success) {
        setBranches(response.data.data);
        setFilteredBranches(response.data.data);
      } else {
        console.error('Failed to fetch branches');
        setBranches([]);
      }
    } catch (error) {
      console.error('Error fetching branches:', error);
      toast.error('Failed to load branches');
      setBranches([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.fullName) {
      toast.error('Branch name and full name are required');
      return;
    }

    try {
      if (editingBranch) {
        // Update existing branch
        const response = await updateBranch(editingBranch._id, formData);
        if (response.data && response.data.success) {
          toast.success('Branch updated successfully');
          setBranches(branches.map(branch => 
            branch._id === editingBranch._id ? response.data.data : branch
          ));
        }
      } else {
        // Add new branch
        const response = await addBranch(formData);
        if (response.data && response.data.success) {
          toast.success('Branch added successfully');
          setBranches([...branches, response.data.data]);
        }
      }

      // Reset form and close modal
      setFormData({
        name: '',
        fullName: '',
        description: '',
        icon: 'FaCode',
        color: '#4F46E5'
      });
      setEditingBranch(null);
      setShowAddModal(false);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to save branch');
    }
  };

  const handleEdit = (branch) => {
    setEditingBranch(branch);
    setFormData({
      name: branch.name,
      fullName: branch.fullName,
      description: branch.description || '',
      icon: branch.icon || 'FaCode',
      color: branch.color || '#4F46E5'
    });
    setShowAddModal(true);
  };

  const handleDelete = async (branchId) => {
    if (window.confirm('Are you sure you want to delete this branch? This action cannot be undone.')) {
      try {
        const response = await deleteBranch(branchId);
        if (response.data && response.data.success) {
          toast.success('Branch deleted successfully');
          setBranches(branches.filter(branch => branch._id !== branchId));
        }
      } catch (error) {
        toast.error(error.response?.data?.message || 'Failed to delete branch');
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
      description: '',
      icon: 'FaCode',
      color: '#4F46E5'
    });
    setEditingBranch(null);
    setShowAddModal(false);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner large"></div>
        <p>Loading branches...</p>
      </div>
    );
  }

  return (
    <div className="branch-management">
      <div className="management-header">
        <div className="header-left">
          <h2>Branch Management</h2>
          <p>Manage engineering branches available in the system</p>
        </div>
        <button 
          className="add-btn primary"
          onClick={() => setShowAddModal(true)}
        >
          <FaPlus />
          Add New Branch
        </button>
      </div>

      <div className="management-controls">
        <div className="search-box">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search branches..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="branch-stats">
          <span>Total: {branches.length} branches</span>
        </div>
      </div>

      <div className="branches-table">
        <div className="table-header">
          <div className="col">Branch</div>
          <div className="col">Full Name</div>
          <div className="col">Description</div>
          <div className="col">Appearance</div>
          <div className="col">Actions</div>
        </div>

        <div className="table-body">
          {filteredBranches.map(branch => (
            <div key={branch._id} className="table-row">
              <div className="col branch-info">
                <div 
                  className="branch-icon-preview"
                  style={{ backgroundColor: branch.color || '#4F46E5' }}
                >
                  <FaCode />
                </div>
                <div className="branch-details">
                  <strong>{branch.name}</strong>
                  <span className="branch-code">{branch.name}</span>
                </div>
              </div>
              
              <div className="col">
                {branch.fullName}
              </div>
              
              <div className="col">
                {branch.description || 'No description'}
              </div>
              
              <div className="col">
                <div className="appearance-preview">
                  <span 
                    className="color-badge"
                    style={{ backgroundColor: branch.color }}
                  >
                    {branch.color}
                  </span>
                  <span className="icon-name">{branch.icon}</span>
                </div>
              </div>
              
              <div className="col actions">
                <button 
                  className="action-btn edit"
                  onClick={() => handleEdit(branch)}
                >
                  <FaEdit />
                </button>
                <button 
                  className="action-btn delete"
                  onClick={() => handleDelete(branch._id)}
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {filteredBranches.length === 0 && (
        <div className="empty-state">
          <FaCode className="empty-icon" />
          <h3>No branches found</h3>
          <p>{searchTerm ? 'Try adjusting your search terms' : 'Add your first engineering branch'}</p>
        </div>
      )}

      {/* Add/Edit Branch Modal */}
      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal large-modal">
            <div className="modal-header">
              <h3>{editingBranch ? 'Edit Branch' : 'Add New Branch'}</h3>
              <button onClick={resetForm}>×</button>
            </div>
            
            <form onSubmit={handleSubmit} className="modal-content">
              <div className="form-row">
                <div className="form-group">
                  <label>Branch Code *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g., CSE, ECE, MECH"
                    required
                    maxLength="10"
                  />
                  <small>Short code (2-10 characters)</small>
                </div>

                <div className="form-group">
                  <label>Full Name *</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="e.g., Computer Science & Engineering"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe this engineering branch..."
                  rows="3"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Icon</label>
                  <select name="icon" value={formData.icon} onChange={handleChange}>
                    {availableIcons.map(icon => (
                      <option key={icon.value} value={icon.value}>
                        {icon.label}
                      </option>
                    ))}
                  </select>
                  <small>Choose an icon to represent this branch</small>
                </div>

                <div className="form-group">
                  <label>Color</label>
                  <select name="color" value={formData.color} onChange={handleChange}>
                    {availableColors.map(color => (
                      <option key={color.value} value={color.value}>
                        {color.label}
                      </option>
                    ))}
                  </select>
                  <small>Choose a color for this branch</small>
                </div>
              </div>

              <div className="form-group">
                <label>Preview</label>
                <div className="branch-preview">
                  <div 
                    className="preview-icon"
                    style={{ backgroundColor: formData.color }}
                  >
                    <FaCode />
                  </div>
                  <div className="preview-info">
                    <strong>{formData.name || 'BRANCH'}</strong>
                    <span>{formData.fullName || 'Full Branch Name'}</span>
                    <p>{formData.description || 'Branch description...'}</p>
                  </div>
                </div>
              </div>
            </form>

            <div className="modal-actions">
              <button 
                className="btn secondary"
                onClick={resetForm}
              >
                <FaTimes />
                Cancel
              </button>
              <button 
                className="btn primary"
                onClick={handleSubmit}
                disabled={!formData.name || !formData.fullName}
              >
                <FaSave />
                {editingBranch ? 'Update Branch' : 'Add Branch'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BranchManagement;