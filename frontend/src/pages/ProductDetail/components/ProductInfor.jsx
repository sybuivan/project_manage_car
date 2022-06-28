import { Grid } from '@mui/material';
import React from 'react';
import Slider from 'react-slick';
import { CustomSilder } from '../../../components';
import { number, fieldText } from '../../../constants';
import { formatPrice } from '../../../utils';

function ProductInfor({ product, isSeeMore, onSeeMore }) {
  // eslint-disable-next-line object-curly-newline
  const { category, typeProduct, price, name, description, slider } = product;
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <Grid container spacing={(1, 2)}>
      <Grid item xs={12} md={4}>
        <div className="product-detail__info">
          <span className="product-detail__info-name">{name}</span>
          <p className="product-detail__info-text">
            {fieldText.DANH_MUC}: {category?.name}
          </p>
          <p className="product-detail__info-text">
            {fieldText.HANG_SX}: {typeProduct?.name}
          </p>
          <p className="product-detail__info-text">
            {fieldText.GIA_SP} sản phẩm: {formatPrice(price)}
          </p>
          <p className="product-detail__info-text product-detail__info-desc">
            {fieldText.MO_TA} sản phẩm:
            <span style={{ display: 'block' }}>
              {isSeeMore
                ? description
                : description.slice(0, number.SIZE_DESCRIPTION)}
              {description.length > number.SIZE_DESCRIPTION && (
                <button
                  type="button"
                  className="see-more"
                  onClick={() => onSeeMore((pre) => !pre)}
                >
                  {isSeeMore ? 'Thu gọn' : 'Xem thêm'}
                </button>
              )}
            </span>
          </p>
        </div>
      </Grid>
      <Grid item xs={12} md={8}>
        <div className="product-detail__images">
          {slider.length <= 0 && (
            <img
              src={`${process.env.REACT_APP_BASE_URL}${product.thumbnail}`}
              alt=""
              width="100%"
              height="100%"
            />
          )}
          <Slider {...settings}>
            {slider
              ?.filter((slide) => slide.thumbnailSlide !== '')
              .map((slide) => (
                <CustomSilder slider={slide} key={slide.position} />
              ))}
          </Slider>
        </div>
      </Grid>
    </Grid>
  );
}

export default ProductInfor;
