'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Carrito_Cab extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Carrito_Cab.hasMany(models.Carrito_Det, {
        foreignKey: 'idcarrito', // Nombre de la columna de clave foránea en la tabla de productos
      });
    }
  }
  Carrito_Cab.init({
    nomusu: DataTypes.STRING,
    
    fecped: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.fn('NOW'),
    },    
    direccion: DataTypes.STRING,
    ciudad: DataTypes.STRING,
    cp: DataTypes.STRING,
    idprovincia: DataTypes.INTEGER,
    idformaenv: DataTypes.INTEGER,
    estado: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Carrito_Cab',
  });
  return Carrito_Cab;
};