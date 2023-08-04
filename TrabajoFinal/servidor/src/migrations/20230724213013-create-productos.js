'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Productos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      titulo: {
        type: Sequelize.STRING
      },
      desc_reducida: {
        type: Sequelize.STRING
      },
      comentario: {
        type: Sequelize.STRING
      },
      fec_emision: {
        type: Sequelize.DATE
      },
      path_imagen: {
        type: Sequelize.STRING
      },
      idcategoria: { 
        type: Sequelize.INTEGER
      }, 
      cant_stock: {
        type: Sequelize.INTEGER
      },
      cant_stock_res: {
        type: Sequelize.INTEGER
      },
      preuni: {
        type: Sequelize.DECIMAL
      },
      estado: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Productos');
  }
};