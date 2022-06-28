import React from 'react';
import { button } from '../../constants';

// eslint-disable-next-line object-curly-newline
function ModalConfirm({ infor, thumbnail, title, onClose, onDelete }) {
  const { name, _id } = infor;
  return (
    <div className="modal-content">
      <div className="modal-content__box">
        <img src={thumbnail} alt={title} className="modal-content__box-image" />
        <div>
          <p className="modal-content__title-delete">
            Bạn có chắc muốn xóa sản phẩm
            <span className="modal-content__title-warning"> {name}?</span>
          </p>
          <p className="modal-content__title-delete">
            Sản phẩm này sẽ bị
            <span className="modal-content__title-warning"> xóa vĩnh viễn</span>
            .
          </p>
        </div>

        <div className="modal-content__action">
          <button
            type="button"
            className="modal-content__action-button"
            onClick={() => {
              if (!onClose) return;
              onClose(false);
            }}
          >
            {button.CANCEL}
          </button>
          <button
            type="button"
            className="modal-content__action-button delete"
            onClick={() => {
              if (!onDelete) return;
              onDelete(_id);
            }}
          >
            {button.DELETE}
          </button>
        </div>
      </div>
    </div>
  );
}

ModalConfirm.propTypes = {};

export default ModalConfirm;
