'use strict';
const Usuarios = require('../models/usuarios'); // Asegúrate de la ruta correcta al modelo
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const usuariosIniciales = [
        {nomusu:'ADMIN', apellynomb:'ADMIN', rol:'admin', password:'$2b$10$fjOhbyikgdiwnMgm8Wd5b.GsBMFDcy2gkBrCDGrsMQP5E2NPg1RQ.', direccion:'cordoba',
        ciudad:'cordoba', cp:'5000', idprovincia:4, email:'ADMIN@gmail.com', estado:0, createdAt: new Date(), updatedAt: new Date()
       },
      // Puedes seguir agregando más registros aquí
    ];

    await queryInterface.bulkInsert('usuarios', usuariosIniciales, {});

    console.log('Insert inicial de usuarios completado.');
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('usuarios', null, {});
  }
};
