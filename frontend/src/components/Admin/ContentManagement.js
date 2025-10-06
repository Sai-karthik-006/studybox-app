import React, { useState } from 'react';
import { 
  FaPlus, 
  FaSearch, 
  FaEdit, 
  FaTrash, 
  FaCheck, 
  FaTimes, 
  FaBook, 
  FaYoutube, 
  FaFilePdf,
  FaUpload  // ADD THIS IMPORT
} from 'react-icons/fa';

const ContentManagement = () => {
  const [resources, setResources] = useState([
    {
      _id: '1',
      title: 'Data Structures Complete Guide',
      subject: 'Data Structures',
      college: 'ANITS',
      branch: 'CSE',
      type: 'pdf',
      status: 'approved',
      uploadedBy: 'Admin',
      uploadDate: '2024-01-15',
      views: 156,
      likes: 23
    }
  ]);

  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newResource, setNewResource] = useState({
    title: '',
    subject: '',
    college: 'ANITS',
    branch: 'CSE',
    type: 'pdf',
    description: '',
    file: null
  });

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' || resource.status === filter;
    return matchesSearch && matchesFilter;
  });

  const approveResource = (resourceId) => {
    setResources(resources.map(resource =>
      resource._id === resourceId ? { ...resource, status: 'approved' } : resource
    ));
    alert('Resource approved successfully!');
  };

  const rejectResource = (resourceId) => {
    if (window.confirm('Are you sure you want to reject this resource?')) {
      setResources(resources.filter(resource => resource._id !== resourceId));
      alert('Resource rejected!');
    }
  };

  const deleteResource = (resourceId) => {
    if (window.confirm('Are you sure you want to delete this resource?')) {
      setResources(resources.filter(resource => resource._id !== resourceId));
      alert('Resource deleted successfully!');
    }
  };

  const handleAddResource = () => {
    if (!newResource.title || !newResource.subject) {
      alert('Please fill all required fields');
      return;
    }

    const resource = {
      _id: Date.now().toString(),
      ...newResource,
      status: 'approved',
      uploadedBy: 'Admin',
      uploadDate: new Date().toISOString().split('T')[0],
      views: 0,
      likes: 0
    };

    setResources([...resources, resource]);
    setNewResource({
      title: '',
      subject: '',
      college: 'ANITS',
      branch: 'CSE',
      type: 'pdf',
      description: '',
      file: null
    });
    setShowAddModal(false);
    alert('Resource added successfully!');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return '#10B981';
      case 'pending': return '#F59E0B';
      case 'rejected': return '#EF4444';
      default: return '#6B7280';
    }
  };

  const getTypeIcon = (type) => {
    return type === 'pdf' ? FaFilePdf : FaYoutube;
  };

  return (
    <div className="content-management">
      <div className="management-header">
        <div className="header-left">
          <h2>Content Management</h2>
          <p>Manage and approve study resources</p>
        </div>
        <button 
          className="add-btn primary"
          onClick={() => setShowAddModal(true)}
        >
          <FaPlus />
          Add Resource
        </button>
      </div>

      <div className="management-controls">
        <div className="search-box">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search resources..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filter-tabs">
          <button 
            className={`filter-tab ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All Resources
          </button>
          <button 
            className={`filter-tab ${filter === 'pending' ? 'active' : ''}`}
            onClick={() => setFilter('pending')}
          >
            Pending Review
          </button>
          <button 
            className={`filter-tab ${filter === 'approved' ? 'active' : ''}`}
            onClick={() => setFilter('approved')}
          >
            Approved
          </button>
        </div>
      </div>

      <div className="resources-table">
        <div className="table-header">
          <div className="col">Resource</div>
          <div className="col">Subject & Branch</div>
          <div className="col">College</div>
          <div className="col">Uploaded By</div>
          <div className="col">Status</div>
          <div className="col">Stats</div>
          <div className="col">Actions</div>
        </div>

        <div className="table-body">
          {filteredResources.map(resource => {
            const TypeIcon = getTypeIcon(resource.type);
            return (
              <div key={resource._id} className="table-row">
                <div className="col resource-info">
                  <div className="resource-icon">
                    <TypeIcon />
                  </div>
                  <div className="resource-details">
                    <strong>{resource.title}</strong>
                    <span className="resource-type">{resource.type.toUpperCase()}</span>
                  </div>
                </div>
                
                <div className="col">
                  <div className="subject-branch">
                    <strong>{resource.subject}</strong>
                    <span>{resource.branch}</span>
                  </div>
                </div>
                
                <div className="col">
                  {resource.college}
                </div>
                
                <div className="col">
                  {resource.uploadedBy}
                  <br />
                  <small>{new Date(resource.uploadDate).toLocaleDateString()}</small>
                </div>
                
                <div className="col">
                  <span 
                    className="status-badge"
                    style={{ backgroundColor: getStatusColor(resource.status) }}
                  >
                    {resource.status}
                  </span>
                </div>
                
                <div className="col">
                  <div className="resource-stats">
                    <span>👁️ {resource.views}</span>
                    <span>❤️ {resource.likes}</span>
                  </div>
                </div>
                
                <div className="col actions">
                  {resource.status === 'pending' && (
                    <>
                      <button 
                        className="action-btn approve"
                        onClick={() => approveResource(resource._id)}
                        title="Approve Resource"
                      >
                        <FaCheck />
                      </button>
                      <button 
                        className="action-btn reject"
                        onClick={() => rejectResource(resource._id)}
                        title="Reject Resource"
                      >
                        <FaTimes />
                      </button>
                    </>
                  )}
                  <button 
                    className="action-btn edit"
                    title="Edit Resource"
                  >
                    <FaEdit />
                  </button>
                  <button 
                    className="action-btn delete"
                    onClick={() => deleteResource(resource._id)}
                    title="Delete Resource"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {filteredResources.length === 0 && (
        <div className="empty-state">
          <FaBook className="empty-icon" />
          <h3>No resources found</h3>
          <p>Try adjusting your search or filter criteria</p>
        </div>
      )}

      {/* Add Resource Modal */}
      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal large-modal">
            <div className="modal-header">
              <h3>Add New Resource</h3>
              <button onClick={() => setShowAddModal(false)}>
                <FaTimes />
              </button>
            </div>
            
            <div className="modal-content">
              <div className="form-group">
                <label>Resource Title *</label>
                <input
                  type="text"
                  value={newResource.title}
                  onChange={(e) => setNewResource({...newResource, title: e.target.value})}
                  placeholder="e.g., Data Structures Complete Guide"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Subject *</label>
                  <input
                    type="text"
                    value={newResource.subject}
                    onChange={(e) => setNewResource({...newResource, subject: e.target.value})}
                    placeholder="e.g., Data Structures"
                  />
                </div>

                <div className="form-group">
                  <label>Branch</label>
                  <select 
                    value={newResource.branch}
                    onChange={(e) => setNewResource({...newResource, branch: e.target.value})}
                  >
                    <option value="CSE">CSE</option>
                    <option value="ECE">ECE</option>
                    <option value="EEE">EEE</option>
                    <option value="MECH">MECH</option>
                    <option value="CIVIL">CIVIL</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>College</label>
                  <select 
                    value={newResource.college}
                    onChange={(e) => setNewResource({...newResource, college: e.target.value})}
                  >
                    <option value="ANITS">ANITS</option>
                    <option value="AU">Andhra University</option>
                    <option value="GVP">Gayatri Vidya Parishad</option>
                    <option value="RVRJC">RVR & JC College</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Resource Type</label>
                  <select 
                    value={newResource.type}
                    onChange={(e) => setNewResource({...newResource, type: e.target.value})}
                  >
                    <option value="pdf">PDF Document</option>
                    <option value="video">Video Tutorial</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea
                  value={newResource.description}
                  onChange={(e) => setNewResource({...newResource, description: e.target.value})}
                  placeholder="Brief description of the resource..."
                  rows="3"
                />
              </div>

              <div className="form-group">
                <label>Upload File *</label>
                <div className="file-upload">
                  <FaUpload className="upload-icon" />
                  <span>Choose {newResource.type === 'pdf' ? 'PDF File' : 'Video File'}</span>
                  <input 
                    type="file" 
                    accept={newResource.type === 'pdf' ? '.pdf' : 'video/*'} 
                    onChange={(e) => setNewResource({...newResource, file: e.target.files[0]})}
                  />
                </div>
                {newResource.file && (
                  <div className="file-preview">
                    <strong>Selected file:</strong> {newResource.file.name}
                  </div>
                )}
              </div>
            </div>

            <div className="modal-actions">
              <button 
                className="btn secondary"
                onClick={() => setShowAddModal(false)}
              >
                Cancel
              </button>
              <button 
                className="btn primary"
                onClick={handleAddResource}
                disabled={!newResource.title || !newResource.subject || !newResource.file}
              >
                Add Resource
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContentManagement;