const path = require('path');
const usersController = require('../controllers/UsersController');
const ProductosController= require('../controllers/ProductosController');
const provinciasController= require('../controllers/ProvinciasController');
const categoriasController= require('../controllers/CategoriasController');
const carritoController = require('../controllers/CarritoController');
const {check}= require('express-validator');
const multer = require('multer');


const storage = multer.diskStorage({
  destination:   path.join(__dirname, '../../src/public/img'),
  filename: function (req, file, cb) {
    // cb(null,  file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    cb(null,  file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});
// const upload= multer({ storage }).single('image');
const upload= multer({ storage });
module.exports = function(app) {

  

  
  app.post('/loginUsuario', usersController.loginUsuario)
  app.post('/addUsuario', usersController.addUsuario)
  app.get('/editUsuario', usersController.editUsuario)
  app.get('/provinciasjson', provinciasController.provinciasRetornarJSON)
  app.get('/categoriasRetornarJSON', categoriasController.categoriasRetornarJSON)
  
  app.post('/addProducto', upload.single('image'),ProductosController.addProducto)
  app.get('/Productos', ProductosController.productosRetornarJSON)
  app.post('/editarProducto', ProductosController.editProducto)


  app.post('/guardarCarrito',carritoController.addCarrito)
   
}