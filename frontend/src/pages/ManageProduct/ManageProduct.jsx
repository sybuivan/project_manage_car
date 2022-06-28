/* eslint-disable object-curly-newline */
/* eslint-disable operator-linebreak */
import React, { useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { images, router } from '../../constants';
import ProductListView from '../ProductListView';
import './ManageProduct.scss';
import { Modal, ModalContent } from '../../components';
import { AddProductForm } from './components';
import useSelector from '../../hooks/useSelector';
import { productApi } from '../../api';

function ManageProduct() {
  const location = useLocation();
  const [isActiveModal, setIsActiveModal] = useState(() => {
    return {
      isOpenModal: false,
      isSuccessModal: false,
    };
  });

  const history = useHistory();

  const { stateOption, onCategorySelect, onProductTypeSelect } = useSelector();

  const handleClickModal = (activeModal) => {
    setIsActiveModal({
      isSuccessModal: false,
      isOpenModal: activeModal,
    });
  };

  const handleOnClose = (bool) => {
    setIsActiveModal({
      isSuccessModal: false,
      isOpenModal: bool,
    });
  };

  const handleSubmit = async (value) => {
    const {
      name,
      price,
      category,
      typeProduct,
      description,
      thumbnail,
      createdAt,
    } = value;

    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    formData.append('category', category.value);
    formData.append('typeProduct', typeProduct.value);
    formData.append('description', description);
    formData.append('createdAt', createdAt);
    formData.append('thumbnail', thumbnail, thumbnail.name);
    const dataProductAdd = await productApi.addProduct(formData);
    setIsActiveModal({
      isOpenModal: false,
      isSuccessModal: true,
    });

    setTimeout(() => {
      setIsActiveModal({
        isOpenModal: false,
        isSuccessModal: false,
      });
      history.push(
        `${router.DANH_SACH_SAN_PHAM}${router.CHI_TIET_SAN_PHAM}/${dataProductAdd?._id}`,
      );
    }, 1500);
  };

  // initialValues form
  const initialValues = {
    name: '',
    price: null,
    category: {},
    typeProduct: {},
    description: '',
    thumbnail: undefined,
  };

  return (
    <div className="manage-product">
      <ProductListView
        locationName={location.pathname}
        onClickModal={handleClickModal}
      />
      {isActiveModal.isOpenModal && (
        <Modal
          openSucc={isActiveModal.isOpenModal}
          onClose={handleOnClose}
          component={(
            <AddProductForm
              onClickModal={handleClickModal}
              onSubmit={handleSubmit}
              stateOption={stateOption}
              onCategorySelect={onCategorySelect}
              onProductTypeSelect={onProductTypeSelect}
              initialValues={initialValues}
            />
          )}
        />
      )}

      {isActiveModal.isSuccessModal && (
        <Modal
          openSucc={isActiveModal.isSuccessModal}
          onClose={handleOnClose}
          component={(
            <ModalContent
              title="Thêm thành công"
              onClose={handleOnClose}
              thumbnail={images.Images.SUCCESS}
            />
          )}
        />
      )}
    </div>
  );
}

export default ManageProduct;
