const express = require('express');
const { userLogin, createNewUser, getAllUsers, deleteUser, updateUser } = require('./controller');
const { signupValidationMiddleware, updateValidationMiddleware } = require('./middlewares/dto.middleware');
const checkAuthentication = require('./middlewares/authentication .middleware');
const checkAuthorization = require('./middlewares/authorization .middleware copy');

const router = express.Router();

router.route('/login').post(userLogin);
router.route('/get-all-users').get(checkAuthentication, checkAuthorization, getAllUsers);
router.route('/create-user').post(checkAuthentication, checkAuthorization, signupValidationMiddleware, createNewUser);
router.route('/update-user').post(checkAuthentication, checkAuthorization, updateValidationMiddleware, updateUser);
router.route('/delete-user/:id').delete(checkAuthentication, checkAuthorization, deleteUser);

module.exports = router;
