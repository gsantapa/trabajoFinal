'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Carrito_Dets', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idcarrito: {
        type: Sequelize.INTEGER
      },
      nomusu: {
        type: Sequelize.STRING
      },
      idcodprod: {
        type: Sequelize.INTEGER
      },
     
      cantres: {
        type: Sequelize.INTEGER
      },
      preuni: {
        type: Sequelize.DECIMAL
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
    await queryInterface.dropTable('Carrito_Dets');
  }
};