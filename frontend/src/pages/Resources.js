import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Common/Header';
import ResourceCard from '../components/Resources/ResourceCard';
import { getResources } from '../utils/api';
import { FaBook, FaYoutube, FaFilePdf, FaSearch, FaFilter } from 'react-icons/fa';

const Resources = () => {
  const [resources, setResources] = useState([]);
  const [filteredResources, setFilteredResources] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const { college, branch, year, semester, subject } = location.state || {};

  useEffect(() => {
    fetchResources();
  }, []);

  useEffect(() => {
    let filtered = resources;
    
    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(resource =>
        resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    // Type filter
    if (filter !== 'all') {
      filtered = filtered.filter(resource => {
        if (filter === 'pdf' && resource.pdfs.length > 0) return true;
        if (filter === 'video' && resource.youtubeLinks.length > 0) return true;
        return false;
      });
    }
    
    setFilteredResources(filtered);
  }, [searchTerm, filter, resources]);

  const fetchResources = async () => {
    try {
      // Mock data - replace with actual API call
      const mockResources = [
        {
          _id: '1',
          title: 'Data Structures Complete Guide',
          summary: 'Comprehensive guide covering all data structures with examples',
          difficulty: 'medium',
          tags: ['algorithms', 'programming', 'java'],
          pdfs: [
            { url: '/pdfs/ds-guide.pdf', filename: 'Data_Structures_Guide.pdf' }
          ],
          youtubeLinks: [
            { url: 'https://youtube.com/embed/ABC123', rank: 1 },
            { url: 'https://youtube.com/embed/DEF456', rank: 2 }
          ],
          rating: 4.5,
          likes: 23,
          views: 156,
          addedBy: { firstName: 'Dr.', lastName: 'Smith' }
        },
        {
          _id: '2',
          title: 'Database Design Principles',
          summary: 'Fundamental concepts of database design and normalization',
          difficulty: 'easy',
          tags: ['sql', 'database', 'design'],
          pdfs: [
            { url: '/pdfs/db-design.pdf', filename: 'Database_Design.pdf' },
            { url: '/pdfs/sql-basics.pdf', filename: 'SQL_Basics.pdf' }
          ],
          youtubeLinks: [
            { url: 'https://youtube.com/embed/GHI789', rank: 1 }
          ],
          rating: 4.2,
          likes: 15,
          views: 89,
          addedBy: { firstName: 'Prof.', lastName: 'Johnson' }
        },
        {
          _id: '3',
          title: 'Advanced Algorithm Analysis',
          summary: 'Complex algorithm analysis and optimization techniques',
          difficulty: 'hard',
          tags: ['algorithms', 'complexity', 'optimization'],
          pdfs: [
            { url: '/pdfs/advanced-algo.pdf', filename: 'Advanced_Algorithms.pdf' }
          ],
          youtubeLinks: [],
          rating: 4.8,
          likes: 31,
          views: 203,
          addedBy: { firstName: 'Dr.', lastName: 'Williams' }
        }
      ];
      setResources(mockResources);
      setFilteredResources(mockResources);
    } catch (error) {
      console.error('Error fetching resources:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="page-container">
        <Header />
        <div className="loading-container">
          <FaBook className="loading-icon" />
          <p>Loading resources...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <Header />
      
      <div className="page-content">
        <div className="page-header">
          <h1>Study Resources</h1>
          <p>
            {subject?.name} - {semester?.name} • {branch?.name} • {college?.name}
          </p>
        </div>

        <div className="resources-controls">
          <div className="search-box">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search resources..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          
          <div className="filter-dropdown">
            <FaFilter className="filter-icon" />
            <select value={filter} onChange={(e) => setFilter(e.target.value)}>
              <option value="all">All Resources</option>
              <option value="pdf">PDFs Only</option>
              <option value="video">Videos Only</option>
            </select>
          </div>
        </div>

        <div className="resources-stats">
          <div className="stat-card">
            <FaBook className="stat-icon" />
            <div className="stat-info">
              <span className="stat-number">{filteredResources.length}</span>
              <span className="stat-label">Resources</span>
            </div>
          </div>
          
          <div className="stat-card">
            <FaFilePdf className="stat-icon" />
            <div className="stat-info">
              <span className="stat-number">
                {resources.reduce((acc, res) => acc + res.pdfs.length, 0)}
              </span>
              <span className="stat-label">PDFs</span>
            </div>
          </div>
          
          <div className="stat-card">
            <FaYoutube className="stat-icon" />
            <div className="stat-info">
              <span className="stat-number">
                {resources.reduce((acc, res) => acc + res.youtubeLinks.length, 0)}
              </span>
              <span className="stat-label">Videos</span>
            </div>
          </div>
        </div>

        <div className="resources-grid">
          {filteredResources.map(resource => (
            <ResourceCard key={resource._id} resource={resource} />
          ))}
        </div>

        {filteredResources.length === 0 && (
          <div className="empty-state">
            <FaBook className="empty-icon" />
            <h3>No resources found</h3>
            <p>Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Resources;