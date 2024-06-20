import React from 'react';
import Modal from './Modal.jsx';

const { useState, useEffect } = React;

function DisplayPicture({ imgUrl }) {
  const [isClicked, setIsClicked] = useState(false);
  const imgClickHandler = () => {
    setIsClicked(!isClicked);
  };

  const closeOnClick = () => {
    setIsClicked(!isClicked);
  }
  return (
    <>
      <img src={imgUrl} className="thumbnail" onClick={imgClickHandler} alt="thumbnail" />
      {
        isClicked ? <Modal imageUrl={imgUrl}  closeHandler={closeOnClick}/> : ''
      }
    </>

  );
}

export default DisplayPicture;
