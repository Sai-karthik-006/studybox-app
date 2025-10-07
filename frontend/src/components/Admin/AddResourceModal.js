import React, { useState, useEffect } from 'react';
import { FaTimes, FaYoutube, FaPlus, FaTrash, FaLink } from 'react-icons/fa';
import { getSubjectsBySemester } from '../../utils/api';

const AddResourceModal = ({ isOpen, onClose, onAddResource, colleges, branches, semesters }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    tags: '',
    difficulty: 'medium',
    collegeId: '',
    branchId: '',
    semesterId: '',
    subjectId: '',
    youtubeLinks: []
  });

  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newYoutubeLink, setNewYoutubeLink] = useState({
    title: '',
    url: '',
    channel: '',
    duration: '',
    description: ''
  });

  // Fetch subjects when semester changes
  useEffect(() => {
    if (formData.semesterId) {
      fetchSubjects(formData.semesterId);
    }
  }, [formData.semesterId]);

  const fetchSubjects = async (semesterId) => {
    try {
      const response = await getSubjectsBySemester(semesterId);
      setSubjects(response.data.data || []);
    } catch (error) {
      console.error('Error fetching subjects:', error);
      setSubjects([]);
    }
  };

  const handleAddYoutubeLink = () => {
    if (!newYoutubeLink.title || !newYoutubeLink.url) {
      alert('Please enter video title and URL');
      return;
    }

    // Validate YouTube URL
    if (!isValidYouTubeUrl(newYoutubeLink.url)) {
      alert('Please enter a valid YouTube URL');
      return;
    }

    setFormData({
      ...formData,
      youtubeLinks: [...formData.youtubeLinks, { ...newYoutubeLink }]
    });

    setNewYoutubeLink({
      title: '',
      url: '',
      channel: '',
      duration: '',
      description: ''
    });
  };

  const removeYoutubeLink = (index) => {
    const updatedLinks = formData.youtubeLinks.filter((_, i) => i !== index);
    setFormData({ ...formData, youtubeLinks: updatedLinks });
  };

  const isValidYouTubeUrl = (url) => {
    const pattern = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/;
    return pattern.test(url);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title || !formData.subjectId || !formData.collegeId) {
      alert('Please fill all required fields');
      return;
    }

    setLoading(true);
    try {
      await onAddResource(formData);
      onClose();
      // Reset form
      setFormData({
        title: '',
        description: '',
        tags: '',
        difficulty: 'medium',
        collegeId: '',
        branchId: '',
        semesterId: '',
        subjectId: '',
        youtubeLinks: []
      });
    } catch (error) {
      alert('Error adding resource: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal large-modal">
        <div className="modal-header">
          <h3>Add New Resource</h3>
          <button onClick={onClose}>
            <FaTimes />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-content">
          {/* Academic Hierarchy */}
          <div className="form-section">
            <h4>Academic Information</h4>
            <div className="form-row">
              <div className="form-group">
                <label>College *</label>
                <select 
                  value={formData.collegeId} 
                  onChange={(e) => setFormData({...formData, collegeId: e.target.value})}
                  required
                >
                  <option value="">Select College</option>
                  {colleges.map(college => (
                    <option key={college._id} value={college._id}>
                      {college.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Branch</label>
                <select 
                  value={formData.branchId} 
                  onChange={(e) => setFormData({...formData, branchId: e.target.value})}
                >
                  <option value="">Select Branch</option>
                  {branches.map(branch => (
                    <option key={branch._id} value={branch._id}>
                      {branch.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Semester</label>
                <select 
                  value={formData.semesterId} 
                  onChange={(e) => setFormData({...formData, semesterId: e.target.value})}
                >
                  <option value="">Select Semester</option>
                  {semesters.map(semester => (
                    <option key={semester._id} value={semester._id}>
                      {semester.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Subject *</label>
                <select 
                  value={formData.subjectId} 
                  onChange={(e) => setFormData({...formData, subjectId: e.target.value})}
                  required
                  disabled={!formData.semesterId}
                >
                  <option value="">Select Subject</option>
                  {subjects.map(subject => (
                    <option key={subject._id} value={subject._id}>
                      {subject.name} ({subject.code})
                    </option>
                  ))}
                </select>
                {!formData.semesterId && (
                  <small>Select semester first to see subjects</small>
                )}
              </div>
            </div>
          </div>

          {/* Resource Details */}
          <div className="form-section">
            <h4>Resource Details</h4>
            <div className="form-group">
              <label>Title *</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                placeholder="Enter resource title"
                required
              />
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                placeholder="Describe this resource..."
                rows="3"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Difficulty Level</label>
                <select 
                  value={formData.difficulty} 
                  onChange={(e) => setFormData({...formData, difficulty: e.target.value})}
                >
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </div>

              <div className="form-group">
                <label>Tags</label>
                <input
                  type="text"
                  value={formData.tags}
                  onChange={(e) => setFormData({...formData, tags: e.target.value})}
                  placeholder="e.g., programming, algorithms, data-structures"
                />
                <small>Separate tags with commas</small>
              </div>
            </div>
          </div>

          {/* YouTube Links Section */}
          <div className="form-section">
            <h4>
              <FaYoutube style={{ color: '#FF0000', marginRight: '0.5rem' }} />
              YouTube Video Links
            </h4>
            
            {/* Add YouTube Link Form */}
            <div className="youtube-link-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Video Title *</label>
                  <input
                    type="text"
                    value={newYoutubeLink.title}
                    onChange={(e) => setNewYoutubeLink({...newYoutubeLink, title: e.target.value})}
                    placeholder="Enter video title"
                  />
                </div>
                <div className="form-group">
                  <label>YouTube URL *</label>
                  <input
                    type="url"
                    value={newYoutubeLink.url}
                    onChange={(e) => setNewYoutubeLink({...newYoutubeLink, url: e.target.value})}
                    placeholder="https://www.youtube.com/watch?v=..."
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Channel Name</label>
                  <input
                    type="text"
                    value={newYoutubeLink.channel}
                    onChange={(e) => setNewYoutubeLink({...newYoutubeLink, channel: e.target.value})}
                    placeholder="Enter channel name"
                  />
                </div>
                <div className="form-group">
                  <label>Duration</label>
                  <input
                    type="text"
                    value={newYoutubeLink.duration}
                    onChange={(e) => setNewYoutubeLink({...newYoutubeLink, duration: e.target.value})}
                    placeholder="e.g., 15:30"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Video Description</label>
                <textarea
                  value={newYoutubeLink.description}
                  onChange={(e) => setNewYoutubeLink({...newYoutubeLink, description: e.target.value})}
                  placeholder="Brief description of the video..."
                  rows="2"
                />
              </div>

              <button
                type="button"
                className="btn secondary"
                onClick={handleAddYoutubeLink}
                disabled={!newYoutubeLink.title || !newYoutubeLink.url}
              >
                <FaPlus /> Add Video Link
              </button>
            </div>

            {/* Display Added YouTube Links */}
            {formData.youtubeLinks.length > 0 && (
              <div className="youtube-links-list">
                <h5>Added Videos ({formData.youtubeLinks.length})</h5>
                {formData.youtubeLinks.map((link, index) => (
                  <div key={index} className="youtube-link-item">
                    <div className="link-info">
                      <FaLink className="link-icon" />
                      <div>
                        <strong>{link.title}</strong>
                        <div className="link-url">{link.url}</div>
                        {link.channel && <div>Channel: {link.channel}</div>}
                      </div>
                    </div>
                    <button
                      type="button"
                      className="btn danger"
                      onClick={() => removeYoutubeLink(index)}
                    >
                      <FaTrash />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="modal-actions">
            <button 
              type="button" 
              className="btn secondary" 
              onClick={onClose}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="btn primary"
              disabled={loading}
            >
              {loading ? 'Adding Resource...' : 'Add Resource'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddResourceModal;