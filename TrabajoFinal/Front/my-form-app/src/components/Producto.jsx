import React, { useState, useEffect } from 'react';
import ImageUploader from './ImageUploader';
import { useNavigate } from 'react-router-dom';

import { useLocation } from 'react-router-dom'

const Producto = ( ) => {

  const location = useLocation();
  const prod = location.state?.prod;
   
 
  const  [graboreg,setGraboReg]= useState(false);
  
  const [titulo, setTitulo] = useState(prod ? prod.titulo : '');
  const [desc_reducida, setDesc_Reducida] = useState(prod ? prod.desc_reducida : '');
  const [comentario, setComentario] = useState(prod ? prod.comentario : '');
  const [fec_emision, setFec_Emision] = useState(prod ? prod.fec_emision : null);
  const [selectedImage, setSelectedImage] = useState(prod ? 'http://localhost:3000/img/' + prod.path_imagen : null);
  const [path_imagen, setPath_Imagen] = useState(prod ? 'http://localhost:3000/img/' + prod.path_imagen : '');
  const [cant_stock, setCant_Stock] = useState(prod ? prod.cant_stock : 0);
  const [preuni, setPreUni] = useState(prod ? prod.preuni : 0);
  const [categorias, setCategorias] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(
                                                                      prod ? prod.idcategoria : ''
                                                                    );
  
  
  
  const navigate=useNavigate();
  useEffect(()=>{
    if(!graboreg) return
    navigate('/');
  },[graboreg])

  useEffect(() => {
     
    fetch('http://localhost:3000/categoriasRetornarJSON')
      .then(response => response.json())
      .then(data => setCategorias(data))
      .catch(error => console.error('Error al obtener las Categorias:', error));
      if(!prod) {
        console.log('entro')
        setTitulo('')
        setDesc_Reducida('')
        setComentario('')
        setFec_Emision(null)
        setSelectedImage(null)
        setPath_Imagen('')
         setCant_Stock( 0)
        setPreUni( 0)
        
      }
  }, []);

  const handleFormSubmit  = async (event) => {
    event.preventDefault(); 
    
    const formData = new FormData();
    formData.append('image', selectedImage);
    formData.append('titulo', titulo);
    formData.append('desc_reducida', desc_reducida);
    formData.append('comentario', comentario);
    formData.append('fec_emision', formatDateToInputValue(fec_emision));
    formData.append('idcategoria', categoriaSeleccionada);
    formData.append('cant_stock',cant_stock);
    formData.append('preuni', preuni);
   

    try {
      
      let response;
      if (prod) {
        
        
        // Si prod está definido, es una edición
          formData.append('id', prod.id);
          const formDataObject = {};
          for (const [key, value] of formData.entries()) {
            formDataObject[key] = value;
          }
        
          const formDataJson = JSON.stringify(formDataObject);
          console.log(formDataJson)
          response = await fetch('http://localhost:3000/editarProducto', {
          method: 'POST',
          headers: {
            'Accept': 'application/json', 'Content-Type': 'application/json', // Asegúrate de ajustar los encabezados según los requisitos del servidor
          },           
          body:  formDataJson ,      
        });
      } else {
        // Si prod es null, es un nuevo prod
          response = await fetch('http://localhost:3000/addProducto', {
          method: 'POST',
          body: formData,
        });
      }
       
      if (response.ok) {
        setGraboReg(true)
        console.log('Imagen cargada con éxito en el servidor.');
        // Puedes agregar aquí la lógica para mostrar una notificación o realizar otra acción.
      } else {
        setGraboReg(false)
        console.log('Error al cargar la imagen en el servidor.');
      }
    } catch (error) {
      console.log('Error al conectarse con el servidor:', error);
    }
  };

  const handleImageSelect = (file) => {
    setSelectedImage(file);
  };
  

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'idcategoria') {
      setCategoriaSeleccionada(value);
    } else if (name === 'titulo') {
      setTitulo(value);
    } else if (name === 'desc_reducida') {
      setDesc_Reducida(value);
    } else if (name === 'comentario') {
      setComentario(value);
    } else if (name === 'fec_emision') {
      console.log('entro por fecha')
      console.log(value)
      setFec_Emision(value);
    } else if (name === 'cant_stock') {
      setCant_Stock(value);
    } else if (name === 'preuni') {
      setPreUni(value);
    }
  };
  const formatDateToInputValue = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  return (
    <>
    <form onSubmit={handleFormSubmit}>
      
      
      <h2>{prod ? 'Modificar Producto':'Nuevo Producto'}</h2>  
 
      <div>
        <label htmlFor="titulo" >Título:</label>
        <input
     
              
          type="text"
          id="titulo"
          name="titulo"
          value={titulo}      
           
          onChange={(e) => setTitulo(e.target.value)}
        />
      </div>        
      <div>
        <label htmlFor="desc_reducida">Descripción:</label>
        <input
          type="text"  
          id="desc_reducida"
          name="desc_reducida"
          value={desc_reducida}
          onChange={(e) => setDesc_Reducida(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="idcategoria">Categoria:</label>
        <select id="idcategoria" name="idcategoria" value={categoriaSeleccionada} onChange={handleChange}>
          <option value="">Seleccionar categoria</option>
          {categorias.map(categoria => (
            <option key={categoria.id} value={categoria.id}>
              {categoria.descripcion}
            </option>
          ))}
        </select>
      </div>          
      <div>
        <label htmlFor="comentario">Comentario:</label>
        <input
          type="text"  
          id="comentario"
          name="comentario"
          value={comentario}
          onChange={(e) => setComentario(e.target.value)}
        />
      </div>      
      <div>
        <label htmlFor="fec_emision">Fecha Emisión:</label>
        <input
          type="date"  
          id="fec_emision"
          name="fec_emision"
          value={formatDateToInputValue(fec_emision)}
          onChange={(e) => setFec_Emision(e.target.value)}
        />
      </div>      


      <div>
        <label>Imagen:</label>
        <ImageUploader onImageSelect={handleImageSelect} image={selectedImage} />
      </div>
      <div>
        <label htmlFor="cant_stock">Stock:</label>
        <input
          id="cant_stock"
          name="cant_stock"
          type="text"
          value={cant_stock}
          onChange={(e) => setCant_Stock(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="preuni">Precio Unitario:</label>
        <input
          id="preuni"
          name="preuni"
          type="text"
          value={preuni}
          onChange={(e) => setPreUni(e.target.value)}
        />
      </div>

      <button type="submit"  >Guardar</button>
    </form>
    </>
  );
};

export default Producto;
