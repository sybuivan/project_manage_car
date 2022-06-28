import React from 'react';
import { Grid } from '@mui/material';
import PropTypes from 'prop-types';
import { ProductCard } from '../../../components';

function ProductList({ dataProductList, isActive, onRemoveProduct }) {
  return (
    <>
      <Grid
        container
        direction="row"
        justifyContent="space-evenly"
        alignItems="center"
      >
        {dataProductList?.map((product) => (
          <Grid item key={product._id} md="auto" sm="auto">
            <ProductCard
              product={product}
              isActive={isActive}
              onRemoveProduct={onRemoveProduct}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
}

ProductList.propTypes = {
  dataProductList: PropTypes.array,
  isActive: PropTypes.bool,
};

export default ProductList;
