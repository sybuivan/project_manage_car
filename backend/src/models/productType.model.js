const mongoose = require('mongoose');

const productTypeSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'category',
    required: true,
  },
});

const ProductType = mongoose.model('productType', productTypeSchema);

module.exports = ProductType;
