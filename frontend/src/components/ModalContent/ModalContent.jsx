import { IconButton } from '@mui/material';
import React from 'react';
import { IoMdCloseCircle } from 'react-icons/io';
import './ModalContent.scss';

const ModalContent = ({ title, thumbnail, onClose }) => {
  const handleOnClose = () => {
    if (!onClose) return;
    onClose(false);
  };
  return (
    <div className="modal-content">
      <div className="modal-content__head">
        <IconButton onClick={handleOnClose}>
          <IoMdCloseCircle />
        </IconButton>
      </div>
      <div className="modal-content__box">
        <img src={thumbnail} alt={title} className="modal-content__box-image" />
        <p className="modal-content__box-title">{title}</p>
      </div>
    </div>
  );
};

ModalContent.propTypes = {};

export default ModalContent;
