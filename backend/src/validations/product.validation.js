const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createProduct = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    price: Joi.number().required(),
    description: Joi.string(),
    thumbnail: Joi.any().allow(null, ''),
    typeProduct: Joi.string().required(),
    category: Joi.string().required(),
    createdAt: Joi.date(),
  }),
};

const getProductById = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createProduct,
  getProductById,
};
