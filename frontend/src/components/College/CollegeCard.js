import React from 'react';
import { FaUniversity, FaArrowRight, FaUsers, FaBook } from 'react-icons/fa';

const CollegeCard = ({ college, onSelect }) => {
  return (
    <div className="college-card" onClick={() => onSelect(college)}>
      <div className="college-header">
        <div className="college-logo">
          {college.logo ? (
            <img src={college.logo} alt={college.name} />
          ) : (
            <FaUniversity className="default-logo" />
          )}
        </div>
        
        <div className="college-badge">
          <span className="college-code">{college.code}</span>
        </div>
      </div>
      
      <div className="college-info">
        <h3>{college.name}</h3>
        <p className="college-fullname">{college.fullName || college.description}</p>
        
        <div className="college-stats">
          <div className="stat">
            <FaUsers className="stat-icon" />
            <span>1.2K+ Students</span>
          </div>
          <div className="stat">
            <FaBook className="stat-icon" />
            <span>200+ Resources</span>
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