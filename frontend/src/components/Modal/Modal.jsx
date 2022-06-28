import Dialog from '@mui/material/Dialog';
import * as React from 'react';
import './Modal.scss';

export default function Modal({ component, openSucc, onClose }) {
  const handleOnClose = () => {
    if (!onClose) return;
    onClose(false);
  };

  return (
    <div>
      <Dialog
        open={openSucc}
        onClose={handleOnClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {component}
      </Dialog>
    </div>
  );
}
