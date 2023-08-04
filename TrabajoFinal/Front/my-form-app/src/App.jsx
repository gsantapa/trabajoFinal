import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import RoutesConfig from './routes/routes';
import Header from './components/Header'
import Footer from './components/Footer'
function App() {
  return (
    <BrowserRouter>
      <Header  />  
      <RoutesConfig />
      <Footer />
    </BrowserRouter>
  );
}
export default App;
// import { useState } from 'react'
// // import Form from './components/Form';
// import Fusuario from './components/Fusuario';
// import Login from './components/Login';
// // import LoginN from './components/LoginN';
// // import reactLogo from './assets/react.svg'
// // import Header from './components/Header' ;
// // import Footer from './components/Footer' ;
// import {BrowserRouter as Router,Route } from 'react-router-dom';
// import './App.css'

// function App() {
  

//   return (
//     <>
//       <Login/>
//     {/* <Router>
      
//       <Route path="/Login" component={Login} />
//       <Route path="/addUser" component={Fusuario} />
    
//     </Router> */}

    

      
//     </>
//   )
// }

// export default App
