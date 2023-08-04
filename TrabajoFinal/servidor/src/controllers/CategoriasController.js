const Categorias = require('../models').Categorias;


const categoriasRetornarJSON = (req, res,next) => {
    
    return  Categorias.findAll(      
                             {
                                attributes: ['id', 'descripcion'],
                 }
)
     .then( Categorias => {  
      // JSON.stringify(
        //JSON.parse(
                   if( Categorias ) {
                    
                                      const categoriasresjson =JSON.stringify(Categorias);   
                                      res.send(categoriasresjson)   }
                   else {
                         return res.status(404).json({Mensaje:'No existen Categorias'})
                       }
                   })
     .catch( error => {
                return res.status(404).json({Mensaje:'Error al leer las categorias' + error})
                       })
   }  

module.exports = {
    categoriasRetornarJSON
  }