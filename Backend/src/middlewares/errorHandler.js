const ResponseHandler = require('../utils/responseHandler');

const errorHandler = (err, req, res, next) => {
  console.error({
    message: err.message,
    stack: err.stack,
    url: req.originalUrl,
    method: req.method
  });

  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map(e => e.message);
    return ResponseHandler.error(res, 'Validation Error', 400, errors);
  }

  if (err.name === 'CastError') {
    return ResponseHandler.error(res, 'Invalid ID format', 400);
  }

  if (err.code === 11000) {
    const field = Object.keys(err.keyPattern)[0];
    return ResponseHandler.error(res, `${field} already exists`, 409);
  }

  if (err.name === 'JsonWebTokenError') {
    return ResponseHandler.error(res, 'Invalid token', 401);
  }

  if (err.name === 'TokenExpiredError') {
    return ResponseHandler.error(res, 'Token expired', 401);
  }

  const statusCode = err.statusCode || 500;
  const message = process.env.NODE_ENV === 'production' 
    ? 'Internal server error' 
    : err.message;

  return ResponseHandler.error(res, message, statusCode);
};

module.exports = errorHandler;
