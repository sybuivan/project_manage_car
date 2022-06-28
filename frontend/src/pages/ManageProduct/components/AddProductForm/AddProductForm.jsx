import { Button, InputLabel } from '@mui/material';
import Select from 'react-select';
import IconButton from '@mui/material/IconButton';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { AiFillCloseCircle } from 'react-icons/ai';
import './addProductForm.scss';
import {
  ChooseImage,
  InputField,
  TextareaField,
} from '../../../../control-field';
import { schema } from '../../../../utils';
import { fieldText, title, button } from '../../../../constants';

function AddProductForm(props) {
  // eslint-disable-next-line object-curly-newline
  const {
    stateOption,
    onCategorySelect,
    onProductTypeSelect,
    onClickModal,
    onSubmit,
    initialValues,
  } = props;
  // eslint-disable-next-line object-curly-newline
  const { categories, productType, selectCategory, selectProductType } = stateOption;

  const [valueFile, setValueFile] = useState({});
  const [preThumbnail, setPreThumbnail] = useState('');

  const {
    handleSubmit,
    control,
    reset,
    resetField,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(schema),
  });

  // handle close modal form
  const handleClick = () => {
    onClickModal(false);
    reset({});
    onCategorySelect(null);
    onProductTypeSelect(null);
  };

  const handleOnSubmit = async (data) => {
    const newData = { ...data };

    newData.thumbnail = valueFile;
    newData.createdAt = new Date();
    await onSubmit(newData);
  };

  // change chooseImage
  const handleOnChangeImage = (files, thumbnailUrl) => {
    setValueFile(files);
    setPreThumbnail(thumbnailUrl);
  };

  function handleOnCategorySelect(option) {
    onCategorySelect(option);
  }

  const handleOnProductTypeSelect = (option) => {
    onProductTypeSelect(option);
  };

  return (
    <div className="product-form">
      <div className="product-form__box">
        <div className="product-form__head">
          <span>{title.THEM_SAN_PHAM}</span>
          <IconButton onClick={handleClick}>
            <AiFillCloseCircle />
          </IconButton>
        </div>

        <div className="product-form__content">
          <form onSubmit={handleSubmit(handleOnSubmit)}>
            <div className="product-form__control">
              <InputLabel shrink htmlFor="name">
                {fieldText.TEN_SP}<span>*</span>
              </InputLabel>
              <InputField
                name="name"
                placeholder={fieldText.TEN_SP}
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
                      placeholder="Chọn danh mục sản phẩm"
                      value={selectCategory}
                      isDisabled={categories.length === 0}
                      options={categories}
                      onChange={(option) => {
                        handleOnCategorySelect(option);
                        field.onChange(option);
                        resetField('typeProduct');
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
                        {errors.category?.value?.message}
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
                        handleOnProductTypeSelect(option);
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
                rows={3}
                placeholder="Nhập mô tả"
                type="text"
              />
            </div>

            <div className="product-form__control">
              <ChooseImage
                name="thumbnail"
                control={control}
                errors={errors}
                onChangeImage={handleOnChangeImage}
                thumbnailUrl={preThumbnail}
                placeholder={fieldText.ANH}
              />
            </div>

            <div className="product-form__action">
              <div
                className="product-form__action-close"
                onClick={handleClick}
                aria-hidden="true"
              >
                {isSubmitting ? (
                  <Button variant="contained" disabled>
                    {button.CANCEL}
                  </Button>
                ) : (
                  <Button variant="outlined">{button.CANCEL} </Button>
                )}
              </div>

              <div className="product-form__action-add">
                {isSubmitting ? (
                  <Button variant="contained" disabled>
                    {button.ADD}
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    sx={{ color: 'white' }}
                    type="submit"
                  >
                    {button.ADD}
                  </Button>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddProductForm;
