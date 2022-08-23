const Joi = require('joi');
const productsModel = require('../../models/products.models');
const statusError = require('../../utils/error.utils');

const schema = Joi.array().items(Joi.object({
  productId: Joi.number().required(),
  quantity: Joi.number().min(1).positive().required(),
}));

const validateSales = (req, _res, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
    if (error.message.includes('required')) {
      next(statusError(400, error.message.replace(/\[[0-9]*\]\./, '')));
    }
    next(statusError(422, error.message.replace(/\[[0-9]*\]\./, '')));
  }
  next();
};

const validateProductsId = async (req, _res, next) => {
  const data = await productsModel.getAll();
  const id = data.map((item) => item.id);
  const notExists = req.body.some((thing) => !id.includes(thing.productId));
  if (notExists) {
    next(statusError(404, 'Product not found'));
  }
  next();
};

module.exports = {
  validateSales,
  validateProductsId,

};