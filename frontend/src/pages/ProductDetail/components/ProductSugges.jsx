import { Grid } from '@mui/material';
import React from 'react';
import { ProductCard } from '../../../components';

function ProductSugges({ listSuggest }) {
  return (
    <div>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        {listSuggest?.map((product) => (
          <Grid item xs="auto" md="auto" sm="auto" key={product._id}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default ProductSugges;
