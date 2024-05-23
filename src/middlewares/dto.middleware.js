const Joi = require('joi');
const AppError = require('../utils/appError');

const createSchema = Joi.object({
    first_name: Joi.string().min(3).max(20).required(),
    last_name: Joi.string().min(3).max(20).required(),
    email: Joi.string().email().required(),
    phone: Joi.string().min(11).max(13).required(),
    birthday: Joi.date().required(),
    password: Joi.string().min(4).max(15).required(),
});

const updateSchema = createSchema.keys({
    id: Joi.number().required(),
});

exports.signupValidationMiddleware = (req, res, next) => {
    const result = createSchema.validate(req.body);
    if (result?.error) throw new AppError(400, result.error.details[0].message.replace(/"/gi, ''));
    return next();
};

exports.updateValidationMiddleware = (req, res, next) => {
    const result = updateSchema.validate(req.body);
    if (result?.error) throw new AppError(400, result.error.details[0].message.replace(/"/gi, ''));
    return next();
};
