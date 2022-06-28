const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { productService } = require('../services');

const getAllProducts = catchAsync(async (req, res) => {
  const { products, countPr } = await productService.getAllProducts(req.query);
  res.send({ products, countPr });
});

const createProduct = catchAsync(async (req, res) => {
  const product = await productService.createProduct(req.body, req.file.filename);
  res.status(httpStatus.CREATED).send(product);
});

const getProductById = catchAsync(async (req, res) => {
  const product = await productService.getProductById(req.params.id);
  res.send(product);
});

const editProductById = catchAsync(async (req, res) => {
  const productUpdate = await productService.editProductById(
    req.body,
    req.files['slider'],
    req.params.id,
    req.files['thumbnail']?.[0].filename
  );
  res.send(productUpdate);
});

const getProductSuggest = catchAsync(async (req, res) => {
  const listSuggest = await productService.getProductSuggest(req.params.idCategory);
  res.send(listSuggest);
});

// create controller delete product by id
const deleteProductById = catchAsync(async (req, res) => {
  const message = await productService.deleteProductById(req.params.id);
  res.send(message);
});
module.exports = {
  getAllProducts,
  createProduct,
  getProductById,
  editProductById,
  getProductSuggest,
  deleteProductById,
};
