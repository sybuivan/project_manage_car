import axiosInstance from './axios';

const productApi = {
  async getAllProduct(params) {
    const newParams = { ...params };

    newParams.start = params.page <= 1 ? 0 : (params.page - 1) * params.limit || 50;

    // delete _page
    delete newParams.page;

    const response = await axiosInstance.get('/product', {
      params: newParams,
    });

    const { products, countPr } = response;

    return {
      data: products,
      count: countPr,
    };
  },

  async addProduct(formdata) {
    const dataProduct = await axiosInstance.post('/product/add', formdata, {
      headers: { "content-type": "multipart/form-data" },
    });
    return dataProduct;
  },

  async getProductById(id) {
    const product = await axiosInstance.get(`/product/detail-product/${id}`);
    return product;
  },

  async getProductSuggest(idCategory) {
    const listSuggest = await axiosInstance.get(`/product/product-suggest/${idCategory}`);
    return listSuggest;
  },

  async editProductById(id, formData) {
    await axiosInstance.put(`/product/edit-product/${id}`, formData, {
      headers: { "content-type": "multipart/form-data" },
    });
  },

  async deleteProductById(id) {
    const { status } = await axiosInstance.delete(`product/delete/${id}`);
    return status;
  },
};

export default productApi;
