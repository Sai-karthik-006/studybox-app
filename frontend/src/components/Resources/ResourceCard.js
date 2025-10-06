import React, { useState } from 'react';
import { FaStar, FaHeart, FaEye, FaFilePdf, FaYoutube, FaDownload } from 'react-icons/fa';

const ResourceCard = ({ resource }) => {
  const [liked, setLiked] = useState(false);
  const [localLikes, setLocalLikes] = useState(resource.likes);

  const handleLike = () => {
    setLiked(!liked);
    setLocalLikes(liked ? localLikes - 1 : localLikes + 1);
  };

  const handleDownload = (pdf) => {
    // Simulate download
    const link = document.createElement('a');
    link.href = pdf.url;
    link.download = pdf.filename;
    link.click();
  };

  const getDifficultyColor = (difficulty) => {
    const colors = {
      easy: '#10B981',
      medium: '#F59E0B',
      hard: '#EF4444'
    };
    return colors[difficulty] || '#6B7280';
  };

  return (
    <div className="resource-card">
      <div className="resource-header">
        <h3 className="resource-title">{resource.title}</h3>
        <div 
          className="difficulty-badge"
          style={{ backgroundColor: getDifficultyColor(resource.difficulty) }}
        >
          {resource.difficulty}
        </div>
      </div>

      <p className="resource-summary">{resource.summary}</p>

      <div className="resource-tags">
        {resource.tags.map((tag, index) => (
          <span key={index} className="resource-tag">#{tag}</span>
        ))}
      </div>

      <div className="resource-files">
        {resource.pdfs.length > 0 && (
          <div className="file-section">
            <div className="file-header">
              <FaFilePdf className="file-icon pdf" />
              <span>Study Materials ({resource.pdfs.length})</span>
            </div>
            <div className="file-list">
              {resource.pdfs.map((pdf, index) => (
                <div key={index} className="file-item">
                  <span className="file-name">{pdf.filename}</span>
                  <button 
                    className="download-btn"
                    onClick={() => handleDownload(pdf)}
                  >
                    <FaDownload />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {resource.youtubeLinks.length > 0 && (
          <div className="file-section">
            <div className="file-header">
              <FaYoutube className="file-icon video" />
              <span>Video Tutorials ({resource.youtubeLinks.length})</span>
            </div>
            <div className="video-list">
              {resource.youtubeLinks.map((video, index) => (
                <div key={index} className="video-item">
                  <div className="video-thumbnail">
                    <FaYoutube className="video-placeholder" />
                  </div>
                  <span className="video-title">Tutorial {index + 1}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="resource-footer">
        <div className="resource-stats">
          <div className="stat">
            <FaStar className="stat-icon" />
            <span>{resource.rating}</span>
          </div>
          <div className="stat">
            <FaHeart 
              className={`stat-icon ${liked ? 'liked' : ''}`}
              onClick={handleLike}
            />
            <span>{localLikes}</span>
          </div>
          <div className="stat">
            <FaEye className="stat-icon" />
            <span>{resource.views}</span>
          </div>
        </div>
        
        <div className="resource-author">
          Added by {resource.addedBy.firstName} {resource.addedBy.lastName}
        </div>
      </div>
    </div>
  );
};

export default ResourceCard;