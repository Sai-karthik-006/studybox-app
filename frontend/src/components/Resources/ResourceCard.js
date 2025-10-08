import React, { useState } from 'react';
import { FaStar, FaHeart, FaEye, FaFilePdf, FaYoutube, FaDownload, FaExternalLinkAlt } from 'react-icons/fa';

const ResourceCard = ({ resource }) => {
  const [liked, setLiked] = useState(false);
  const [localLikes, setLocalLikes] = useState(resource.likes || 0);

  const handleLike = () => {
    setLiked(!liked);
    setLocalLikes(liked ? localLikes - 1 : localLikes + 1);
  };

  const handleDownload = (pdf) => {
    const link = document.createElement('a');
    link.href = pdf.url;
    link.download = pdf.filename || 'download.pdf';
    link.click();
  };

  const handleYouTubeClick = (url) => {
    window.open(url, '_blank');
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

      {resource.summary && (
        <p className="resource-summary">{resource.summary}</p>
      )}

      {resource.tags && resource.tags.length > 0 && (
        <div className="resource-tags">
          {resource.tags.map((tag, index) => (
            <span key={index} className="resource-tag">#{tag}</span>
          ))}
        </div>
      )}

      <div className="resource-files">
        {/* PDF Files */}
        {resource.pdfs && resource.pdfs.length > 0 && (
          <div className="file-section">
            <div className="file-header">
              <FaFilePdf className="file-icon pdf" />
              <span>Study Materials ({resource.pdfs.length})</span>
            </div>
            <div className="file-list">
              {resource.pdfs.map((pdf, index) => (
                <div key={index} className="file-item">
                  <span className="file-name">
                    {pdf.filename || `Document ${index + 1}`}
                  </span>
                  <button 
                    className="download-btn"
                    onClick={() => handleDownload(pdf)}
                    title="Download PDF"
                  >
                    <FaDownload />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* YouTube Links */}
        {resource.youtubeLinks && resource.youtubeLinks.length > 0 && (
          <div className="file-section">
            <div className="file-header">
              <FaYoutube className="file-icon video" />
              <span>Video Tutorials ({resource.youtubeLinks.length})</span>
            </div>
            <div className="youtube-links-list">
              {resource.youtubeLinks.map((video, index) => (
                <div 
                  key={index} 
                  className="youtube-link-item"
                  onClick={() => handleYouTubeClick(video.url)}
                >
                  <div className="youtube-link-content">
                    <FaYoutube className="youtube-icon" />
                    <div className="video-info">
                      <strong>{video.title || `Video Tutorial ${index + 1}`}</strong>
                      {video.description && (
                        <p className="video-description">{video.description}</p>
                      )}
                      <span className="video-url">{video.url}</span>
                    </div>
                    <FaExternalLinkAlt className="external-icon" />
                  </div>
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
            <span>{resource.rating || 0}</span>
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
            <span>{resource.views || 0}</span>
          </div>
        </div>
        
        {resource.addedBy && (
          <div className="resource-author">
            Added by {resource.addedBy.firstName} {resource.addedBy.lastName}
          </div>
        )}
      </div>
    </div>
  );
};

export default ResourceCard;