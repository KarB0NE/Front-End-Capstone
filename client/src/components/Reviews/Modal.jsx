import React from 'react';

const { useState } = React;

function Modal({ imageUrl, closeHandler }) {
  const [showModal, setShowModal] = useState(true);
  if (!showModal) {
    return ('');
  }
  const clickClose = () => {
    setShowModal(!showModal);
    closeHandler();
  };
  return (
    <div className="modal">
      <span className="close" onClick={clickClose}>&times;</span>
      <img className="modal-content" src={imageUrl} alt="real size" />
    </div>
  );
}
export default Modal;
