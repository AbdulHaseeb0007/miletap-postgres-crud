const Joi = require("joi");
const AppError = require("../utils/appError");

const createSchema = Joi.object({
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.number().min(11).max(11).required(),
  birthday: Joi.date().required(),
});

const updateSchema = createSchema.keys({
  id: Joi.number().required(),
});

exports.signupValidationMiddleware = (req, res, next) => {
  const result = createSchema.validate(req.body);
  if (result?.error)
    throw new AppError(400, result.error.details[0].message.replace(/"/gi, ""));
  return next();
};

exports.updateValidationMiddleware = (req, res, next) => {
  const result = updateSchema.validate(req.body);
  if (result?.error)
    throw new AppError(400, result.error.details[0].message.replace(/"/gi, ""));
  return next();
};
