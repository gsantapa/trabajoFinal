'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Provincias extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Provincias.hasMany(models.Usuarios, {
        foreignKey: 'idprovincia', // Nombre de la columna de clave foránea en la tabla de productos
      });
    }
  }
  Provincias.init({
    descripcion: DataTypes.STRING,
    estado: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Provincias',
  });
  return Provincias;
};