'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Carrito_Det extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Carrito_Det.belongsTo(models.Carrito_Cab, {
        foreignKey: 'idcarrito', // Nombre de la columna de clave foránea en la tabla de productos
      });
    }
  }
  Carrito_Det.init({
    idcarrito: DataTypes.INTEGER,
    nomusu: DataTypes.STRING,
    idcodprod: DataTypes.INTEGER,    
    cantres: DataTypes.INTEGER,
    preuni: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'Carrito_Det',
  });
  return Carrito_Det;
};