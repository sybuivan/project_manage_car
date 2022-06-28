const { ProductType } = require('../models');
// const ApiError = require('../utils/ApiError');
/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<product>}
 */
const getProductType = async (id) => {
  const productType = await ProductType.find({ category: id });
  return productType;
};

const createProductType = async (typeBody) => {
  const productType = await ProductType.create(typeBody);
  return productType;
};

module.exports = {
  getProductType,
  createProductType,
};
