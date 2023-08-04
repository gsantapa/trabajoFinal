'use strict';
 
const {
  Model
} = require('sequelize');
  //  const Categorias = require('./Categorias');
module.exports = (sequelize, DataTypes) => {
  class Productos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Productos.belongsTo(models.Categorias, {
        foreignKey: 'idcategoria', // Nombre de la columna de clave foránea en la tabla de productos
      });
    }
  }
  Productos.init({
    titulo: DataTypes.STRING,
    desc_reducida: DataTypes.STRING,
    comentario: DataTypes.STRING,
    fec_emision: DataTypes.DATE,
    path_imagen: DataTypes.STRING,
    idcategoria: DataTypes.INTEGER, 
    cant_stock: DataTypes.INTEGER,
    cant_stock_res: DataTypes.INTEGER,
    preuni: DataTypes.DECIMAL,
    estado: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Productos',
  });
  // Productos.belongsTo(Categorias, {
  //   foreignKey: 'idcategoria', // Nombre de la columna de clave foránea en la tabla de productos
  // });

   

  return Productos;
};