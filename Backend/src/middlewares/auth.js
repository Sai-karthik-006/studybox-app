const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { errorResponse } = require('../utils/apiResponse');

// ----------------------
// Protect routes (JWT verification)
// ----------------------
const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return errorResponse(res, 'Not authorized, token missing', 401);
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password');
    if (!req.user) return errorResponse(res, 'User not found', 404);

    next();
  } catch (err) {
    return errorResponse(res, 'Not authorized, token invalid', 401);
  }
};

// ----------------------
// Admin only middleware
// ----------------------
const adminOnly = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return errorResponse(res, 'Access denied, admin only', 403);
  }
  next();
};

// ----------------------
// Student only middleware
// ----------------------
const studentOnly = (req, res, next) => {
  if (req.user.role !== 'student') {
    return errorResponse(res, 'Access denied, student only', 403);
  }
  next();
};

module.exports = {
  protect,
  adminOnly,
  studentOnly,
};
