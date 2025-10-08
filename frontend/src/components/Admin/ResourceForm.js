import React, { useState } from 'react';
import { FaYoutube, FaPlus, FaTrash, FaLink } from 'react-icons/fa';

const ResourceForm = ({ formData, onChange, branches, semesters, subjects }) => {
  const [youtubeLink, setYoutubeLink] = useState({ title: '', url: '', description: '' });

  const handleAddYoutubeLink = () => {
    if (youtubeLink.url && youtubeLink.title) {
      const updatedLinks = [...(formData.youtubeLinks || []), { ...youtubeLink }];
      onChange({ ...formData, youtubeLinks: updatedLinks });
      setYoutubeLink({ title: '', url: '', description: '' });
    }
  };

  const handleRemoveYoutubeLink = (index) => {
    const updatedLinks = formData.youtubeLinks.filter((_, i) => i !== index);
    onChange({ ...formData, youtubeLinks: updatedLinks });
  };

  const handleYoutubeLinkChange = (field, value) => {
    setYoutubeLink(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="resource-form">
      <div className="form-group">
        <label>Resource Title *</label>
        <input
          type="text"
          value={formData.title || ''}
          onChange={(e) => onChange({ ...formData, title: e.target.value })}
          placeholder="Enter resource title"
          required
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Branch *</label>
          <select
            value={formData.branch || ''}
            onChange={(e) => onChange({ ...formData, branch: e.target.value })}
            required
          >
            <option value="">Select Branch</option>
            {branches.map(branch => (
              <option key={branch._id} value={branch._id}>
                {branch.name} - {branch.fullName}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Semester *</label>
          <select
            value={formData.semester || ''}
            onChange={(e) => onChange({ ...formData, semester: e.target.value })}
            required
          >
            <option value="">Select Semester</option>
            {semesters.map(semester => (
              <option key={semester._id} value={semester._id}>
                {semester.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="form-group">
        <label>Subject *</label>
        <select
          value={formData.subject || ''}
          onChange={(e) => onChange({ ...formData, subject: e.target.value })}
          required
        >
          <option value="">Select Subject</option>
          {subjects.map(subject => (
            <option key={subject._id} value={subject._id}>
              {subject.name} ({subject.code})
            </option>
          ))}
        </select>
      </div>

      {/* YouTube Links Section */}
      <div className="form-section">
        <h4>YouTube Video Links</h4>
        <div className="youtube-links-form">
          <div className="youtube-link-input">
            <div className="form-row">
              <div className="form-group">
                <label>Video Title *</label>
                <input
                  type="text"
                  value={youtubeLink.title}
                  onChange={(e) => handleYoutubeLinkChange('title', e.target.value)}
                  placeholder="Enter video title"
                />
              </div>
              <div className="form-group">
                <label>YouTube URL *</label>
                <input
                  type="url"
                  value={youtubeLink.url}
                  onChange={(e) => handleYoutubeLinkChange('url', e.target.value)}
                  placeholder="https://www.youtube.com/watch?v=..."
                />
              </div>
            </div>
            <div className="form-group">
              <label>Description (Optional)</label>
              <input
                type="text"
                value={youtubeLink.description}
                onChange={(e) => handleYoutubeLinkChange('description', e.target.value)}
                placeholder="Brief description of the video"
              />
            </div>
            <button
              type="button"
              className="btn secondary"
              onClick={handleAddYoutubeLink}
              disabled={!youtubeLink.title || !youtubeLink.url}
            >
              <FaPlus />
              Add YouTube Link
            </button>
          </div>

          {/* Added YouTube Links */}
          {formData.youtubeLinks && formData.youtubeLinks.length > 0 && (
            <div className="added-youtube-links">
              <h5>Added YouTube Links:</h5>
              {formData.youtubeLinks.map((link, index) => (
                <div key={index} className="youtube-link-item">
                  <div className="link-info">
                    <FaYoutube className="youtube-icon" />
                    <div>
                      <strong>{link.title}</strong>
                      <span className="link-url">{link.url}</span>
                      {link.description && <p>{link.description}</p>}
                    </div>
                  </div>
                  <button
                    type="button"
                    className="btn danger small"
                    onClick={() => handleRemoveYoutubeLink(index)}
                  >
                    <FaTrash />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="form-group">
        <label>Summary</label>
        <textarea
          value={formData.summary || ''}
          onChange={(e) => onChange({ ...formData, summary: e.target.value })}
          placeholder="Brief summary of this resource..."
          rows="3"
        />
      </div>

      <div className="form-group">
        <label>Tags (comma separated)</label>
        <input
          type="text"
          value={formData.tags ? formData.tags.join(', ') : ''}
          onChange={(e) => onChange({ 
            ...formData, 
            tags: e.target.value.split(',').map(tag => tag.trim()).filter(tag => tag) 
          })}
          placeholder="e.g., programming, algorithms, data structures"
        />
      </div>

      <div className="form-group">
        <label>Difficulty Level</label>
        <select
          value={formData.difficulty || 'medium'}
          onChange={(e) => onChange({ ...formData, difficulty: e.target.value })}
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>
    </div>
  );
};

export default ResourceForm;