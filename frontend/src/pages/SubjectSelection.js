import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../components/Common/Header';
import { getSubjects } from '../utils/api';
import { FaGraduationCap, FaArrowRight, FaSearch } from 'react-icons/fa';

const SubjectSelection = () => {
  const [subjects, setSubjects] = useState([]);
  const [filteredSubjects, setFilteredSubjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const { college, branch, year, semester } = location.state || {};

  useEffect(() => {
    fetchSubjects();
  }, []);

  useEffect(() => {
    const filtered = subjects.filter(subject =>
      subject.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      subject.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredSubjects(filtered);
  }, [searchTerm, subjects]);

  const fetchSubjects = async () => {
    try {
      // Mock data - replace with actual API call
      const mockSubjects = [
        {
          _id: '1',
          name: 'Data Structures',
          code: 'CS201',
          description: 'Algorithms and data structure implementation',
          credits: 4
        },
        {
          _id: '2',
          name: 'Database Management',
          code: 'CS202',
          description: 'SQL, normalization, and database design',
          credits: 3
        },
        {
          _id: '3',
          name: 'Operating Systems',
          code: 'CS203',
          description: 'Process management, memory allocation, file systems',
          credits: 4
        },
        {
          _id: '4',
          name: 'Computer Networks',
          code: 'CS204',
          description: 'Network protocols and communication',
          credits: 3
        },
        {
          _id: '5',
          name: 'Software Engineering',
          code: 'CS205',
          description: 'Software development lifecycle and methodologies',
          credits: 3
        }
      ];
      setSubjects(mockSubjects);
      setFilteredSubjects(mockSubjects);
    } catch (error) {
      console.error('Error fetching subjects:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubjectSelect = (subject) => {
    navigate('/resources', { state: { college, branch, year, semester, subject } });
  };

  if (loading) {
    return (
      <div className="page-container">
        <Header />
        <div className="loading-container">
          <FaGraduationCap className="loading-icon" />
          <p>Loading subjects...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <Header />
      
      <div className="page-content">
        <div className="page-header">
          <h1>Select Subject</h1>
          <p>Choose a subject from {semester?.name} - {branch?.name}</p>
        </div>

        <div className="search-container">
          <div className="search-box">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search subjects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
        </div>

        <div className="subjects-grid">
          {filteredSubjects.map(subject => (
            <div 
              key={subject._id} 
              className="subject-card"
              onClick={() => handleSubjectSelect(subject)}
            >
              <div className="subject-header">
                <div className="subject-icon">
                  <FaGraduationCap />
                </div>
                <div className="subject-code">{subject.code}</div>
              </div>
              
              <div className="subject-info">
                <h3>{subject.name}</h3>
                <p className="subject-desc">{subject.description}</p>
                <div className="subject-meta">
                  <span className="credits">{subject.credits} Credits</span>
                </div>
              </div>
              
              <div className="subject-arrow">
                <FaArrowRight />
              </div>
            </div>
          ))}
        </div>

        {filteredSubjects.length === 0 && (
          <div className="empty-state">
            <FaGraduationCap className="empty-icon" />
            <h3>No subjects found</h3>
            <p>Try adjusting your search terms</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SubjectSelection;