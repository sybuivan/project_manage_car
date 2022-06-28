import * as yup from 'yup';

const schema = yup.object().shape({
  name: yup.string().required('Tên sản phẩm không được bỏ trống'),
  price: yup
    .number('Must be number')
    .typeError('Giá sản phẩm không được bỏ trống')
    .required('Giá sản phẩm không được bỏ trống')
    .test('Is positive?', 'Giá sản phẩm phải lớn hơn 0', (value) => value > 0)
    .min(1000, 'Giá sản phẩm nhỏ nhất 1000')
    .max(1000000000, 'Giá sản phẩm tối đa 1000000000'),
  category: yup.object().shape({
    value: yup.string().required('Danh mục sản phẩm không được bỏ trống'),
    label: yup.string(),
  }),
  typeProduct: yup.object().shape({
    value: yup.string().required('Hãng sản xuất không được bỏ trống'),
    label: yup.string(),
  }),
  description: yup
    .string()
    .required('Mô tả không được bỏ trống')
    .max(500, 'Mô tả không được quá 500 ký tự'),
  thumbnail: yup
    .object()
    .shape({
      file: yup.mixed().required('Ảnh minh họa không được bỏ trống'),
    })
    .nullable(),
});

export default schema;
