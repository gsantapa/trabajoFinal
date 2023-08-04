import React, { useState, useEffect } from 'react';
import { useCartStore } from '../stores/store';
import { useUserStore } from '../stores/store';
import { useNavigate } from 'react-router-dom';
const Carrito = () => {
  const  [graboreg,setGraboReg]= useState(false);
  const carritoItems = useCartStore((state) => state.products);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const increaseQuantity = useCartStore((state) => state.increaseQuantity);
  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);
  //const savePurchase = useCartStore((state) => state.savePurchase);
  const [user, setUser] = useState(useUserStore((state) => state.user));
  const products = useCartStore((state) => state.products); // Retrieve products outside of handlePagar
  const limpiarCart=  useCartStore((state) => state.clearCart);
  const navigate=useNavigate();
  const handlePagar = async (event, user, products) => {
    // Pass products as an argument
    event.preventDefault();
    const total = carritoItems.reduce((total, item) => total + item.preuni * item.quantity, 0);
    //await savePurchase(user, products, total);

    const carrito = {
      nomusu: user.nomusu,
      direccion: user.direccion,
      ciudad: user.ciudad,
      cp: user.cp,
      idprovincia: user.idprovincia,
      email: user.email,
      productos: products.map((prod) => ({
        idcodprod :prod.product,
        titulo: prod.title,
        cantres: prod.quantity,
        preuni: prod.price,
      }))
    }
    console.log('estoy por enviar carrito',carrito)
    try {
      const response = await fetch('http://localhost:3000/guardarCarrito', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(carrito),
      });
      if (response.ok) {
        console.log('Grabo carrito');
        
        //useCartStore.setState({ products: [] })
        limpiarCart()
        setGraboReg(true)
      } else {
        console.error('Error saving purchase data:', response.statusText);
        setGraboReg(false)
      }
    } catch (error) {
      setGraboReg(false)
      console.error('Error saving purchase data:', error);
    }
  


  };

  useEffect(()=>{
    if(!graboreg) return
    navigate('/');
  },[graboreg])
  
  const initCart = useCartStore((state) => state.initCart);
  // Inicializamos el carrito una vez que el componente se monta
  useEffect(() => {
    initCart();
  }, []);

  return (
    <>
      <section className="carrito">
        <div>
          <h2>PRODUCTO/S SELECCIONADO/S</h2>
        </div>
        <div className="producto-seleccionado-header">
          <b>Producto/s</b>
          <b>Cantidad &#8201; &#8201; &#8201; Importe</b>
        </div>

        {carritoItems.map((item, index) => (
          <div key={index} id="productos">
            <div className="producto-seleccionado">
              <div>
                <img className="img-cart" src={`http://localhost:3000/img/` + item.img} alt={item.alt} />
              </div>
              <div>
                <p>{item.title}</p>
              </div>
              <div className="right-producto">
                <div className="contenedor">
                  <div className="buttonsCart">
                    <button
                      className="boton-cart"
                      id="botones-cart"
                      onClick={() => {
                        if (item.quantity > 1) {
                          decreaseQuantity(index);
                        } else {
                          removeFromCart(index);
                        }
                      }}
                    >
                       - 
                    </button>
                    <span className="quantity">{item.quantity}</span>
                    
                    <button
                      className="boton-cart"
                      id="botones-cart"
                      onClick={() => {
                        increaseQuantity(index);
                      }}
                    >
                      +
                    </button> $ {item.price} 
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
        <div >
          <p  >TOTAL: $ {carritoItems.reduce((total, item) => total + item.price * item.quantity, 0)}</p>
          {/* Actualiza el total para sumar los precios totales de cada producto */}
          <div>
          <button   id="botones-cart" onClick={(event) => handlePagar(event, user, products)}>
             PAGAR  
          </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Carrito;

// import React from 'react';
 
// import { useCartStore } from '../stores/store';
// import { useUserStore } from '../stores/store';
// import { useState,useEffect } from 'react';
// const Carrito = () => {
//   const carritoItems = useCartStore((state) => state.products);
//   const removeFromCart = useCartStore((state) => state.removeFromCart);
//   const increaseQuantity = useCartStore((state) => state.increaseQuantity);
//   const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);
//   const savePurchase = useCartStore((state) => state.savePurchase);
//   const [user, setUser] = useState(useUserStore((state) => state.user));
//   const products = useCartStore((state) => state.products); // Retrieve products outside of handlePagar
  
//   const handlePagar = async (event, user, products) => { // Pass products as an argument
//     event.preventDefault();
//     const total = carritoItems.reduce((total, item) => total + item.preuni * item.quantity, 0);
//     await savePurchase(user, products, total);
//   };
//   const initCart = useCartStore((state) => state.initCart);
//   // Inicializamos el carrito una vez que el componente se monta
//   useEffect(() => {
//     initCart();
//   }, []);
//   return (
//     <>

//       <section className="carrito">
//         {carritoItems.map((item, index) => (
//           <div key={index} id="productos">
//             <div>
//                 <h2>PRODUCTO/S SELECCIONADO/S</h2>
//             </div>

//             <div class="producto-seleccionado-header">
//                 <b>Producto/s</b>
//                 <b>Cantidad  &#8201 &#8201 &#8201 Importe</b>
//             </div>
           

//             <div class="producto-seleccionado">
//                 <div>
//                     <img className="img-cart" src={`http://localhost:3000/img/` +  item.img} alt={item.alt} />
//                 </div>
//                 <div>
//                     <p>{item.title}</p>
//                 </div>
//             </div>
//             ))}     
//         <div class="right-producto">
//             <div class="contenedor">
//                 <div className='buttonsCart'>
//                     <button
//                      className="boton-cart"
//                      id="botones-cart"
//                     onClick={() => {
//                                     if (item.quantity > 1) {
//                                         decreaseQuantity(index);
//                                     } else {
//                                         removeFromCart(index);
//                                     }
//                     }}> - </button>
//                   <span className="quantity">{item.quantity}</span>
//                   <button
//                     className="boton-cart"
//                     id="botones-cart"
//                     onClick={() => {
//                     increaseQuantity(index);
//                     }}>
//                   +
//                     </button>
//                 </div>
//             </div>
        
//         </div>
        
        
//         <div className="total">
//           <p className="total-1"> TOTAL:$ {carritoItems.reduce((total, item) => total + item.price * item.quantity, 0)}</p> {/* Actualiza el total para sumar los precios totales de cada producto */}
//           <button className="boton-cart2" id="botones-cart" onClick={(event) => handlePagar(event, user, products)}>
//               PAGAR
//           </button>
//         </div>

//       </section>
      
//     </>
//   );
// };
// export default Carrito;