
const path = require('path');

const carrito_cab = require('../models').Carrito_Cab;

const carrito_det = require('../models').Carrito_Det;
const {body,validationResult}= require('express-validator');

const { parse } = require('querystring');
const  hash = require('../services/hashBcrypt')


const addCarrito = async (req, res,next) => {
    const {nomusu,direccion,ciudad,cp,idprovincia,
          email,productos} = req.body;
    
    // const carrito = {
    //     nomusu: userData.nomusu,
    //     direccion: userData.direccion,
    //     ciudad: userData.ciudad,
    //     cp: userData.cp,
    //     idprovincia: userData.idprovincia,
    //     email: userData.email,
    //     productos: products.map((product) => ({
    //       titulo: product.title,
    //       cantres: product.quantity,
    //       preuni: product.price,
    //     }))
    //   };
  

    try {
      // Paso 1: Crear el registro en carrito_cab
      const carritoCab = await carrito_cab.create({ nomusu: nomusu,
                                                    direccion:direccion,
                                                    ciudad: ciudad,
                                                    cp:cp,
                                                    idprovincia:idprovincia,
                                                    idformaenv:0,
                                                    estado :0
                                                });
    //   nomusu: DataTypes.STRING,
    // fecped: DataTypes.DATE,
    // direccion: DataTypes.STRING,
    // ciudad: DataTypes.STRING,
    // cp: DataTypes.STRING,
    // idprovincia: DataTypes.INTEGER,
    // idformaenv: DataTypes.INTEGER,
    // estado: DataTypes.INTEGER

      // Paso 2: Obtener el idcarrito generado
      const idcarrito = carritoCab.id;
    //   idcarrito: DataTypes.INTEGER,
    // nomusu: DataTypes.STRING,
    // idcodprod: DataTypes.INTEGER,
   
    // cantres: DataTypes.INTEGER,
    // preuni: DataTypes.DECIMAL

      // Paso 3: Crear los registros en carritodet
      const carritoDetPromises = productos.map(({ idcodprod,cantres, preuni }) =>
        carrito_det.create({ idcarrito,nomusu, idcodprod, cantres, preuni })
      );
  
      await Promise.all(carritoDetPromises);
  
      // Enviar una respuesta al cliente si todo ha ido bien
      res.status(200).json({ message: 'Carrito guardado correctamente.' });
    } catch (err) {
      console.error('Error al guardar el carrito:', err);
      res.status(500).json({ error: 'Error al guardar el carrito.' });
    }
  };
  
  
  
  module.exports = {
      
      addCarrito  ,
      
    }
