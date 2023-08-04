 
const path = require('path');
const Productos = require('../models').Productos;
const Categorias = require('../models').Categorias;
 
 



 
const {body,validationResult}= require('express-validator');

const { parse } = require('querystring');


// Función para crear un producto en la base de datos
const addProducto = async (req, res) => {
  const { titulo, desc_reducida, comentario, fec_emision, idcategoria, cant_stock, preuni, estado } = req.body;
  try {
    // Validar que todos los campos necesarios estén presentes
    if (!titulo || !desc_reducida || !comentario || !fec_emision || !idcategoria || !cant_stock || !preuni) {
      return res.status(400).json({ mensaje: 'Faltan campos requeridos.' });
    }
  
    // Verificar que se haya subido una imagen
    if (!req.file) {
      return res.status(400).json({ mensaje: 'Debes subir una imagen.' });
    }
  
    // titulo: DataTypes.STRING,
    // desc_reducida: DataTypes.STRING,
    // comentario: DataTypes.STRING,
    // fec_emision: DataTypes.DATE,
    // path_imagen: DataTypes.STRING,
    // idcategoria: DataTypes.INTEGER, 
    // cant_stock: DataTypes.INTEGER,
    // cant_stock_res: DataTypes.INTEGER,
    // preuni: DataTypes.DECIMAL,
    // estado: DataTypes.INTEGER
    // Crear el producto en la base de datos

    const nuevoProducto = await Productos.create({
      titulo,
      desc_reducida,
      comentario,
      fec_emision,
      path_imagen: req.file.filename,
      idcategoria,
      cant_stock,
      cant_stock_res: 0,
      preuni,
      estado: estado || 0, // Si no se proporciona el campo 'estado', se establece a 0
    });
  
    
    return res.status(200).json({ mensaje: 'Producto y imagen guardados correctamente.' });
  } catch (error) {
    
    return res.status(500).json({ mensaje: 'Error al crear el producto.' });
  }
};


  const productosRetornarJSON = (req, res) => {
    return  Productos.findAll(
      {
        include: {
          model: Categorias,
          attributes: ['descripcion'],
        },
      }
    )
     .then( Productos => {  

                   if( Productos ) {
                                    res.send( JSON.stringify(Productos))   }
                   else {
                          return res.status(404).json({Mensaje:'No hay productos'})     
                       }
                   })
     .catch( error => {
                        return res.status(405).json({Mensaje:'Error al leer los producto ' + error})  
                       })
   };  




  const editProducto = (req, res,next) => {
    const { image,    titulo,    desc_reducida,    comentario,    fec_emision,
      idcategoria,    cant_stock,    preuni, id } = req.body;
 

 
   if (!titulo || !desc_reducida || !comentario || !fec_emision || !idcategoria || !cant_stock || !preuni) {
     
     return res.status(400).json({ mensaje: 'Faltan campos requeridos.' });
   }
   
    return  Productos.findOne({
                            where: {
                                    id: req.body.id,
                              }
                          })
                          
    .then( Producto => {
                    if(Producto) {
                               
                               return Producto.update({
                                       titulo: titulo,
                                       desc_reducida: desc_reducida,
                                       comentario: comentario,
                                       fec_emision:fec_emision,
                                       idcategoria: idcategoria,
                                       cant_stock : cant_stock,
                                       preuni  :     preuni} 
                                                   
                               ).then( res.status(200).send('Grabacion exitosa.')
                                      )
                              .catch( error => {
                                          return res.status(404).json({error:'ERROR AL GRABAR' + error})
                                          }
                                    )
                               
                  }
                }
                )
          .catch( error => {
                             return res.status(404).json({error:'ERROR AL GRABAR' + error})
                            }
                )
  
  }
  
module.exports = {
    addProducto  ,
    productosRetornarJSON,
    editProducto
  }