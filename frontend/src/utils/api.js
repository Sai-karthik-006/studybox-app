import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('studybox_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor for better error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('studybox_token');
      localStorage.removeItem('studybox_user');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

// Auth APIs
export const adminLogin = (email, password) => 
  api.post('/auth/login', { email, password });

export const studentLogin = (email, password) => 
  api.post('/auth/login', { email, password });

export const studentRegister = (userData) => 
  api.post('/auth/signup', { ...userData, role: 'student' });

// User Management APIs
export const getUsers = () => 
  api.get('/admin/users');

export const updateUserRole = (userId, role) => 
  api.put(`/admin/users/${userId}/role`, { role });

export const deleteUser = (userId) => 
  api.delete(`/admin/users/${userId}`);

// College Management APIs
export const getColleges = () => 
  api.get('/admin/colleges');

export const getCollegeById = (id) => 
  api.get(`/admin/colleges/${id}`);

export const createCollege = (collegeData) => 
  api.post('/admin/colleges', collegeData);

export const updateCollege = (id, collegeData) => 
  api.put(`/admin/colleges/${id}`, collegeData);

export const deleteCollege = (id) => 
  api.delete(`/admin/colleges/${id}`);

export const addBranchToCollege = (collegeId, branchId) => 
  api.post(`/admin/colleges/${collegeId}/branches/${branchId}`);

export const removeBranchFromCollege = (collegeId, branchId) => 
  api.delete(`/admin/colleges/${collegeId}/branches/${branchId}`);
// Branch Management APIs
export const addBranch = (branchData) => 
  api.post('/admin/branch', branchData);

export const updateBranch = (branchId, branchData) => 
  api.put(`/admin/branch/${branchId}`, branchData);

export const deleteBranch = (branchId) => 
  api.delete(`/admin/branch/${branchId}`);

export const getBranches = () => 
  api.get('/admin/branches'); // New endpoint to get all branches

// Subject APIs
export const getSubjectsBySemester = (semesterId) => 
  api.get(`/admin/semester/${semesterId}/subjects`);

export const addSubject = (semesterId, subjectData) => 
  api.post(`/admin/semester/${semesterId}/subject`, subjectData);

// Enhanced Resource APIs
export const addResourceWithHierarchy = (subjectId, resourceData) => 
  api.post(`/admin/subject/${subjectId}/resource`, resourceData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });

// Resource Management APIs
export const addResource = (resourceData) => 
  api.post('/admin/resource', resourceData);

// Dashboard APIs
export const getDashboardStats = () => 
  api.get('/admin/dashboard/stats');

// Student APIs (updated with collegeId)
export const getStudentColleges = () => 
  api.get('/student/colleges');

export const getStudentBranches = (collegeId) => 
  api.get(`/student/colleges/${collegeId}/branches`);

export const getStudentYears = (collegeId, branchId) => 
  api.get(`/student/colleges/${collegeId}/branches/${branchId}/years`);
  
export default api;