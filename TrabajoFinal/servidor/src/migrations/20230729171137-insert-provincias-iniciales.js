'use strict';

const Provincias = require('../../src/models/provincias'); // Asegúrate de la ruta correcta al modelo

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const provinciasIniciales = [
      {descripcion:'Ciudad Autónoma de Buenos Aires', estado : 0, createdAt: new Date(), updatedAt: new Date()},
      {descripcion:'Buenos Aires', estado : 0, createdAt: new Date(), updatedAt: new Date()},
      {descripcion:'Catamara', estado : 0, createdAt: new Date(), updatedAt: new Date()},
      {descripcion:'Córdoba', estado : 0, createdAt: new Date(), updatedAt: new Date()},
      {descripcion:'Corrientes', estado : 0, createdAt: new Date(), updatedAt: new Date()},
      {descripcion:'Entre Ríos', estado : 0, createdAt: new Date(), updatedAt: new Date()},
      {descripcion:'Jujuy', estado : 0, createdAt: new Date(), updatedAt: new Date()},
      {descripcion:'Mendoza', estado : 0, createdAt: new Date(), updatedAt: new Date()},
      {descripcion:'La Rioja', estado : 0, createdAt: new Date(), updatedAt: new Date()},
      {descripcion:'Salta', estado : 0, createdAt: new Date(), updatedAt: new Date()},
      {descripcion:'San Juan', estado : 0, createdAt: new Date(), updatedAt: new Date()},
      {descripcion:'San Luis', estado : 0, createdAt: new Date(), updatedAt: new Date()},
      {descripcion:'Santa Fe', estado : 0, createdAt: new Date(), updatedAt: new Date()},
      {descripcion:'Santiago del Estero', estado : 0, createdAt: new Date(), updatedAt: new Date()},
      {descripcion:'Tucumán', estado : 0, createdAt: new Date(), updatedAt: new Date()},
      {descripcion:'Chaco', estado : 0, createdAt: new Date(), updatedAt: new Date()},
      {descripcion:'Chubut', estado : 0, createdAt: new Date(), updatedAt: new Date()},
      {descripcion:'Formosa', estado : 0, createdAt: new Date(), updatedAt: new Date()},
      {descripcion:'Misiones', estado : 0, createdAt: new Date(), updatedAt: new Date()},
      {descripcion:'Neuquén', estado : 0, createdAt: new Date(), updatedAt: new Date()},
      {descripcion:'La Pampa', estado : 0, createdAt: new Date(), updatedAt: new Date()},
      {descripcion:'Río Negro', estado : 0, createdAt: new Date(), updatedAt: new Date()},
      {descripcion:'Santa Cruz', estado : 0, createdAt: new Date(), updatedAt: new Date()},
      {descripcion:'Tierra del Fuego', estado : 0, createdAt: new Date(), updatedAt: new Date()},
      
      
      // Puedes seguir agregando más registros aquí
    ];

    await queryInterface.bulkInsert('provincias', provinciasIniciales, {});

    console.log('Insert inicial de provincias completado.');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('provincias', null, {});
  }
};
