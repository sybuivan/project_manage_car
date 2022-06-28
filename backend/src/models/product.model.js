const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'category',
    required: true,
  },
  typeProduct: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'productType',
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  slider: [
    {
      position: {
        type: Number,
      },
      thumbnailSlide: {
        type: String,
      },
    },
  ],
  createdAt: {
    type: Date,
  },
});

const Product = mongoose.model('product', productSchema);

module.exports = Product;
