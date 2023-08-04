import Card from  "./Card";
import Button from "./button";
import React, { useState,useEffect  } from 'react';
import {useUserStore,useCartStore} from '../stores/store';

import { useNavigate  } from 'react-router-dom';
  

import '../../public/css/styleCardyProductos.css'
const CardProducto = ({titulo,idcategoria,categoriaDescripcion, img, preuni, comentario,nombrebutton,prod}) =>{
    
  
  // const cartItems = useCartStore((state) => state.products);
    // const removeFromCart = useCartStore((state) => state.removeFromCart);
    // const increaseQuantity = useCartStore((state) => state.increaseQuantity);
    // const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);
    // const savePurchase = useCartStore((state) => state.savePurchase);    
  
    const user = useUserStore((state) => state.user) 
    const nomusu = user ? user.nomusu : null;
    const navigate = useNavigate();
    const addToCart = useCartStore((state) => state.addToCart);
    // const products = useCartStore((state) => state.products); 
    
    // const initCart = useCartStore((state) => state.initCart);
    // // Inicializamos el carrito una vez que el componente se monta
    // useEffect(() => {
    //   initCart();
    // }, []);

    // const handlePagar = async (event, user, products) => { // Pass products as an argument
    //   event.preventDefault();
    //   const total = cartItems.reduce((total, item) => total + item.preuni * item.quantity, 0);
    //   await savePurchase(user, products, total);
    // };

    const handleVerProducto = (prod) => {
 
        navigate('/editarproducto', { state: { prod: prod } });
           
      };
      const  handleCompras = ( prod) => {
         
        // navigate('/editarproducto', { state: { prod: prod } });
        navigate('/detalle_producto', { state: { prod: prod } });
      };

    return(
        <>
        <Card orientacion="vertical">
            <h2 className="nombreProducto"> {titulo}</h2>
            <p className="categoriaProducto"> {categoriaDescripcion} </p>
            {/* <p className="categoriaProducto">{idcategoria}   </p> */}
            <img src={`http://localhost:3000/img/${img}`} 
                style={{
                    width: '15rem', // Set the desired width with 'px' unit
                    height: 'auto' // Let the height adjust automatically
                }}
              alt="" className="imgProducto"/>
            <p className="precioProducto"> {preuni}</p>
            <p className="descripcionProducto"> {comentario}</p>
            {user ? (
                      user.rol === "admin" ? (
                                              <Button nombre ={nombrebutton}  onClick={() => handleVerProducto(prod)}/>
                      ): <Button nombre ="Comprar"  onClick={() => {addToCart(prod, nomusu);
                                                                    alert('Se selecciono la estampilla.');}}/> 
                      // ÇonClick={() => handleCompras(prod)}
                      ) : null // Si "user" no está definido, no se muestra el enlace
                      }
        </Card>
       
        </>

    );
}

export default CardProducto
