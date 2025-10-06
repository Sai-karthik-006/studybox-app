import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../components/Common/Header';
import { getSemesters } from '../utils/api';
import { FaBook, FaArrowRight } from 'react-icons/fa';

const SemesterSelection = () => {
  const [semesters, setSemesters] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const { college, branch, year } = location.state || {};

  useEffect(() => {
    fetchSemesters();
  }, []);

  const fetchSemesters = async () => {
    try {
      // Mock data - replace with actual API call
      const mockSemesters = [
        { _id: '1', name: 'Semester 1', description: 'First Semester' },
        { _id: '2', name: 'Semester 2', description: 'Second Semester' },
        { _id: '3', name: 'Semester 3', description: 'Third Semester' },
        { _id: '4', name: 'Semester 4', description: 'Fourth Semester' },
        { _id: '5', name: 'Semester 5', description: 'Fifth Semester' },
        { _id: '6', name: 'Semester 6', description: 'Sixth Semester' },
        { _id: '7', name: 'Semester 7', description: 'Seventh Semester' },
        { _id: '8', name: 'Semester 8', description: 'Eighth Semester' }
      ].slice(0, (parseInt(year.name) * 2)); // Show semesters based on year
    
      setSemesters(mockSemesters);
    } catch (error) {
      console.error('Error fetching semesters:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSemesterSelect = (semester) => {
    navigate('/subjects', { state: { college, branch, year, semester } });
  };

  if (loading) {
    return (
      <div className="page-container">
        <Header />
        <div className="loading-container">
          <FaBook className="loading-icon" />
          <p>Loading semesters...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <Header />
      
      <div className="page-content">
        <div className="page-header">
          <h1>Select Semester</h1>
          <p>Choose your semester for {year?.name} - {branch?.name}</p>
        </div>

        <div className="selection-grid">
          {semesters.map(semester => (
            <div 
              key={semester._id} 
              className="selection-card"
              onClick={() => handleSemesterSelect(semester)}
            >
              <div className="selection-icon">
                <FaBook />
              </div>
              
              <div className="selection-info">
                <h3>{semester.name}</h3>
                <p>{semester.description}</p>
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

export default SemesterSelection;