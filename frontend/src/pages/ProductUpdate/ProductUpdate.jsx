import { yupResolver } from '@hookform/resolvers/yup';
import { Grid, InputLabel } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import Select from 'react-select';
import { Controller, useForm } from 'react-hook-form';
import { useParams, useHistory } from 'react-router-dom';
import './ProductUpdate.scss';
import { productApi } from '../../api';
import { ListUpdateImage } from './components';
import { ChooseImage, InputField, TextareaField } from '../../control-field';
import { schema } from '../../utils';
import useSelector from '../../hooks/useSelector';
import { Modal, ModalContent } from '../../components';
// eslint-disable-next-line object-curly-newline
import { button, fieldText, images, number, router } from '../../constants';
import { useLoading } from '../../hooks';

function ProductUpdate() {
  const [modalSuccess, setModalSuccess] = useState(false);
  // loading when call api
  const [showLoading, hideLoading] = useLoading();

  // init state array list default
  const [thumbnailsSlider, setThumbnailsSlider] = useState([
    {
      files: {},
      position: 1,
      prevSlide: '',
    },
    {
      files: {},
      position: 2,
      prevSlide: '',
    },
    {
      files: {},
      position: 3,
      prevSlide: '',
    },
    {
      files: {},
      position: 4,
      prevSlide: '',
    },
  ]);

  // init state array list thumbnails response
  const [resThumbnails, setResThumbnails] = useState([]);

  // transmit component chooseImage
  const [isEdit, setIsEdit] = useState({
    isPre: true,
    isClass: true,
  });

  // init file thumbnail
  const [filesUpload, setFilesUpload] = useState({
    thumbnailUrl: '',
    file: {},
  });

  const history = useHistory();

  // logic handle onChange list thumbnail position
  const handleOnChangeThumbnails = (file, pos, pre) => {
    // clone new array
    const newThumbnailsSlider = [...thumbnailsSlider];

    // find position changed
    const sildeIndex = newThumbnailsSlider?.findIndex((item) => item.position === pos);
    const newSlideItem = {
      files: file,
      position: pos,
      prevSlide: pre,
    };
    if (sildeIndex >= 0) {
      newThumbnailsSlider[sildeIndex] = newSlideItem;
    }
    setThumbnailsSlider(newThumbnailsSlider);
  };

  const { id } = useParams();

  // clear timeout when used setTimeout
  const timeout = useRef();

  const {
    handleSubmit,
    control,
    reset,
    setValue,
    // resetField,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const { stateOption, onCategorySelect, onProductTypeSelect } = useSelector();
  // eslint-disable-next-line object-curly-newline
  const { categories, productType, selectCategory, selectProductType } = stateOption;
  useEffect(() => {
    (async () => {
      try {
        showLoading();
        const res = await productApi.getProductById(id);
        onCategorySelect({
          value: res.category._id,
          label: res.category.name,
        });

        onProductTypeSelect({
          value: res.typeProduct._id,
          label: res.typeProduct.name,
        });
        reset({
          name: res.name,
          price: res.price,
          description: res.description,
          category: {
            value: res.category._id,
            label: res.category.name,
          },
          typeProduct: {
            value: res.typeProduct._id,
            label: res.typeProduct.name,
          },
          thumbnail: res.thumbnail,
        });

        setFilesUpload({
          ...filesUpload,
          thumbnailUrl: res.thumbnail,
        });
        setResThumbnails(res.slider);
      } catch (error) {
        history.push(router.NOT_FOUND);
      } finally {
        hideLoading();
      }
    })();
  }, []);

  // change images
  const handleOnChangeImage = (files, url) => {
    setIsEdit({ ...isEdit, isPre: false });
    setFilesUpload({
      thumbnailUrl: url,
      file: files,
    });
  };

  const handleOnRemoveSlide = (pos, bool) => {
    // is 2 case remove slide: 1. remove preview. 2. Remove thumbnailSlide server return.
    // if bool true then remove thumbnailSlide else remove preview
    if (bool) {
      const newResThumbnails = [...resThumbnails];
      newResThumbnails[pos - 1] = { ...newResThumbnails[pos - 1], thumbnailSlide: "" };
      setResThumbnails(newResThumbnails);
    } else {
      const newThumbnailsSlider = [...thumbnailsSlider];
      newThumbnailsSlider[pos - 1] = {
        files: {},
        position: pos,
        prevSlide: "",
      };
      setThumbnailsSlider(newThumbnailsSlider);
    }
  };

  // submit form
  const handleOnSubmit = async (values) => {
    clearTimeout(timeout.current);

    const newValues = { ...values };
    // eslint-disable-next-line object-curly-newline
    const { name, price, category, typeProduct, description } = newValues;
    const formData = new FormData();
    newValues.slider = thumbnailsSlider;
    newValues.createdAt = new Date();
    formData.append('name', name);
    formData.append('price', price);
    formData.append('category', category.value);
    formData.append('typeProduct', typeProduct.value);
    formData.append('description', description);
    formData.append('createdAt', newValues.createdAt);
    if (filesUpload.file?.name !== undefined) {
      formData.append('thumbnail', filesUpload.file, filesUpload.file.name);
    }

    // if the resThumbnails array is an empty array then filter through the file array.
    // check if the file has a name, add the file and if the files are not
    //  uploaded, add the name "nopositon'
    if (resThumbnails.length <= 0) {
      newValues.slider.forEach((fileThum) => {
        if (fileThum.files?.name !== undefined) {
          formData.append("slider", fileThum?.files, fileThum?.files?.name);
          formData.append("position", fileThum.position);
        } else {
          formData.append("noposition", fileThum.position);
        }
      });
    } else {
      newValues.slider.forEach((fileThum, index) => {
        if (fileThum.files?.name) {
          formData.append("slider", fileThum.files, fileThum.files.name);
          formData.append("position", fileThum.position);
        } else if (resThumbnails[index]?.thumbnailSlide === "") {
          // case edit thumbnails and resThumbnails !== []
          formData.append("noposition", fileThum.position);
        }
      });
    }
    await productApi.editProductById(id, formData);
    setModalSuccess(true);
    setTimeout(() => {
      history.push(`${router.DANH_SACH_SAN_PHAM}${router.CHI_TIET_SAN_PHAM}/${id}`);
      setModalSuccess(false);
    }, number.DELAY);
  };

  return (
    <div>
      <div className="product-update__wrapper">
        <div className="content-container">
          <div className="product-update-content">
            <form onSubmit={handleSubmit(handleOnSubmit)}>
              <Grid container spacing={2}>
                <Grid item xs={6} lg={6} sm={12}>
                  <h2 className="product-update-title">Thông tin sản phẩm</h2>
                  <div className="product-form__control">
                    <InputLabel shrink htmlFor="name">
                      {fieldText.TEN_SP}<span>*</span>
                    </InputLabel>
                    <InputField
                      name="name"
                      placeholder="Tên sản phẩm"
                      control={control}
                      errors={errors}
                      type="text"
                    />
                  </div>
                  <div className="product-form__control">
                    <InputLabel shrink htmlFor="name">
                      {fieldText.DANH_MUC}<span>*</span>
                    </InputLabel>

                    <Controller
                      control={control}
                      name="category"
                      render={({ field }) => (
                        <div>
                          <Select
                            placeholder="Chọn danh mục sản xuất"
                            defaultValue={selectCategory}
                            value={selectCategory}
                            isDisabled={categories.length === 0}
                            options={categories}
                            onChange={(option) => {
                              onCategorySelect(option);
                              field.onChange(option);
                              setValue('typeProduct', {
                                value: "",
                              });
                            }}
                            className={errors.category ? 'select-error' : ''}
                          />
                          {errors.category?.value && (
                            <p
                              className="css-1wc848c-MuiFormHelperText-root"
                              style={{
                                color: 'var(--colorError)',
                                marginTop: '0.3rem!important',
                              }}
                            >
                              {errors.category}
                            </p>
                          )}
                        </div>
                      )}
                    />
                  </div>
                  <div className="product-form__control">
                    <InputLabel shrink htmlFor="name">
                      {fieldText.HANG_SX}<span>*</span>
                    </InputLabel>
                    <Controller
                      control={control}
                      name="typeProduct"
                      render={({ field }) => (
                        <div>
                          <Select
                            placeholder="Chọn hãng sản xuất"
                            isDisabled={productType.length === 0}
                            options={productType}
                            value={selectProductType}
                            onChange={(option) => {
                              onProductTypeSelect(option);
                              field.onChange(option);
                            }}
                            className={errors.typeProduct ? 'select-error' : ''}
                          />
                          {errors.typeProduct?.value && (
                            <p
                              className="css-1wc848c-MuiFormHelperText-root"
                              style={{
                                color: 'var(--colorError)',
                                marginTop: '0.3rem!important',
                              }}
                            >
                              {errors.typeProduct?.value?.message}
                            </p>
                          )}
                        </div>
                      )}
                    />
                  </div>
                  <div className="product-form__control">
                    <InputLabel shrink htmlFor="name">
                      {fieldText.GIA_SP}<span>*</span>
                    </InputLabel>
                    <InputField
                      name="price"
                      control={control}
                      errors={errors}
                      type="number"
                      placeholder="Nhập giá sản phẩm"
                    />
                  </div>
                  <div className="product-form__control">
                    <InputLabel shrink htmlFor="name">
                      {fieldText.MO_TA}
                    </InputLabel>
                    <TextareaField
                      name="description"
                      control={control}
                      errors={errors}
                      rows={4}
                      placeholder="Nhập mô tả"
                      type="text"
                    />
                  </div>

                  <div className="product-update__action">
                    <button
                      type="button"
                      className="product-update__action-button close"
                      disabled={isSubmitting}
                      onClick={history.goBack}
                    >
                      {button.CANCEL}
                    </button>

                    <button
                      type="submit"
                      className="product-update__action-button"
                      disabled={isSubmitting}
                    >
                      {button.SAVE}
                    </button>
                  </div>
                </Grid>
                <Grid item xs={6} lg={6} sm={12}>
                  <div className="product-form__control">
                    <ChooseImage
                      name="thumbnail"
                      control={control}
                      errors={errors}
                      onChangeImage={handleOnChangeImage}
                      thumbnailUrl={filesUpload.thumbnailUrl}
                      edit={isEdit}
                      placeholder={fieldText.ANH}
                    />
                  </div>
                  <ListUpdateImage
                    listSlider={resThumbnails}
                    thumbnailsSlider={thumbnailsSlider}
                    onChangeThumbnails={handleOnChangeThumbnails}
                    onRemoveSlide={handleOnRemoveSlide}
                  />
                </Grid>
              </Grid>
            </form>
          </div>
        </div>
        {modalSuccess ? (
          <Modal
            openSucc={modalSuccess}
            component={<ModalContent title="Cập nhật thành công!" thumbnail={images.Images.SUCCESS} />}
          />
        ) : (
          ''
        )}
      </div>
    </div>
  );
}

export default ProductUpdate;
