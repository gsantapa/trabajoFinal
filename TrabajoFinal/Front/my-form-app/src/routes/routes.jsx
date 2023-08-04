
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../components/Home';
// import Register from '../components/Register';
import Login from '../components/Login';
import Fusuario from '../components/Fusuario';
import Logout from '../components/Logout';
import Producto from '../components/Producto';
import Detalle_producto from '../components/Detalle_producto';
import Carrito from '../components/Carrito';
// import Cart from '../components/Cart';
function RoutesConfig() {
  return (
    <Routes>
      <Route path="/login" Component={Login} />
      <Route path="/" Component= {Home} />
      <Route path="/AddUser" Component={Fusuario} />
      <Route path="/Logout" Component={Logout} />
      <Route path="/editarproducto" Component={Producto} />
      <Route path="/addProducto" Component={Producto} />
      <Route path="/detalle_producto" Component={ Detalle_producto } />
      <Route path="/carrito" Component={Carrito } />
      {/* <Route path="/register" element={<Register />} /> */}
      
      {/* <Route path="/product" element={<Product />} />
      <Route path="/cart" element={<Cart />} /> */}
    </Routes>
  );
}
export default RoutesConfig;