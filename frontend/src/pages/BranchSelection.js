import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../components/Common/Header';
import BranchGrid from '../components/Branch/BranchGrid';
import { getBranches } from '../utils/api';
import { FaSearch, FaCode, FaMicrochip, FaBolt, FaCogs, FaHardHat, FaLaptop, FaRobot } from 'react-icons/fa';
import { SiAltiumdesigner } from 'react-icons/si';

const BranchSelection = () => {
  const [branches, setBranches] = useState([]);
  const [filteredBranches, setFilteredBranches] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const { college } = location.state || {};

  useEffect(() => {
    if (college) {
      fetchBranches();
    }
  }, [college]);

  useEffect(() => {
    const filtered = branches.filter(branch =>
      branch.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      branch.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      branch.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredBranches(filtered);
  }, [searchTerm, branches]);

  const fetchBranches = async () => {
  setLoading(true);
  try {
    // Use actual student API call with collegeId
    const response = await getStudentBranches(college._id);
    if (response.data && response.data.success) {
      setBranches(response.data.data);
      setFilteredBranches(response.data.data);
    } else {
      console.error('Failed to fetch branches');
      setBranches([]);
    }
  } catch (error) {
    console.error('Error fetching branches:', error);
    setBranches([]);
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
      FaRobot: FaRobot,
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
              placeholder="Search branches by name or description..."
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

        {filteredBranches.length === 0 && !loading && (
          <div className="empty-state">
            <FaCode className="empty-icon" />
            <h3>No branches found</h3>
            <p>Branches will be added by administrators for {college?.name}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BranchSelection;