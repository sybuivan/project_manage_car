import axiosInstance from './axios';

const categoryApi = {
  getAllCategories() {
    return axiosInstance.get('/categories');
  },
};

export default categoryApi;
