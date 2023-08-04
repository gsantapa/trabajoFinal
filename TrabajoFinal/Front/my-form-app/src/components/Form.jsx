// src/components/Form.js
import React, { useState } from 'react';
import ImageUploader from './ImageUploader';

const Form = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('image', selectedImage);

    try {
      const response = await fetch('http://localhost:3001/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        console.log('Imagen cargada con éxito en el servidor.');
        // Puedes agregar aquí la lógica para mostrar una notificación o realizar otra acción.
      } else {
        console.error('Error al cargar la imagen en el servidor.');
      }
    } catch (error) {
      console.error('Error al conectarse con el servidor:', error);
    }
  };

  const handleImageSelect = (file) => {
    setSelectedImage(file);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Título:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="description">Descripción:</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div>
        <label>Imagen:</label>
        <ImageUploader onImageSelect={handleImageSelect} />
      </div>
      <button type="submit">Guardar</button>
    </form>
  );
};

export default Form;
