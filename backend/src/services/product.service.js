const mongoose = require('mongoose');
const { message } = require('../constants');
const { Product } = require('../models');
// const ApiError = require('../utils/ApiError');
/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<product>}
 */
const getProductById = async (id) => {
  try {
    const productById = await Product.findById(id)
      .populate({
        path: 'category',
      })
      .populate({
        path: 'typeProduct',
      });
    // eslint-disable-next-line no-extra-boolean-cast
    if (!productById) {
      throw new ApiError(400, message.message.EMPTY_PRODUCT);
    } else {
      return productById;
    }
  } catch (error) {
    console.log('error');
    throw new ApiError(400, message.message.EMPTY_PRODUCT);
  }
};

const getAllProducts = async (query) => {
  const { search, idCategory, productType, start, limit } = query;
  let size = [];
  let countPr = 0;
  let querySearch = {};
  const rgx = (pattern) => new RegExp(`${pattern}`);
  const searchRgx = rgx(search);
  if (!idCategory && !productType) {
    querySearch = {};
  } else if (idCategory && !productType) {
    querySearch = {
      category: mongoose.Types.ObjectId(idCategory),
    };
  } else if (productType && !idCategory) {
    querySearch = {
      typeProduct: mongoose.Types.ObjectId(productType),
    };
  } else {
    querySearch = {
      category: mongoose.Types.ObjectId(idCategory),
      typeProduct: mongoose.Types.ObjectId(productType),
    };
  }

  if (search) {
    querySearch = {
      ...querySearch,
      name: { $regex: searchRgx, $options: 'i' },
    };
  }

  size = await Product.find(querySearch);
  countPr = size.length;

  const products = await Product.find(querySearch).skip(Number(start)).limit(Number(limit));
  return { products, countPr };
};

const createProduct = async (body, file) => {
  const objectValue = { ...body, thumbnail: file };
  const product = await Product.create(objectValue);
  return product;
};

// edit product form
const editProductById = async (body, files, id, thumbnailFile) => {
  const product = await getProductById(id);
  const sizeSlider = product.slider?.length;
  const newSlider = product.slider;
  const newValues = { ...body };
  if (sizeSlider === 0 && files) {
    Array(...newValues?.position)?.forEach((element, index) => {
      newSlider.push({
        position: body.position[index],
        thumbnailSlide: files[index].filename,
      });
    });

    if (!!newValues.noposition) {
      Array(...newValues?.noposition)?.forEach((element, index) => {
        newSlider.push({
          position: body.noposition[index],
          thumbnailSlide: '',
        });
      });
    }
    // sort by asc position
    newSlider.sort((a, b) => Number(a.position) - Number(b.position));
    newValues.slider = newSlider;
  }

  if (newValues?.position && sizeSlider > 0 && files) {
    Array(...newValues?.position)?.forEach((element, index) => {
      const indexSlide = newSlider.findIndex((slide) => slide.position === Number(element));
      newSlider[indexSlide] = { position: Number(element), thumbnailSlide: files[index].filename };
    });
    newValues.slider = newSlider;
  }

  if (body?.noposition && sizeSlider > 0) {
    Array(...body?.noposition)?.forEach((element, index) => {
      const indexSlide = newSlider.findIndex((slide) => slide.position === Number(element));
      if (indexSlide >= 0 && newSlider[indexSlide].thumbnailSlide) {
        newSlider[indexSlide] = { position: Number(element), thumbnailSlide: '' };
      }
    });
  }

  if (thumbnailFile) {
    newValues.thumbnail = thumbnailFile;
  }
  Object.assign(product, newValues);

  const productUpdate = Product.findByIdAndUpdate(id, product, { new: true, useFindAndModify: false });
  return productUpdate;
};

const getProductSuggest = async (idCategory) => {
  const listSuggest = await Product.find({ category: mongoose.Types.ObjectId(idCategory) }).limit(3);
  return listSuggest;
};

// create service delete product by id
const deleteProductById = async (id) => {
  if (id) {
    await Product.deleteOne({ _id: id });
    return {
      msg: message.message.DELETE_SUCCESS,
      status: true,
    };
  }
};

module.exports = {
  getProductById,
  getAllProducts,
  createProduct,
  editProductById,
  getProductSuggest,
  deleteProductById,
};
