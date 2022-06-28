const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createCategory = {
  body: Joi.object().keys({
    name: Joi.string().required(),
  }),
};

const getIdCategory = {
  params: Joi.object().keys({
    idCategory: Joi.string().custom(objectId),
  }),
};
module.exports = {
  createCategory,
  getIdCategory,
};
