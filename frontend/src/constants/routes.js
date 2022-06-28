import { router } from '.';
import { NotFound } from '../components';
import { ManageProduct, ProductUpdate, Productdetail } from '../pages';

const routes = [
  {
    path: [router.QUAN_LY_SAN_PHAM, router.DANH_SACH_SAN_PHAM],
    exact: true,
    component: ManageProduct,
  },
  {
    path: `${router.QUAN_LY_SAN_PHAM}${router.CAP_NHAT_SAN_PHAM}/:id`,
    component: ProductUpdate,
  },
  {
    path: `${router.DANH_SACH_SAN_PHAM}${router.CHI_TIET_SAN_PHAM}/:id`,
    component: Productdetail,
  },
  {
    path: router.NOT_FOUND,
    component: NotFound,
  },
  {
    path: '*',
    component: NotFound,
  },
];

export default routes;
