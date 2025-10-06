// Load environment variables
require('dotenv').config();

const app = require('./src/app');
const connectDB = require('./src/config/db');

// PORT
const PORT = process.env.PORT || 5000;

// ----------------------
// Handle uncaught exceptions
// ----------------------
process.on('uncaughtException', (err) => {
  console.error('❌ Uncaught Exception:', err);
  process.exit(1); // Exit process
});

// ----------------------
// Connect to MongoDB and start server
// ----------------------
connectDB()
  .then(() => {
    console.log('✅ MongoDB connected successfully');

    app.listen(PORT, () => {
      console.log(
        `🚀 Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`
      );
    });
  })
  .catch((err) => {
    console.error('❌ Failed to connect to MongoDB:', err);
    process.exit(1); // Exit process if DB connection fails
  });

// ----------------------
// Handle unhandled promise rejections
// ----------------------
process.on('unhandledRejection', (err) => {
  console.error('❌ Unhandled Rejection:', err);
  process.exit(1);
});



