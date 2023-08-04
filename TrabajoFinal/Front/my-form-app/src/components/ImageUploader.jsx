// src/components/ImageUploader.js
import React, { useState } from 'react';

const ImageUploader = ({ onImageSelect,image }) => {
  const [selectedImage, setSelectedImage] = useState( image?? null);
  
  
  const handleImageChange = (e) => {
    const file = e.target.files[0];
 
    const reader = new FileReader();

    reader.onloadend = () => {
      setSelectedImage(reader.result);
      onImageSelect(file);
      console.log(reader.result)
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleImageChange} />
      {selectedImage && <img src={selectedImage} alt="Preview" />}
    </div>
  );
};

export default ImageUploader;
