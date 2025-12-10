const ResponseHandler = require('../utils/responseHandler');

const checkRole = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return ResponseHandler.error(res, 'Unauthorized', 401);
    }

    if (!roles.includes(req.user.role)) {
      return ResponseHandler.error(
        res, 
        'You do not have permission to perform this action', 
        403
      );
    }

    next();
  };
};

module.exports = checkRole;