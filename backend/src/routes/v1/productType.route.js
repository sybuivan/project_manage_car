const express = require('express');
const { productTypeController } = require('../../controllers');

const router = express.Router();

router.route('/:id').get(productTypeController.getAllNameProductType);
router.post('/', productTypeController.createProductType);

module.exports = router;
