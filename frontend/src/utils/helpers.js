// Format file size
export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

// Validate email
export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

// Validate phone number (Indian format)
export const validatePhone = (phone) => {
  const re = /^[6-9]\d{9}$/;
  return re.test(phone);
};

// Debounce function
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Get user initials
export const getUserInitials = (firstName, lastName) => {
  return `${firstName?.charAt(0) || ''}${lastName?.charAt(0) || ''}`.toUpperCase();
};

// Format date
export const formatDate = (dateString) => {
  const options = { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  };
  return new Date(dateString).toLocaleDateString('en-US', options);
};

// Get difficulty color
export const getDifficultyColor = (difficulty) => {
  const colors = {
    easy: '#10B981',
    medium: '#F59E0B',
    hard: '#EF4444'
  };
  return colors[difficulty] || '#6B7280';
};

// Get status color
export const getStatusColor = (status) => {
  const colors = {
    active: '#10B981',
    inactive: '#6B7280',
    pending: '#F59E0B',
    approved: '#10B981',
    rejected: '#EF4444'
  };
  return colors[status] || '#6B7280';
};

// Truncate text
export const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) return text;
  return text.substr(0, maxLength) + '...';
};

// Generate random ID
export const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// Check if user is admin
export const isAdmin = (user) => {
  return user?.role === 'admin';
};

// Check if user is student
export const isStudent = (user) => {
  return user?.role === 'student';
};

// Get YouTube video ID from URL
export const getYouTubeVideoId = (url) => {
  const match = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
  return match ? match[1] : null;
};

// Calculate average rating
export const calculateAverageRating = (ratings) => {
  if (!ratings || ratings.length === 0) return 0;
  const sum = ratings.reduce((acc, rating) => acc + rating, 0);
  return (sum / ratings.length).toFixed(1);
};

// Sort resources by various criteria
export const sortResources = (resources, criteria) => {
  const sorted = [...resources];
  
  switch (criteria) {
    case 'rating':
      return sorted.sort((a, b) => b.rating - a.rating);
    case 'views':
      return sorted.sort((a, b) => b.views - a.views);
    case 'likes':
      return sorted.sort((a, b) => b.likes - a.likes);
    case 'date':
      return sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    case 'title':
      return sorted.sort((a, b) => a.title.localeCompare(b.title));
    default:
      return sorted;
  }
};

// Filter resources by difficulty
export const filterByDifficulty = (resources, difficulty) => {
  if (difficulty === 'all') return resources;
  return resources.filter(resource => resource.difficulty === difficulty);
};

// Search resources
export const searchResources = (resources, query) => {
  if (!query) return resources;
  
  const lowerQuery = query.toLowerCase();
  return resources.filter(resource =>
    resource.title.toLowerCase().includes(lowerQuery) ||
    resource.summary.toLowerCase().includes(lowerQuery) ||
    resource.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
  );
};

// Validate file type
export const validateFileType = (file, allowedTypes) => {
  const fileExtension = '.' + file.name.split('.').pop().toLowerCase();
  return allowedTypes.includes(fileExtension);
};

// Validate file size
export const validateFileSize = (file, maxSize) => {
  return file.size <= maxSize;
};

// Create form data for file upload
export const createFormData = (data) => {
  const formData = new FormData();
  
  Object.keys(data).forEach(key => {
    if (Array.isArray(data[key])) {
      data[key].forEach(item => {
        if (item instanceof File) {
          formData.append(key, item);
        } else {
          formData.append(key, JSON.stringify(item));
        }
      });
    } else {
      formData.append(key, data[key]);
    }
  });
  
  return formData;
};