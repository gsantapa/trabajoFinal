import React, { useState, useEffect } from 'react';
import ImageUploader from './ImageUploader';
import { useNavigate } from 'react-router-dom';
const Form = () => {
  const  [graboreg,setGraboReg]= useState(false);
 
  const [titulo, setTitulo] = useState('');
  const [desc_reducida, setDesc_Reducida] = useState('');
  const [comentario, setComentario] = useState('');
  const [fec_emision, setFec_Emision] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [path_imagen, setPath_Imagen] = useState('');
  const [cant_stock, setCant_Stock] = useState(0);
  const [preuni, setPreUni] = useState(0);

  const [categorias, setCategorias] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('');
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
  }, []);

  const handleFormSubmit  = async (event) => {
    event.preventDefault();
     
   
    const formData = new FormData();
    formData.append('image', selectedImage);
    formData.append('titulo', titulo);
    formData.append('desc_reducida', desc_reducida);
    formData.append('comentario', comentario);
    formData.append('fec_emision', fec_emision);
    formData.append('idcategoria', categoriaSeleccionada);
    formData.append('cant_stock',cant_stock);
    formData.append('preuni', preuni);
   
    
    
 
    try {
      const response = await fetch('http://localhost:3000/addProducto', {
        method: 'POST',
        // headers: {
        //   'Accept': 'application/json', 'Content-Type': 'application/json', // Asegúrate de ajustar los encabezados según los requisitos del servidor
        // },
        body: formData,
      });
       
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
      setFec_Emision(value);
    } else if (name === 'cant_stock') {
      setCant_Stock(value);
    } else if (name === 'preuni') {
      setPreUni(value);
    }
  };
  return (
    <form onSubmit={handleFormSubmit}>
      
      
      <h2>Agregar Estampillas</h2>  
 
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
          value={fec_emision}
          onChange={(e) => setFec_Emision(e.target.value)}
        />
      </div>      


      <div>
        <label>Imagen:</label>
        <ImageUploader onImageSelect={handleImageSelect} />
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
      



      <button type="submit">Guardar</button>
    </form>
  );
};

export default Form;
