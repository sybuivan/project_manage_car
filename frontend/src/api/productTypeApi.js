import axiosInstance from './axios';

const productTypeApi = {
  getAllProductType(id) {
    if (!id) {
      return [];
    // eslint-disable-next-line no-else-return
    } else {
      return axiosInstance.get(`/product-type/${id}`);
    }
  },
};

export default productTypeApi;
