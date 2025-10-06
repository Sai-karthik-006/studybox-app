const { errorResponse } = require('../utils/apiResponse');

// Global error handler middleware
const errorHandler = (err, req, res, next) => {
  console.error(err.stack); // Log the error stack for debugging

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  // Send standardized error response
  errorResponse(res, message, statusCode, err.errors || null);
};

module.exports = errorHandler;
