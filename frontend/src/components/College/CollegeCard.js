import React from 'react';
import { FaUniversity, FaArrowRight } from 'react-icons/fa';

const CollegeCard = ({ college, onSelect }) => {
  // Handle logo display - use actual logo URL from database
  const getLogoUrl = (logo) => {
    if (!logo) return null;
    
    // If logo is a full URL (from Cloudinary/S3)
    if (logo.startsWith('http')) return logo;
    
    // If logo is a relative path
    return logo;
  };

  const logoUrl = getLogoUrl(college.logo);

  return (
    <div className="college-card" onClick={() => onSelect(college)}>
      <div className="college-header">
        <div className="college-logo">
          {logoUrl ? (
            <img 
              src={logoUrl} 
              alt={college.name}
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
          ) : null}
          <div className={`default-logo ${logoUrl ? 'fallback' : ''}`}>
            <FaUniversity />
          </div>
        </div>
        
        <div className="college-badge">
          <span className="college-code">{college.code}</span>
        </div>
      </div>
      
      <div className="college-info">
        <h3>{college.name}</h3>
        <p className="college-fullname">{college.fullName || college.description}</p>
        
        <div className="college-details">
          {college.established && (
            <div className="detail">
              <strong>Est:</strong> {college.established}
            </div>
          )}
          {college.location && (
            <div className="detail">
              <strong>Location:</strong> {college.location}
            </div>
          )}
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