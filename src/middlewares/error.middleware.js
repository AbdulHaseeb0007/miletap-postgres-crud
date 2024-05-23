const AppError = require('../utils/appError');

const errorMiddleware = (err, req, res, next) => {
    console.log(err);

    if (err instanceof AppError)
        return res.status(err.statusCode).json({
            success: false,
            code: [err.statusCode],
            payload: [],
            message: err.error,
        });

    return res.status(500).json({
        success: false,
        code: [500],
        payload: [],
        message: 'something went wrong. internal server error.',
    });
};

module.exports = errorMiddleware;
