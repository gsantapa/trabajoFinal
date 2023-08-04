// Header.js
import React from 'react';
import {useUserStore} from '../stores/store';
import '../../public/css/styleHeader.css'
import { Link, NavLink } from 'react-router-dom';


const Header = () => {

  const user = useUserStore((state) => state.user)

 

  return (

    <header>    
      <div className="contenedor">
        <div>
            <img src="../../public/img/Filatelia.png" alt="logo" class="logo" />
        </div>

        <div>
             
          <div>
            <label>{user ? user.apellynomb:''}</label>
          </div> 
          <nav>
              <ul>
                <li><NavLink to="/" >Home</NavLink></li>
                {user ? (
                      user.rol !== "admin" ? (
                        <li>
                          <NavLink  to="/carrito">Carrito</NavLink>
                        </li>
                      ) : null // Si el rol no es "admin", no se muestra el enlace
                    ) : null // Si "user" no está definido, no se muestra el enlace
                    }              
              
                {user ? (
         
                          <li><NavLink to="/Logout" >Cerrar Sesión</NavLink></li>
                        ) : (
        // If the "user" state is empty, show the "Iniciar Sesión" option
                          <li><NavLink to="/Login" >Iniciar Sesión</NavLink></li>
                        )}
                <li style={{ // Prestar atención a las doble llaves.
                             display: !user?  'block':'none' 
                           }}><NavLink to="/AddUser"  >Registrarte</NavLink></li>
                 {user ? (
                      user.rol === "admin" ? (
                        <li>
                          <NavLink to="/addProducto">Nuevo Producto</NavLink>
                        </li>
                      ) : null // Si el rol no es "admin", no se muestra el enlace
                    ) : null // Si "user" no está definido, no se muestra el enlace
                    }

                

              </ul>
          </nav>
        </div>
        {/* <div class="botonera">
          <button class="button">
            <a href="/addUserView">Nuevo Usuario</a>
          </button>
          <button class="button"><a href="/login1">Ingresa</a></button>
          <button class="button"><a href="/addProductoView">Productos</a></button> 
        </div> */}
        <div className="iconoNav">
          <img
            src="https://cdn-icons-png.flaticon.com/512/2989/2989870.png"
            alt="icono nav"
          />
        </div>
      </div>
      <div className="caja">
        <div className="box">
          <img src="../../public/img/banner.png" alt="Banner" />
        </div>
      </div>  
    </header>



  );
};

export default Header;
