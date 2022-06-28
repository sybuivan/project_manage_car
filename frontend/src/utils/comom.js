import { router } from '../constants';

export const formatPrice = (price) => {
  const dollarUS = Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    useGrouping: true,
    maximumSignificantDigits: 3,
  });

  return dollarUS.format(price);
};

export const redirectSideBar = (location) => {
  let path = '';
  if (location.includes(router.CHI_TIET_SAN_PHAM)) {
    path = router.DANH_SACH_SAN_PHAM;
  }
  if (location.includes(router.CAP_NHAT_SAN_PHAM)) {
    path = router.QUAN_LY_SAN_PHAM;
  }
  return path;
};

// rename key of object
export const renameKeys = (obj, newKeys) => {
  const keyValues = Object.keys(obj).map((key) => {
    const newKey = newKeys[key] || key;
    return { [newKey]: obj[key] };
  });
  return Object.assign({}, ...keyValues);
};
