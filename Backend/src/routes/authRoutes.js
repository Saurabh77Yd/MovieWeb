const express = require('express');
const AuthController = require('../controllers/authController');
const { validateUser, validateLogin } = require('../middlewares/validator');

const router = express.Router();

router.post('/register', validateUser, AuthController.register);
router.post('/login', validateLogin, AuthController.login);

module.exports = router;