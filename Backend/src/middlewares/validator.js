const ResponseHandler = require('../utils/responseHandler');

const validateMovie = (req, res, next) => {
  const { name, description, rating, releaseDate, duration } = req.body;
  const errors = [];

  if (!name || name.trim().length < 1) {
    errors.push({ field: 'name', message: 'Name is required' });
  }
  if (!description || description.trim().length < 10) {
    errors.push({ field: 'description', message: 'Description must be at least 10 characters' });
  }
  if (rating === undefined || rating < 0 || rating > 10) {
    errors.push({ field: 'rating', message: 'Rating must be between 0 and 10' });
  }
  if (!releaseDate || isNaN(Date.parse(releaseDate))) {
    errors.push({ field: 'releaseDate', message: 'Valid release date is required' });
  }
  if (!duration || duration < 1) {
    errors.push({ field: 'duration', message: 'Duration must be at least 1 minute' });
  }

  if (errors.length > 0) {
    return ResponseHandler.error(res, 'Validation failed', 400, errors);
  }

  next();
};

const validateUser = (req, res, next) => {
  const { username, email, password } = req.body;
  const errors = [];

  if (!username || username.trim().length < 3) {
    errors.push({ field: 'username', message: 'Username must be at least 3 characters' });
  }
  if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
    errors.push({ field: 'email', message: 'Valid email is required' });
  }
  if (!password || password.length < 6) {
    errors.push({ field: 'password', message: 'Password must be at least 6 characters' });
  }

  if (errors.length > 0) {
    return ResponseHandler.error(res, 'Validation failed', 400, errors);
  }

  next();
};

const validateLogin = (req, res, next) => {
  const { email, password } = req.body;
  const errors = [];

  if (!email) {
    errors.push({ field: 'email', message: 'Email is required' });
  }
  if (!password) {
    errors.push({ field: 'password', message: 'Password is required' });
  }

  if (errors.length > 0) {
    return ResponseHandler.error(res, 'Validation failed', 400, errors);
  }

  next();
};

module.exports = { validateMovie, validateUser, validateLogin };