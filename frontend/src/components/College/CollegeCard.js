import React from 'react';
import { FaUniversity, FaArrowRight } from 'react-icons/fa';

const CollegeCard = ({ college, onSelect }) => {
  // Handle logo display with proper error handling
  const handleImageError = (e) => {
    e.target.style.display = 'none';
    const fallback = e.target.nextSibling;
    if (fallback) fallback.style.display = 'flex';
  };

  const handleImageLoad = (e) => {
    e.target.style.display = 'block';
    const fallback = e.target.nextSibling;
    if (fallback) fallback.style.display = 'none';
  };

  return (
    <div className="college-card" onClick={() => onSelect(college)}>
      <div className="college-header">
        <div className="college-logo">
          {college.logo ? (
            <>
              <img 
                src={college.logo} 
                alt={college.name}
                onError={handleImageError}
                onLoad={handleImageLoad}
              />
              <div className="default-logo fallback">
                <FaUniversity />
              </div>
            </>
          ) : (
            <div className="default-logo">
              <FaUniversity />
            </div>
          )}
        </div>
        
        <div className="college-badge">
          <span className="college-code">{college.code}</span>
        </div>
      </div>
      
      <div className="college-info">
        <h3>{college.name}</h3>
        <p className="college-fullname">{college.fullName}</p>
        
        <div className="college-details">
          {college.established && college.established !== "Not specified" && (
            <div className="detail">
              <strong>Est:</strong> {college.established}
            </div>
          )}
          {college.location && college.location !== "Not specified" && (
            <div className="detail">
              <strong>Location:</strong> {college.location}
            </div>
          )}
        </div>

        <div className="college-stats">
          <div className="stat">
            <span className="stat-number">
              {college.branches ? college.branches.length : 0}
            </span>
            <span className="stat-label">Branches</span>
          </div>
        </div>
      </div>
      
      <div className="college-footer">
        <button className="select-college-btn">
          Select College
          <FaArrowRight className="arrow-icon" />
        </button>
      </div>
    </div>
  );
};

export default CollegeCard;