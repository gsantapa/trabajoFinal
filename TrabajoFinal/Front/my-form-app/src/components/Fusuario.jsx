import React,  { useState, useEffect }from 'react';
import {useUserStore} from '../stores/store';
import { useNavigate } from 'react-router-dom';


const Fusuario = () => {
  const [data, setData] = useState({ nomusu:'', apellynomb:'',
                                     rol:'consulta', email:'',
                                     direccion:'', ciudad:'',
                                     cp:'', idprovincia:0,password: ''});
  const setUser = useUserStore((state) => state.setUser);
  const user = useUserStore ((state) => state.user)
  const navigate=useNavigate();
  
  const [provincias, setProvincias] = useState([]);
  const [provinciaSeleccionada, setProvinciaSeleccionada] = useState('');


  useEffect(()=>{
    if(!user) return
    navigate('/');
  },[user])

  useEffect(() => {
    fetch('http://localhost:3000/provinciasjson')
      .then(response => response.json())
      .then(data => setProvincias(data))
      .catch(error => console.error('Error al obtener las provincias:', error));
  }, []);

  // const handleProvinciaChange = event => {
  //   setProvinciaSeleccionada(event.target.value);
  // };

  const handleFormSubmit  = async (event) => {
    event.preventDefault();
    const userresultado = data
     
    const options = {
      method: 'POST',
      headers: {
        'Accept': 'application/json', 'Content-Type': 'application/json', // Asegúrate de ajustar los encabezados según los requisitos del servidor
      },
      body: JSON.stringify(data), // Convierte el objeto 'data' a formato JSON
    };
      
    fetch('http://localhost:3000/addUsuario',options)
      .then(response => {if (response.ok) 
                          { return response.json();} 
                         else {
                              setError('Error en la solicitud' ); // Establece el mensaje de error en caso de inicio de sesión fallido
                              throw new Error('Error en la solicitud');
                              }
                          }) // Convertir la respuesta a JSON
      .then(data => {
        
           
          setUser(userresultado);
          
           

      })
      .catch(error => {
        console.error('Error al realizar la solicitud:', error);
      });



  };



  
  const handleChange = (event) => {
    const { name, value } = event.target;
   
    if (name === 'idprovincia') {
      setProvinciaSeleccionada(value);
    }
    setData((prevData) => ({ ...prevData, [name]: value }));
    
  };


  return (
    <>
   
    <form onSubmit={handleFormSubmit}>
      <div>
        <label  >Usuario:</label>
        <input
          type="text"
          id="nomusu"
          name="nomusu"
          
          onChange={handleChange}
        />
      </div>
      <div>
        <label >Apellido y nombre:</label>
        <input type="text"
          id="apellynomb"
          name="apellynomb"
          
          onChange={handleChange}
        />
      </div>
      {/* <div>
        <label  >ROL:</label>
        <input type="text"
          id="rol"
          name="rol"
          
          onChange={handleChange}
        /> 
 
      </div> */}
      {/* <div>
          <label>Rol</label>
          <label>Consulta</label>
          <input
            type="radio"
            name="rol"
            value="consulta"
            // checked={selectedValue === 'consulta'}
            onChange={handleChange}
            checked={selectedOption === 'option1'}
          />
          
          <label>Administrador</label>
          <input
            type="radio"
            name="rol"
            value="admin"
            
            // checked={selectedValue === 'admin'}
            onChange={handleChange}
          />
      </div> */}

 
      <div>
        <label >Correo electronico:</label>
        <input type="email"
          id="email"
          name="email"
          
          onChange={handleChange}
        />
      </div>
      <div>
        <label  >Direccion:</label>
        <input type="text"
          id="direccion"
          name="direccion"
          
          onChange={handleChange}
        />

      </div>
      <div>
        <label  >ciudad:</label>
        <input type="text"
          id="ciudad"
          name="ciudad"
          
          onChange={handleChange}
        />
      </div>
      <div>
        <label  >CP:</label>
        <input type="text"
          id="cp"
          name="cp"
          
          onChange={handleChange}
        />
      </div>
      {/* <div>
        <label  >Provincia:</label>
        <input type="text"
          id="idprovincia"
          name="idprovincia"
          
          onChange={handleChange}
        />
      </div> */}
      <div>
        <label htmlFor="provincia">Provincia:</label>
        <select id="idprovincia" name="idprovincia" value={provinciaSeleccionada} onChange={handleChange}>
          <option value="">Seleccionar provincia</option>
          {provincias.map(provincia => (
            <option key={provincia.id} value={provincia.id}>
              {provincia.descripcion}
            </option>
          ))}
        </select>
      </div>      
      <div>
        <label >Contraseña:</label>
        <input type="password"
          id="password"
          name="password"
          
          onChange={handleChange}
        />
      </div>
      <button type="submit">Guardar</button>
    </form>
  
    </>
  );
};


export default Fusuario;
