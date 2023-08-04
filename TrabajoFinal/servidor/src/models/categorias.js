'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Categorias extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Categorias.hasMany(models.Productos, {
        foreignKey: 'idcategoria', // Nombre de la columna de clave foránea en la tabla de productos
      });
    }
  }
  Categorias.init({
    descripcion: DataTypes.STRING,
    estado: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Categorias',
  });
  return Categorias;
};