const express = require('express');
const { categoryController } = require('../../controllers');
const validate = require('../../middlewares/validate');
const { categoryValidation } = require('../../validations');

const router = express.Router();

router.route('/').get(categoryController.getAllNameCategories);
router.post('/', validate(categoryValidation.createCategory), categoryController.createCategory);

module.exports = router;
