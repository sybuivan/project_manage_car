/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from 'react';
import { categoryApi, productTypeApi } from '../api';
import { OverLayContext } from '../context';
import { renameKeys } from '../utils';

// Use show loading when call api
export default function useSelector() {
  const [stateOption, setStateOption] = useState({
    categories: [],
    productType: [],
    selectCategory: "",
    selectProductType: '',
  });

  useEffect(() => {
    (async () => {
      const dataCategory = await categoryApi.getAllCategories();
      const newKeys = { _id: 'value', name: 'label' };

      const newArrayCategory = dataCategory?.map((data) => renameKeys(data, newKeys));

      setStateOption((pre) => ({
        ...pre,
        categories: newArrayCategory,
      }));
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const dataProductType = await
      productTypeApi.getAllProductType(stateOption.selectCategory?.value);
      const newKeys = { _id: 'value', name: 'label' };

      const newProductType = dataProductType?.map((data) => renameKeys(data, newKeys));

      setStateOption((pre) => ({
        ...pre,
        productType: newProductType,
      }));
    })();
  }, [stateOption.selectCategory?.value]);

  const onCategorySelect = (values) => {
    setStateOption((pre) => ({
      ...pre,
      selectCategory: values,
      selectProductType: '',
    }));
  };

  const onProductTypeSelect = (values) => {
    setStateOption((pre) => ({
      ...pre,
      selectProductType: values,
    }));
  };

  return {
    stateOption,
    onCategorySelect,
    onProductTypeSelect,
  };
}
