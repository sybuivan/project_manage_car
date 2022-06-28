import PropTypes from 'prop-types';
import { LinearProgress, Pagination } from '@mui/material';
import Box from '@mui/material/Box';
import queryString from 'query-string';
// eslint-disable-next-line object-curly-newline
import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import './ProductListView.scss';
// eslint-disable-next-line object-curly-newline
import { Modal, ModalConfirm, ModalContent, Search } from '../../components';
// eslint-disable-next-line object-curly-newline
import { images, number, router, title } from '../../constants';
import { ProductList } from './component';
import { productApi } from '../../api';
import { useGetQueryParams, useLoading } from '../../hooks';

function ProductListView({ locationName, onClickModal }) {
  const [listDataProduct, setListDataProduct] = useState([]);
  const [showLoading, hideLoading] = useLoading();

  const [loading, setLoading] = useState(false);
  const [totalPage, setTotalPage] = useState(0);
  const [productDelete, setProductDelete] = useState('');
  const [isActiveModal, setIsActiveModal] = useState({
    isModal: false,
    isSuccess: false,
  });

  const location = useLocation();
  const history = useHistory();

  // get query params location search
  const queryParams = useGetQueryParams(location.search);

  // handle on change pagination
  const handleOnPageChange = (e, crPage) => {
    const newFilters = {
      ...queryParams,
      page: crPage,
    };
    history.push({
      pathname: location.pathname,
      search: queryString.stringify(newFilters),
    });
  };

  const timeout = useRef();

  // handle search name product
  const handleOnChangeSearch = (value) => {
    clearTimeout(timeout.current);

    const newFilters = {
      ...queryParams,
      page: 1,
      search: value,
    };

    if (value === '') {
      delete newFilters.search;
    }
    timeout.current = setTimeout(() => {
      history.push({
        pathname: location.pathname,
        search: queryString.stringify(newFilters),
      });
    }, 500);
  };

  useEffect(() => {
    // eslint-disable-next-line consistent-return
    (async () => {
      try {
        const { data, count } = await productApi.getAllProduct(queryParams);
        showLoading();
        setListDataProduct(data);
        setLoading(true);
        setTotalPage(Math.ceil(count / queryParams.limit));
        const timeOut = setTimeout(() => {
          hideLoading();
        }, number.DELAY);
        return () => {
          clearTimeout(timeOut);
        };
      } catch (error) {
        history.push(router.NOT_FOUND);
        hideLoading();
      }
    })();
  }, [queryParams, isActiveModal.isSuccess]);

  const isActive = locationName === router.QUAN_LY_SAN_PHAM;

  const handleOnClickModal = () => {
    if (!onClickModal) return;
    onClickModal(true);
  };

  // handle onRemove product
  const handleOnRemoveProduct = (id) => {
    const productById = listDataProduct.filter((product) => product._id === id);
    setProductDelete(productById);
    setIsActiveModal({
      isSuccess: false,
      isModal: true,
    });
  };

  // handle accept delete product
  const handleAcceptDelete = async (id) => {
    try {
      const status = await productApi.deleteProductById(id);
      if (status) {
        if (listDataProduct.length - 1 <= 0 && queryParams.page > 1) {
          history.push({
            pathname: location.pathname,
            search: queryString.stringify({
              ...queryParams,
              page: queryParams.page - 1,
            }),
          });
        }
        setIsActiveModal({
          isSuccess: true,
          isModal: false,
        });
      }
    } catch (error) {
      history.push(router.NOT_FOUND);
    }
  };

  const handleOnClose = () => {
    setIsActiveModal({
      isSuccess: false,
      isModal: false,
    });
  };

  return (
    <div className="product-list">
      <div className="content-container">
        <div
          className={
            isActive
              ? 'product-list-head content-container product-list__head-space'
              : 'product-list-head content-container product-list__head-end'
          }
        >
          <div
            className={
              isActive
                ? 'product-list__head-button'
                : 'product-list__head-button--none'
            }
          >
            <button
              type="button"
              className="product-list__btn"
              onClick={handleOnClickModal}
            >
              {title.THEM_SAN_PHAM}
            </button>
          </div>
          <Search onChangeSearch={handleOnChangeSearch} />
        </div>
        <div className="product-list-content ">
          {listDataProduct.length <= 0 && loading ? (
            <div className="product-list-empty">
              <img src={images.Images.EMPTY_PRODUCT} alt="" />
              <h2>Không có sản phẩm nào được tìm thấy</h2>
            </div>
          ) : (
            <>
              <div className="product-list-box">
                {loading ? (
                  <ProductList
                    dataProductList={listDataProduct}
                    isActive={isActive}
                    onRemoveProduct={handleOnRemoveProduct}
                  />
                ) : (
                  <>
                    <Box
                      sx={{
                        width: '100%',
                        height: '2rem',
                        position: 'fixed',
                        top: '6.4rem',
                        right: 0,
                        left: 0,
                        zIndex: 1,
                      }}
                    >
                      <LinearProgress />
                    </Box>
                  </>
                )}
              </div>

              <div className="product-list-pagination">
                <Pagination
                  count={totalPage}
                  variant="outlined"
                  shape="rounded"
                  onChange={handleOnPageChange}
                  page={queryParams.page}
                />
              </div>
            </>
          )}
        </div>
      </div>
      {isActive && (
        <Modal
          openSucc={isActiveModal.isModal}
          onClose={handleOnClose}
          component={
            // eslint-disable-next-line react/jsx-wrap-multilines
            <ModalConfirm
              infor={productDelete[0]}
              thumbnail={images.Images.DELETE_ICON}
              onClose={handleOnClose}
              onDelete={handleAcceptDelete}
            />
          }
        />
      )}

      {isActive && (
        <Modal
          openSucc={isActiveModal.isSuccess}
          onClose={handleOnClose}
          component={
            // eslint-disable-next-line react/jsx-wrap-multilines
            <ModalContent
              thumbnail={images.Images.DELETE_ICON}
              onClose={handleOnClose}
              title="Xóa sản phẩm thành công!"
            />
          }
        />
      )}
    </div>
  );
}
ProductListView.propTypes = {
  locationName: PropTypes.string,
};

export default ProductListView;
