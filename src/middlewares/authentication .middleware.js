const AppError = require('../utils/appError');
const { verifyToken } = require('../utils/common');

const checkAuthentication = (req, res, next) => {
    try {
        const authorization = req.headers.authorization;
        if (!authorization) throw new AppError(401, 'authentication failed.');

        const token = authorization.replace('Bearer ', '');
        if (!token) throw new AppError(401, 'authentication failed.');

        const data = verifyToken(token);
        if (data == 'token expired') throw new AppError(401, 'authentication failed. token expired.');

        req.user = {};
        req.user.id = data.id;
        req.user.email = data.email;
        req.user.user_type = data.user_type;
        req.user.token = data.token;

        return next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({ success: false, statusCode: error.statusCode, message: error.error, data: null });
    }
};

module.exports = checkAuthentication;
