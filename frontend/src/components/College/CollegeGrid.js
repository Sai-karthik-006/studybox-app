import React from 'react';
import CollegeCard from './CollegeCard';

const CollegeGrid = ({ colleges, onCollegeSelect }) => {
  return (
    <div className="college-grid">
      {colleges.map(college => (
        <CollegeCard
          key={college._id}
          college={college}
          onSelect={onCollegeSelect}
        />
      ))}
    </div>
  );
};

export default CollegeGrid;