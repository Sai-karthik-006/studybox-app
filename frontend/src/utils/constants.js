// API Endpoints
export const API_BASE_URL = 'http://localhost:5000/api';

// User Roles
export const USER_ROLES = {
  ADMIN: 'admin',
  STUDENT: 'student'
};

// College Data
export const COLLEGES = [
  {
    id: '1',
    name: 'ANITS',
    fullName: 'Anil Neerukonda Institute of Technology & Sciences',
    code: 'ANITS',
    location: 'Visakhapatnam',
    established: '2001'
  },
  {
    id: '2',
    name: 'Andhra University',
    fullName: 'Andhra University College of Engineering',
    code: 'AU',
    location: 'Visakhapatnam',
    established: '1926'
  },
  {
    id: '3',
    name: 'Gayatri Vidya Parishad',
    fullName: 'Gayatri Vidya Parishad College of Engineering',
    code: 'GVP',
    location: 'Visakhapatnam',
    established: '1996'
  },
  {
    id: '4',
    name: 'RVR & JC College',
    fullName: 'RVR & JC College of Engineering',
    code: 'RVRJC',
    location: 'Guntur',
    established: '1985'
  }
];

// Engineering Branches
export const BRANCHES = [
  {
    id: '1',
    name: 'CSE',
    fullName: 'Computer Science & Engineering',
    icon: 'FaCode',
    color: '#4F46E5'
  },
  {
    id: '2',
    name: 'CSM',
    fullName: 'Computer Science & Engineering (AI & ML)',
    icon: 'CgScreen',
    color: '#10B981'
  },
  {
    id: '3',
    name: 'CSD',
    fullName: 'Computer Science & Design',
    icon: 'SiAltiumdesigner',
    color: '#F59E0B'
  },
  {
    id: '4',
    name: 'IT',
    fullName: 'Information Technology',
    icon: 'FaMicrochip',
    color: '#EF4444'
  },
  {
    id: '5',
    name: 'ECE',
    fullName: 'Electronics & Communication Engineering',
    icon: 'FaBolt',
    color: '#8B5CF6'
  },
  {
    id: '6',
    name: 'EEE',
    fullName: 'Electrical & Electronics Engineering',
    icon: 'FaCogs',
    color: '#06B6D4'
  },
  {
    id: '7',
    name: 'MECH',
    fullName: 'Mechanical Engineering',
    icon: 'FaHardHat',
    color: '#DC2626'
  },
  {
    id: '8',
    name: 'CIVIL',
    fullName: 'Civil Engineering',
    icon: 'FaHardHat',
    color: '#059669'
  }
];

// Academic Years
export const ACADEMIC_YEARS = [
  { id: '1', name: '1st Year', description: 'First Year Engineering' },
  { id: '2', name: '2nd Year', description: 'Second Year Engineering' },
  { id: '3', name: '3rd Year', description: 'Third Year Engineering' },
  { id: '4', name: '4th Year', description: 'Final Year Engineering' }
];

// Difficulty Levels
export const DIFFICULTY_LEVELS = {
  EASY: 'easy',
  MEDIUM: 'medium',
  HARD: 'hard'
};

// Resource Types
export const RESOURCE_TYPES = {
  PDF: 'pdf',
  VIDEO: 'video',
  LINK: 'link'
};

// Status Types
export const STATUS_TYPES = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected'
};

// File Upload Limits
export const UPLOAD_LIMITS = {
  MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
  ALLOWED_FILE_TYPES: ['.pdf', '.doc', '.docx', '.ppt', '.pptx'],
  MAX_FILES: 5
};

// Local Storage Keys
export const STORAGE_KEYS = {
  TOKEN: 'studybox_token',
  USER: 'studybox_user',
  THEME: 'studybox_theme'
};

// Theme Colors
export const THEME_COLORS = {
  PRIMARY: '#667eea',
  SECONDARY: '#764ba2',
  SUCCESS: '#10B981',
  WARNING: '#F59E0B',
  ERROR: '#EF4444',
  INFO: '#3B82F6'
};

// Breakpoints for responsive design
export const BREAKPOINTS = {
  MOBILE: '768px',
  TABLET: '1024px',
  DESKTOP: '1200px'
};