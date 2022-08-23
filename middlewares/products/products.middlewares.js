const Joi = require('joi');
const statusError = require('../../utils/error.utils');

const schema = Joi.object({
  name: Joi.string().min(5).required(),
});

const validateProduct = (req, _res, next) => {
  const { error, value } = schema.validate(req.body);
  console.log(value);
  if (error) {
    if (error.message.includes('required')) next(statusError(400, error.message));
    next(statusError(422, error.message));
  }
  next();
};

module.exports = { validateProduct };
