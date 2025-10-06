import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../components/Common/Header';
import { getYears } from '../utils/api';
import { FaCalendarAlt, FaArrowRight } from 'react-icons/fa';

const YearSelection = () => {
  const [years, setYears] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const { college, branch } = location.state || {};

  useEffect(() => {
    fetchYears();
  }, []);

  const fetchYears = async () => {
    try {
      // Mock data - replace with actual API call
      const mockYears = [
        { _id: '1', name: '1st Year', description: 'First Year Engineering' },
        { _id: '2', name: '2nd Year', description: 'Second Year Engineering' },
        { _id: '3', name: '3rd Year', description: 'Third Year Engineering' },
        { _id: '4', name: '4th Year', description: 'Final Year Engineering' }
      ];
      setYears(mockYears);
    } catch (error) {
      console.error('Error fetching years:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleYearSelect = (year) => {
    navigate('/semesters', { state: { college, branch, year } });
  };

  if (loading) {
    return (
      <div className="page-container">
        <Header />
        <div className="loading-container">
          <FaCalendarAlt className="loading-icon" />
          <p>Loading years...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <Header />
      
      <div className="page-content">
        <div className="page-header">
          <h1>Select Academic Year</h1>
          <p>Choose your year of study for {branch?.name} at {college?.name}</p>
        </div>

        <div className="selection-grid">
          {years.map(year => (
            <div 
              key={year._id} 
              className="selection-card"
              onClick={() => handleYearSelect(year)}
            >
              <div className="selection-icon">
                <FaCalendarAlt />
              </div>
              
              <div className="selection-info">
                <h3>{year.name}</h3>
                <p>{year.description}</p>
              </div>
              
              <div className="selection-arrow">
                <FaArrowRight />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default YearSelection;