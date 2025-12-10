const jwt = require('jsonwebtoken');
const User = require('../models/User');
const ResponseHandler = require('../utils/responseHandler');

const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return ResponseHandler.error(res, 'No token provided', 401);
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');

    if (!user) {
      return ResponseHandler.error(res, 'User not found', 401);
    }

    req.user = user;
    next();
  } catch (error) {
    return ResponseHandler.error(res, 'Invalid or expired token', 401);
  }
};

module.exports = authenticate;
