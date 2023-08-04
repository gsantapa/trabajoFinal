'use strict';
const Categorias = require('../../src/models/categorias'); // Asegúrate de la ruta correcta al modelo
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const categoriasIniciales = [
    {descripcion:'Novedades', estado : 0, createdAt: new Date(), updatedAt: new Date()},
    {descripcion:'Ciencia y Tecnologia', estado : 0, createdAt: new Date(), updatedAt: new Date()},
    {descripcion:'Deporte', estado : 0, createdAt: new Date(), updatedAt: new Date()},
    {descripcion:'Fauna y Flora', estado : 0, createdAt: new Date(), updatedAt: new Date()},
    {descripcion:'Transporte', estado : 0, createdAt: new Date(), updatedAt: new Date()},
    {descripcion:'Historia', estado : 0, createdAt: new Date(), updatedAt: new Date()},
    {descripcion:'Paisaje', estado : 0, createdAt: new Date(), updatedAt: new Date()},
    {descripcion:'Religion', estado : 0, createdAt: new Date(), updatedAt: new Date()},
    {descripcion:'varios', estado : 0, createdAt: new Date(), updatedAt: new Date()},
      // Puedes seguir agregando más registros aquí
    ];

    await queryInterface.bulkInsert('categorias', categoriasIniciales, {});

    console.log('Insert inicial de categorias completado.');
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('categorias', null, {});
  }
};
