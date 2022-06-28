const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { productTypeService } = require('../services');

const getAllNameProductType = catchAsync(async (req, res) => {
  const productTypes = await productTypeService.getProductType(req.params.id);
  res.send(productTypes);
});

const createProductType = catchAsync(async (req, res) => {
  const productTypes = await productTypeService.createProductType(req.body);
  res.status(httpStatus.CREATED).send(productTypes);
});

module.exports = {
  getAllNameProductType,
  createProductType,
};
