import React,  { useState, useEffect }from 'react';
import {useUserStore} from '../stores/store';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom'

const Detalle_producto = () => {
    const location = useLocation();
    const prod = location.state?.prod;
    console.log(prod)
    
 
    return (
        <>
        <div>
            <br />
            
            <h2>{prod.id} {prod.titulo}</h2>
        </div>
        <div class="contenedor-producto-solo">
            <div class="contenedor-header-solo">
            <div>
                <img src={`http://localhost:3000/img/` +  prod.path_imagen}   />
            </div>
            <div class="contenedor-detalle-producto-solo">
                <div>
                <p>{prod.comentario}
                </p>
                <br/><br/>

                <p class="p-Importante">{prod.fec_emision} </p>
                </div>
            </div>
            </div>
            <div class="contenedor-carrito-producto">
            <div class="contenedor-carrito-header">
                <input type="number" min="0" placeholder="Cantidad:" />
                <p> $ {prod.preuni}</p>
            </div>
            <div class="producto-seleccionado">
                <button class="eliminarbtn-seleccionado" ><img src="./img/cart.png" alt="x" />Agregar al Carro</button>
                <button class="eliminarbtn-seleccionado" ><img src="./img/next.png" alt="x" />Seguir Comprando</button>
            </div>
        </div>
    </div>
    </>
  );
};


export default Detalle_producto;