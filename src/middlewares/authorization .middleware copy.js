const AppError = require('../utils/appError');

const checkAuthorization = (req, res, next) => {
    try {
        if (req.user.user_type != 'admin') throw new AppError(401, 'only admin can access this resource.');
        return next();
    } catch (error) {
        return res.status(401).json({ success: false, statusCode: error.statusCode, message: error.error, data: null });
    }
};

module.exports = checkAuthorization;
