import React from 'react';

const { useState } = React;

function UploadPhoto({ setPhotos }) {
  const [files, setFiles] = useState([]);
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const fileURL = URL.createObjectURL(file);
    const newFiles = [...files, fileURL];
    setFiles(newFiles);
    setPhotos(newFiles);
  };
  return (
    <div className="upload-container">
      {files && files.map((file) => (<img src={file} alt="thumbnail" />))}
      {
        files && files.length >= 5 ? ''
          : (
            <label className="upload-button">
              +
              <input type="file" onChange={handleFileChange} accept="image/*" />
            </label>
          )
      }

    </div>
  );
}

export default UploadPhoto;
