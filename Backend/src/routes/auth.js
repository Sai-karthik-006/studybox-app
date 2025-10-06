const express = require('express');
const router = express.Router();
const { signup, login } = require('../controllers/authController');

// ----------------------
// Public Routes
// ----------------------

// Student/Admin Signup
router.post('/signup', signup);

// Student/Admin Login
router.post('/login', login);

module.exports = router;
