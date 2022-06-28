import React from 'react';
import { InputLabel } from '@mui/material';
import { toast } from 'react-toastify';
// eslint-disable-next-line object-curly-newline
import { button, images, typeImage, settingToast } from '../../../../constants';
import './UpdateImage.scss';

// eslint-disable-next-line object-curly-newline
const UpdateImage = ({
  slider,
  onChangeThumbnails,
  position,
  thumbnailPre,
  onRemoveSlide,
}) => {
  // logic handle onchange thumbnail slider position
  const handleOnChangeThumbnail = (e) => {
    if (!onChangeThumbnails) return;
    if (typeImage.includes(e.target?.files[0]?.type)) {
      onChangeThumbnails(
        e.target.files[0],
        position,
        URL.createObjectURL(e.target.files[0]),
      );
    } else {
      toast.error(
        'Không đúng định dạng file image/png, image/jpg, image/jpeg',
        settingToast,
      );
    }
  };

  // logic handle remove slide
  const handleRemoveSilde = (positionClick, bool) => {
    if (!onRemoveSlide) return;
    onRemoveSlide(positionClick, bool);
  };

  return (
    <div className="update-image">
      {Object.keys(slider).length <= 0 && !thumbnailPre ? (
        <div className="update-image__add">
          <InputLabel
            shrink
            htmlFor={`contained-button-file-slide${position}`}
            className="update-image__labal"
          >
            <img src={images.Images.ADD} alt="" />
            <input
              accept="image/*"
              style={{ display: 'none' }}
              id={`contained-button-file-slide${position}`}
              multiple
              type="file"
              name="slide"
              onChange={(e) => {
                handleOnChangeThumbnail(e);
              }}
            />
          </InputLabel>
        </div>
      ) : (
        <div className="update-image__wrapper">
          <img
            src={
              thumbnailPre !== ''
                ? thumbnailPre
                : `${process.env.REACT_APP_BASE_URL}/${slider.thumbnailSlide}`
            }
            alt=""
            className="update-image__thumbnail"
          />
          <div className="update-image__overlay">
            <div className="update-image__action">
              <button type="button" className="update-image__action-button">
                <InputLabel
                  htmlFor={`contained-button-file-change${position}`}
                  style={{
                    fontSize: '1.4rem',
                    color: 'var(--colorWhite)',
                    cursor: 'pointer',
                  }}
                >
                  <input
                    accept="image/*"
                    id={`contained-button-file-change${position}`}
                    multiple
                    style={{ display: 'none' }}
                    type="file"
                    onChange={(e) => {
                      handleOnChangeThumbnail(e);
                    }}
                  />
                  {button.UPDATE}
                </InputLabel>
              </button>
              <button
                type="button"
                className="update-image__action-button"
                onClick={() => {
                  if (thumbnailPre === '') {
                    handleRemoveSilde(position, true);
                  } else {
                    handleRemoveSilde(position, false);
                  }
                }}
              >
                {button.DELETE}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdateImage;
