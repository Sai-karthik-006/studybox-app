import React from 'react';
import BranchCard from './BranchCard';

const BranchGrid = ({ branches, onBranchSelect, getBranchIcon }) => {
  return (
    <div className="branch-grid">
      {branches.map(branch => (
        <BranchCard
          key={branch._id}
          branch={branch}
          onSelect={onBranchSelect}
          getBranchIcon={getBranchIcon}
        />
      ))}
    </div>
  );
};

export default BranchGrid;
