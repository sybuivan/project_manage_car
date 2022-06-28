const { Category } = require('../models');
// const ApiError = require('../utils/ApiError');
/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<product>}
 */
const getCategories = async () => {
  return Category.find();
};

const createCategory = async (productBody) => {
  const product = await Category.create(productBody);
  return product;
};

module.exports = {
  getCategories,
  createCategory,
};
