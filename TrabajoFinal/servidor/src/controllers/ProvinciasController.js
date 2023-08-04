 const Provincias = require('../models').Provincias;


const provinciasRetornarJSON = (req, res,next) => {
    
    return  Provincias.findAll(      
                             {
                                attributes: ['id', 'descripcion'],
                 }
)
     .then( Provincias => {  
      // JSON.stringify(
        //JSON.parse(
                   if( Provincias ) {                   
                                      const ProvinciasresJson =JSON.stringify(Provincias);   
                                      res.send(ProvinciasresJson)   }
                   else {
                         return res.status(404).json({Mensaje:'No existen provincias'})
                       }
                   })
     .catch( error => {
                return res.status(404).json({Mensaje:'Error al leer provincias' + error})
                       })
   }  

module.exports = {
    provinciasRetornarJSON
  }