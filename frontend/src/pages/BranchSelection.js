import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../components/Common/Header';
import BranchGrid from '../components/Branch/BranchGrid';
import { FaCode, FaMicrochip, FaBolt, FaCogs, FaHardHat, FaSearch, FaLaptop } from 'react-icons/fa';
import { SiAltiumdesigner } from 'react-icons/si';

const BranchSelection = () => {
  const [branches, setBranches] = useState([]);
  const [filteredBranches, setFilteredBranches] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { college } = location.state || {};

  useEffect(() => {
    fetchBranches();
  }, []);

  useEffect(() => {
    const filtered = branches.filter(branch =>
      branch.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      branch.fullName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredBranches(filtered);
  }, [searchTerm, branches]);

  const fetchBranches = async () => {
    setLoading(true);
    try {
      // Mock data - replace with actual API call
      const mockBranches = [
        {
          _id: '1',
          name: 'CSE',
          fullName: 'Computer Science & Engineering',
          description: 'Software development, algorithms, and computer systems',
          icon: 'FaCode',
          color: '#4F46E5'
        },
        {
          _id: '2',
          name: 'CSM',
          fullName: 'Computer Science & Engineering (AI & ML)',
          description: 'Artificial Intelligence and Machine Learning',
          icon: 'FaLaptop',
          color: '#10B981'
        },
        {
          _id: '3',
          name: 'CSD',
          fullName: 'Computer Science & Design',
          description: 'UI/UX design with software engineering',
          icon: 'SiAltiumdesigner',
          color: '#F59E0B'
        },
        {
          _id: '4',
          name: 'IT',
          fullName: 'Information Technology',
          description: 'Network systems and information management',
          icon: 'FaMicrochip',
          color: '#EF4444'
        },
        {
          _id: '5',
          name: 'ECE',
          fullName: 'Electronics & Communication Engineering',
          description: 'Electronics, communication systems, and signal processing',
          icon: 'FaBolt',
          color: '#8B5CF6'
        },
        {
          _id: '6',
          name: 'EEE',
          fullName: 'Electrical & Electronics Engineering',
          description: 'Electrical systems, power electronics, and control systems',
          icon: 'FaCogs',
          color: '#06B6D4'
        },
        {
          _id: '7',
          name: 'MECH',
          fullName: 'Mechanical Engineering',
          description: 'Machine design, thermodynamics, and manufacturing',
          icon: 'FaHardHat',
          color: '#DC2626'
        },
        {
          _id: '8',
          name: 'CIVIL',
          fullName: 'Civil Engineering',
          description: 'Construction, structural design, and infrastructure',
          icon: 'FaHardHat',
          color: '#059669'
        }
      ];
      setBranches(mockBranches);
      setFilteredBranches(mockBranches);
    } catch (error) {
      console.error('Error fetching branches:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBranchSelect = (branch) => {
    navigate('/years', { state: { college, branch } });
  };

  const getBranchIcon = (iconName) => {
    const iconMap = {
      FaCode: FaCode,
      FaLaptop: FaLaptop,
      SiAltiumdesigner: SiAltiumdesigner,
      FaMicrochip: FaMicrochip,
      FaBolt: FaBolt,
      FaCogs: FaCogs,
      FaHardHat: FaHardHat
    };
    return iconMap[iconName] || FaCode;
  };

  if (loading) {
    return (
      <div className="page-container">
        <Header />
        <div className="loading-container">
          <div className="loading-spinner large">
            <div className="spinner"></div>
          </div>
          <p>Loading branches...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <Header />
      
      <div className="page-content">
        <div className="page-header">
          <h1>Select Your Branch</h1>
          <p>Choose your engineering branch at {college?.name || 'your college'}</p>
        </div>

        <div className="search-container">
          <div className="search-box">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search branches..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
        </div>

        <BranchGrid 
          branches={filteredBranches}
          onBranchSelect={handleBranchSelect}
          getBranchIcon={getBranchIcon}
        />

        {filteredBranches.length === 0 && (
          <div className="empty-state">
            <FaCode className="empty-icon" />
            <h3>No branches found</h3>
            <p>Try adjusting your search terms</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BranchSelection;