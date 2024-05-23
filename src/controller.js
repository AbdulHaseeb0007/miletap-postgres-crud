const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const AppError = require('./utils/appError');
const ApiResponse = require('./utils/apiResponse');
const { loginUser, createUser, getUsers, deleteUser, updateUser } = require('./repo');

exports.userLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) throw new AppError(400, 'invalid credentials.');

        const user = await loginUser(req.body.email);

        if (!user[0]) throw new AppError(400, 'invalid credentials.');

        const passwordMatched = await bcrypt.compare(password, user[0].password);
        if (!passwordMatched) throw new AppError(401, 'invalid credentials.');

        BigInt.prototype.toJSON = function () {
            return this.toString();
        };

        const token = jwt.sign({ id: user[0].id, email: user[0].email, user_type: user[0].user_type }, process.env.JWT_SECRET);

        delete user[0].password;

        return ApiResponse(res, 201, { ...user[0], token }, 'login successfully.');
    } catch (error) {
        return next(error);
    }
};

exports.createNewUser = async (req, res, next) => {
    try {
        req.body.type = 'user';
        await createUser(req.body);
        return ApiResponse(res, 201, [], 'user created successfully.');
    } catch (error) {
        return next(error);
    }
};

exports.updateUser = async (req, res, next) => {
    try {
        const data = req.body;
        const id = req.body.id;

        delete data.id;

        await updateUser(data, id);

        return ApiResponse(res, 200, { ...data, id }, 'user updated successfully.');
    } catch (error) {
        return next(error);
    }
};

exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await getUsers(req.body);

        BigInt.prototype.toJSON = function () {
            return this.toString();
        };

        return ApiResponse(res, 200, users, 'list of all users.');
    } catch (error) {
        return next(error);
    }
};

exports.deleteUser = async (req, res, next) => {
    try {
        if (!req.params.id || isNaN(req.params.id)) throw new AppError(400, 'please provide valid user id.');
        await deleteUser(req.params.id);
        return ApiResponse(res, 200, [], 'user deleted successfully.');
    } catch (error) {
        return next(error);
    }
};
