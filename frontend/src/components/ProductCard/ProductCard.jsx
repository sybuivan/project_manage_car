import PropTypes from 'prop-types';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { button, router } from '../../constants';
import { formatPrice } from '../../utils/index';
import './ProductCard.scss';

const ProductCard = ({ product, isActive, onRemoveProduct }) => {
  const history = useHistory();

  const handleClick = () => {
    history.push(`${router.DANH_SACH_SAN_PHAM}${router.CHI_TIET_SAN_PHAM}/${product._id}`);
  };

  const handleClickUpdate = () => {
    history.push(`${router.QUAN_LY_SAN_PHAM}${router.CAP_NHAT_SAN_PHAM}/${product._id}`);
  };

  const handleOnRemove = (id) => {
    if (!onRemoveProduct) return;
    onRemoveProduct(id);
  };

  return (
    <div className="product-card">
      <div className="product-card__box">
        <div className="product-card__image" onClick={handleClick} aria-hidden="true">
          <img src={`${process.env.REACT_APP_BASE_URL}/${product.thumbnail}`} alt={product.name} />
        </div>
        {isActive ? (
          <div>
            <p className="product-card__name">{product.name}</p>
            <div className="product-card__action">
              <button
                type="button"
                className="product-card__button product-card__button-update"
                onClick={handleClickUpdate}
              >
                {button.UPDATE}
              </button>
              <button
                type="button"
                className="product-card__button product-card__button-delete"
                onClick={() => handleOnRemove(product._id)}
              >
                {button.DELETE}
              </button>
            </div>
          </div>
        ) : (
          <div className="product-card__info">
            <p className="product-card__name">{product.name}</p>
            <p className="product-card__price">{formatPrice(product.price)}</p>
          </div>
        )}
      </div>
    </div>
  );
};

ProductCard.propTypes = {
  product: PropTypes.object,
  isActive: PropTypes.bool,
};

export default ProductCard;
