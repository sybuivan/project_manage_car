const express = require('express');
const productRoute = require('./product.route');
const categoryRoute = require('./category.route');
const productTypeRoute = require('./productType.route');
const router = express.Router();
const config = require('../../config/config');
const docsRoute = require('./docs.route');

const defaultRoutes = [
  {
    path: '/product',
    route: productRoute,
  },
  {
    path: '/categories',
    route: categoryRoute,
  },
  {
    path: '/product-type',
    route: productTypeRoute,
  },
];

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
