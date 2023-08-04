const path = require('path');

const Users = require('../models').Usuarios;
const {body,validationResult}= require('express-validator');

const { parse } = require('querystring');
const  hash = require('../services/hashBcrypt')
 
//nuevo
const editUsuario = (req, res,next) => {
    
  return  Users.findOne({
                          where: {
                                  nomusu: req.body.nomusu,
                            }
                        })
                        
  .then( user => {
                  if(user) {
                             
                             return user.update({
                                                  apellynomb: req.body.apellynomb,
                                                  rol: req.body.rol,
                                                  password: hash.hashPassword(req.body.password),
                                                  direccion: req.body.direccion,
                                                  ciudad: req.body.ciudad,
                                                  cp: req.body.cp,
                                                  idprovincia: req.body.idprovincia,
                                                  email: req.body.email,
                                                  estado: 0
                                                 }
                                                 
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


const  loginUsuario = (req, res,next) => {
 
  return  Users.findOne({
                          where: {
                                  nomusu: req.body.nomusu,
                                  }
                          //         ,
                          // attributes: {
                          //           exclude: ['password'] // Excluimos la propiedad "password" del resultado
                          //         }
                        })
  .then( user => {
              if( user ) 
              {
                if(hash.comparePassword(req.body.password,user.password  ))
                {
                  const userresultado = {
                    nomusu: user.nomusu,
                    apellynomb: user.apellynomb,
                    rol: user.rol,
                    direccion: user.direccion,
                    ciudad: user.ciudad,
                    cp: user.cp,
                    idprovincia: user.idprovincia,
                    email: user.email,
                    estado: user.estado
                  };
                 const userJson =JSON.stringify(userresultado);   
                 
                 res.send(userJson)
                }
                else
                {
                 return res.status(401).json({Mensaje:'ERROR, Usuario o Contraseña informada es correcta o no encontrado'})
                }
              }
              else
              {
                
                return res.status(404).json({Mensaje:'ERROR, Usuario o Contraseña informada es correcta o no encontrado'})
              
          
              }
              }
)
.catch( error => {
    return res.status(405).json({Mensaje:'ERROR ' + error })
  }
)
}

const addUsuario = (req, res,next) => {
  
  // const errors = validationResult(req);
  // if (!errors.isEmpty()){
  //   const err={}
  //   err.status = 422
  //   err.messages = errors.array()

  //   return next(err);
  //   // res.status(400).json({errors:errors.array()});
  //   }

  
  //const usr = req.body;
  return  Users.findOne({where: {nomusu: req.body.nomusu,}
                        })
  .then( user => {
                  if( user ) {
                    
                    // const err = {}
                    // err.status = 409
                    // err.messages = [ { msg: "El usuario ya existe en la base de datos. " } ]
                    // return res.send( JSON.stringify(err));
                    return res.status(409).json({Mensaje:'ERROR, ya existe en la base de datos.'});
                    
                    // return res.status(409).json({
                    //   error: true,
                    //   message: 'El usuario ya existe en la base de datos.',
                      
                    // })
                    
            
                  } else {
                          return Users.create({ nomusu: req.body.nomusu,
                                                apellynomb: req.body.apellynomb,
                                                rol: req.body.rol,
                                                password: hash.hashPassword(req.body.password),
                                                direccion: req.body.direccion,
                                                ciudad: req.body.ciudad,
                                                cp: req.body.cp,
                                                idprovincia: req.body.idprovincia,
                                                email: req.body.email,
                                                estado: 0
                                              }
                                            ).then( result=> {
                                                              
                                                              return res.status(200).json({Mensaje:'Se grabo correctamente el usuario.'});
                                                              }
                                                  )
                                             .catch( error => {return res.status(404).json({Mensaje:'Error al grabar.' + error})
                                                              }
                                                    )
                          }
                        }
  )
        .catch( error => {return res.status(404).json({Mensaje:'Error al grabar.' + error})
                         }
              )
}










module.exports = {
  
  loginUsuario,
  editUsuario ,
  addUsuario 
}


