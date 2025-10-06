import React from 'react';

const BranchCard = ({ branch, onSelect, getBranchIcon }) => {
  const IconComponent = getBranchIcon(branch.icon);
  
  return (
    <div 
      className="branch-card" 
      onClick={() => onSelect(branch)}
      style={{ '--branch-color': branch.color }}
    >
      <div className="branch-icon">
        <IconComponent />
      </div>
      
      <div className="branch-info">
        <h3>{branch.name}</h3>
        <p className="branch-fullname">{branch.fullName}</p>
        <p className="branch-desc">{branch.description}</p>
      </div>
      
      <div className="branch-arrow">
        <span>→</span>
      </div>
    </div>
  );
};

export default BranchCard;