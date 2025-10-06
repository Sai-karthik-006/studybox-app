const User = require('../models/User');
const asyncHandler = require('../utils/asyncHandler');
const { successResponse, errorResponse } = require('../utils/apiResponse');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Generate JWT
const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

// ----------------------
// Signup
// ----------------------
const signup = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password, gender, role, adminCode, phone } = req.body;

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return errorResponse(res, 'Email already registered', 400);
  }

  // If role is admin, validate adminCode
  if (role === 'admin') {
    if (adminCode !== process.env.ADMIN_CODE) {
      return errorResponse(res, 'Invalid admin code', 403);
    }
  }

  // Create user
  const user = await User.create({
    firstName,
    lastName,
    email,
    password,
    gender,
    role: role || 'student',
    phone: phone || ''
  });

  // Don't send password in response
  const userResponse = {
    _id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    role: user.role,
    gender: user.gender,
    phone: user.phone,
    createdAt: user.createdAt
  };

  const token = generateToken(user._id, user.role);
  successResponse(res, { user: userResponse, token }, 'User registered successfully', 201);
});

// ----------------------
// Login - SECURE VERSION
// ----------------------
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Generic error message to prevent user enumeration
  const genericError = 'Invalid credentials';

  const user = await User.findOne({ email });
  if (!user) {
    return errorResponse(res, genericError, 401);
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return errorResponse(res, genericError, 401);
  }

  const token = generateToken(user._id, user.role);
  
  // Don't send password back in response
  const userResponse = {
    _id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    role: user.role,
    gender: user.gender,
    phone: user.phone,
    createdAt: user.createdAt
  };

  successResponse(res, { user: userResponse, token }, 'Login successful');
});

// ----------------------
// Get Current User
// ----------------------
const getMe = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');
  
  if (!user) {
    return errorResponse(res, 'User not found', 404);
  }

  successResponse(res, { user }, 'User data retrieved successfully');
});

module.exports = {
  signup,
  login,
  getMe
};