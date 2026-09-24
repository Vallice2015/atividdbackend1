/**
 * Instância única (singleton) do Sequelize.
 * Todos os modelos importam este mesmo arquivo para compartilhar a mesma conexão.
 */
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: process.env.DB_STORAGE || './database.sqlite',
  logging: false, // troque para console.log se quiser ver as queries SQL geradas
});

module.exports = sequelize;
