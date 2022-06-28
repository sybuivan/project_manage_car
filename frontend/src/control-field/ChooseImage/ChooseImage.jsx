import React from 'react';
// import { styled } from '@mui/material/styles';
import { Controller } from 'react-hook-form';
import { InputLabel } from '@mui/material';
import { toast } from 'react-toastify';
import { settingToast, typeImage } from '../../constants';
// eslint-disable-next-line object-curly-newline
function ChooseImage({
  control,
  errors,
  name,
  thumbnailUrl,
  onChangeImage,
  edit,
  placeholder,
}) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <>
          <InputLabel
            shrink
            htmlFor="contained-button-file"
            style={{ color: 'var(--colorButtonGreen)', cursor: 'pointer' }}
          >
            <input
              style={{ display: 'none' }}
              accept="image/*"
              id="contained-button-file"
              multiple
              type="file"
              name={name}
              onChange={(e) => {
                if (
                  typeImage.includes(
                    e.target?.files[0]?.type,
                  )
                ) {
                  field.onChange(e.target.files[0]);
                  if (!onChangeImage) return;
                  onChangeImage(
                    e.target.files[0],
                    URL.createObjectURL(e.target.files[0]),
                  );
                } else {
                  toast.error(
                    'Không đúng định dạng file image/png, image/jpg, image/jpeg',
                    settingToast,
                  );
                }
              }}
            />
            {placeholder}
            <span>*</span>
          </InputLabel>

          {!!errors[name] || thumbnailUrl === '' ? (
            <p style={{ color: 'var(--colorError)' }}>
              {errors[name]?.file.message}
            </p>
          ) : (
            <img
              src={
                edit?.isPre
                  ? `${process.env.REACT_APP_BASE_URL}/${thumbnailUrl}`
                  : thumbnailUrl
              }
              alt="Name"
              className={
                edit?.isClass ? 'thumbnail-pre__edit' : 'thumbnail-pre'
              }
            />
          )}
        </>
      )}
    />
  );
}

ChooseImage.propTypes = {};

export default ChooseImage;
