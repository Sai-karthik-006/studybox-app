import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Common/Header';
import CollegeGrid from '../components/College/CollegeGrid';
import { getColleges } from '../utils/api';
import { FaSearch, FaUniversity, FaPlus } from 'react-icons/fa';

const CollegeSelection = () => {
  const [colleges, setColleges] = useState([]);
  const [filteredColleges, setFilteredColleges] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchColleges();
  }, []);

  useEffect(() => {
    const filtered = colleges.filter(college =>
      college.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      college.fullName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredColleges(filtered);
  }, [searchTerm, colleges]);

  const fetchColleges = async () => {
    try {
      setLoading(true);
      // Use actual API call - remove mock data
      const response = await getColleges();
      if (response.data && response.data.success) {
        setColleges(response.data.data);
        setFilteredColleges(response.data.data);
      } else {
        console.error('Failed to fetch colleges');
      }
    } catch (error) {
      console.error('Error fetching colleges:', error);
      // Fallback to empty array instead of mock data
      setColleges([]);
      setFilteredColleges([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCollegeSelect = (college) => {
    navigate('/branches', { state: { college } });
  };

  if (loading) {
    return (
      <div className="page-container">
        <Header />
        <div className="loading-container">
          <FaUniversity className="loading-icon" />
          <p>Loading colleges...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <Header />
      
      <div className="page-content">
        <div className="page-header">
          <h1>Select Your College</h1>
          <p>Choose your college to access relevant study materials</p>
        </div>

        <div className="search-container">
          <div className="search-box">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search colleges by name or code..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
        </div>

        <CollegeGrid 
          colleges={filteredColleges} 
          onCollegeSelect={handleCollegeSelect}
        />

        {filteredColleges.length === 0 && !loading && (
          <div className="empty-state">
            <FaUniversity className="empty-icon" />
            <h3>No colleges available</h3>
            <p>Colleges will be added by administrators soon</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CollegeSelection;