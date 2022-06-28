import React from 'react';
import './CustomSilder.scss';

const CustomSilder = ({ slider }) => {
  return (
    <div className="slider">
      <div
        className="slider-image"
        style={{
          backgroundImage: `url(${process.env.REACT_APP_BASE_URL}${slider.thumbnailSlide})`,
        }}
      />
    </div>
  );
};

export default CustomSilder;
