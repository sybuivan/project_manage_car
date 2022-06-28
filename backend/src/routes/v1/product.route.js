const express = require('express');
const { productController } = require('../../controllers');
const upload = require('../../utils/uploadFile');
const validate = require('../../middlewares/validate');
const { productValidation, categoryValidation } = require('../../validations');

const router = express.Router();

router.route('/').get(productController.getAllProducts);

router
  .route('/add')
  .post(upload.single('thumbnail'), validate(productValidation.createProduct), productController.createProduct);

router.route('/detail-product/:id').get(validate(productValidation.getProductById), productController.getProductById);

router.put(
  '/edit-product/:id',
  upload.fields([
    { name: 'thumbnail', maxCount: 1 },
    { name: 'slider', maxCount: 4 },
  ]),
  productController.editProductById
);

router
  .route('/product-suggest/:idCategory')
  .get(validate(categoryValidation.getIdCategory), productController.getProductSuggest);

// delete product
router.route('/delete/:id').delete(validate(productValidation.getProductById), productController.deleteProductById);
module.exports = router;
