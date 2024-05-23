const express = require('express');
const { userLogin, signupUser } = require('./controller');
const { signupValidationMiddleware } = require('./middlewares/dto.middleware');

const router = express.Router();

router.route('/signup').post(signupValidationMiddleware, signupUser);
router.route('/login').post(userLogin);

module.exports = router;
