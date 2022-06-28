import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import queryString from 'query-string';
import './sidebar.scss';
import { categoryApi, productTypeApi } from '../../api';
import { Dropdown } from '..';
import { router, title } from '../../constants';
import { redirectSideBar } from '../../utils';
import { useGetQueryParams } from '../../hooks';

const Sidebar = () => {
  const [category, setCategory] = useState([]);
  const [productType, setProductType] = useState([]);

  const location = useLocation();
  const history = useHistory();

  // get query params location search
  const queryParams = useGetQueryParams(location.search);

  const handleOnClickCategory = (id) => {
    if (redirectSideBar(location.pathname) !== '') {
      location.pathname = redirectSideBar(location.pathname);
    }
    const newFilters = { ...queryParams, page: 1, idCategory: id };
    delete newFilters?.productType;
    delete newFilters?.search;
    history.push({
      pathname: location.pathname,
      search: queryString.stringify(newFilters),
    });
  };

  const handleOnClickProductType = (idType) => {
    if (redirectSideBar(location.pathname) !== '') {
      location.pathname = redirectSideBar(location.pathname);
    }

    const newFilters = { ...queryParams, page: 1, productType: idType };
    delete newFilters?.search;

    history.push({
      pathname: location.pathname,
      search: queryString.stringify(newFilters),
    });
  };
  useEffect(() => {
    (async () => {
      try {
        const categories = await categoryApi.getAllCategories();
        const productTypes = await productTypeApi.getAllProductType(queryParams?.idCategory);
        setCategory(categories);
        setProductType(productTypes);
      } catch (error) {
        history.push(router.NOT_FOUND);
      }
    })();
  }, [queryParams?.idCategory]);

  if (location.pathname === '/not-found') return <></>;

  return (
    <div className="sidebar">
      <div className="sidebar-container">
        <Dropdown
          title={title.DANH_MUC}
          option={category}
          activeCategory={queryParams.idCategory}
          onClickCategory={handleOnClickCategory}
        />
        <Dropdown
          title={title.HANG_SAN_XUAT}
          option={productType}
          activeProductType={queryParams?.productType}
          onClickProductType={handleOnClickProductType}
        />
      </div>
    </div>
  );
};

Sidebar.propTypes = {};
export default Sidebar;
