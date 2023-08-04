import React, { useState, useEffect } from 'react';
import {useUserStore} from '../stores/store';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const setUser = useUserStore((state) => state.setUser);
  const user = useUserStore ((state) => state.user)
  const navigate=useNavigate();
  const [error, setError] = useState(null); // Estado para manejar el mensaje de error
  const [formData, setFormData] = useState({
    nomusu: '',
    password: '',
  });

  useEffect(()=>{
    if(!user) return
    navigate('/');
  },[user])

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  
 


  const handleSubmit = (event) => {
    event.preventDefault();
 

    const options = {
        method: 'POST',
        headers: {
          'Accept': 'application/json', 'Content-Type': 'application/json', // Asegúrate de ajustar los encabezados según los requisitos del servidor
        },
        body: JSON.stringify(formData), // Convierte el objeto 'data' a formato JSON
      };    
    fetch('http://localhost:3000/loginUsuario', options,)
    .then(response => {if (response.ok) {
                              return response.json();
                          } else {
                            setError('Correo o Contraseña incorrectos'); // Establece el mensaje de error en caso de inicio de sesión fallido
                            throw new Error('Error en la solicitud');
                            }
                      }
    
    ) // Convertir la respuesta a JSON
    .then(data => {
      console.log(data);
      setUser(data);
 
      
    })
    .catch(error => {
      console.log('Error al realizar la solicitud:', error);
    });
  };

  return (
    <>
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Muestra el mensaje de error si existe */}
    <form onSubmit={handleSubmit}>
      <div>
      <div>
          <h2>INICIAR SESION</h2>
      </div>
      <div class="input">
          <img src="../../public/img/sobre.png" alt="user icon" />
          {/* <label htmlFor="nomusu">Usuario:</label> */}
          <input type="text" id="nomusu" name="nomusu" placeholder="Nombre de Usuario" value={formData.nomusu} onChange={handleChange} />
      </div>
      <div class="input">
          <img src="../../public/img/llave.png" alt="user icon" />
      {/* <label htmlFor="password">Contraseña:</label> */}
        <input type="password" id="password" name="password" placeholder="Ingrese su Contraseña" value={formData.password} onChange={handleChange} />
      </div>
      </div>
      <button type="submit">Enviar</button>
      
    </form>
    </>
  );
};

export default Login;
