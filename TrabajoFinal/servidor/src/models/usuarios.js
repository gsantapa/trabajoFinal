'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Usuarios extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Usuarios.belongsTo(models.Provincias, {
        foreignKey: 'idprovincia', // Nombre de la columna de clave foránea en la tabla de productos
      });
    }
  }
  Usuarios.init({
    nomusu: DataTypes.STRING,
    apellynomb: DataTypes.STRING,
    rol: DataTypes.STRING,
    password: DataTypes.STRING,
    direccion: DataTypes.STRING,
    ciudad: DataTypes.STRING,
    cp: DataTypes.STRING,
    idprovincia: DataTypes.INTEGER,
    email: DataTypes.STRING,
    estado: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Usuarios',
  });
  return Usuarios;
};