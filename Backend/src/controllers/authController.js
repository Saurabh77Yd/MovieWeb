const jwt = require('jsonwebtoken');
const User = require('../models/User');
const ResponseHandler = require('../utils/responseHandler');

class AuthController {
  static async register(req, res, next) {
    try {
      const { username, email, password, role } = req.body;

      const user = await User.create({ username, email, password, role });
      const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRE || '7d' }
      );

      ResponseHandler.success(res, { 
        user: { 
          id: user._id, 
          username: user.username, 
          email: user.email, 
          role: user.role 
        }, 
        token 
      }, 'User registered successfully', 201);
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email }).select('+password');
      if (!user || !(await user.comparePassword(password))) {
        return ResponseHandler.error(res, 'Invalid credentials', 401);
      }

      const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRE || '7d' }
      );

      ResponseHandler.success(res, { 
        user: { 
          id: user._id, 
          username: user.username, 
          email: user.email, 
          role: user.role 
        }, 
        token
      }, 'Login successful');
    } catch (error) {
      next(error);
    }
  }
}

module.exports = AuthController;