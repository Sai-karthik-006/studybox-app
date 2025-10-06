const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const studentRoutes = require('./routes/student');
const errorHandler = require('./middlewares/errorHandler');

// Import models so Mongoose knows about them
require('./models/Branch');
require('./models/Semester');
require('./models/Subject');
require('./models/Unit');
require('./models/Topic');
require('./models/Resource'); // already used in controller


const app = express();

// ----------------------
// Middlewares
// ----------------------
app.use(cors());
app.use(express.json()); // Parse JSON bodies
app.use(morgan('dev')); // Logging HTTP requests

// ----------------------
// Routes
// ----------------------
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/student', studentRoutes);

// ----------------------
// Default Route
// ----------------------
app.get('/', (req, res) => {
  res.send('Welcome to StudyBox API');
});

// ----------------------
// Error Handler (Global)
// ----------------------
app.use(errorHandler);

module.exports = app;
