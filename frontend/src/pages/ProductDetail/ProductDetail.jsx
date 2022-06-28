import React, { useEffect, useState } from 'react';
import { IoIosArrowRoundBack } from 'react-icons/io';
import { useHistory, useParams } from 'react-router-dom';
import { productApi } from '../../api';
import { button } from '../../constants';
import { useLoading } from '../../hooks';
import { ProductInfor, ProductSugges } from './components';
import './ProductDetail.scss';

function ProductDetail() {
  const [showLoading, hideLoading] = useLoading();
  const [product, setProduct] = useState();
  const [listSuggest, setListSuggest] = useState([]);
  const [isSeeMore, setIsSeeMore] = useState(false);
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      try {
        showLoading();
        const resProductDetails = await productApi.getProductById(id);
        const resProductSuggest = await productApi.getProductSuggest(
          resProductDetails?.category._id,
        );
        setProduct(resProductDetails);
        setListSuggest(resProductSuggest);
      } catch (error) {
        // throw new Error(error);
      } finally {
        hideLoading();
      }
    })();
  }, [id]);

  const handeOnSeeMore = () => {
    setIsSeeMore((pre) => !pre);
  };

  return (
    <div className="product-detail content-container">
      <div className="product-detail-box">
        <span className="product-detail-head" aria-hidden="true">
          <button
            type="button"
            onClick={history.goBack}
            className="product-detail__back"
          >
            <IoIosArrowRoundBack />
            {button.BACK}
          </button>
        </span>
        <div className="product-detail__wrapper">
          {product && (
            <ProductInfor
              product={product}
              onSeeMore={handeOnSeeMore}
              isSeeMore={isSeeMore}
            />
          )}
        </div>

        <div className="product-detail__suggest">
          <h2 className="product-detail__suggest-title">Gợi ý cho bạn:</h2>
          {listSuggest && <ProductSugges listSuggest={listSuggest} />}
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
