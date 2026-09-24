// Importa o objeto DataTypes do Sequelize, usado para definir os tipos de dados das colunas
const { DataTypes } = require('sequelize');

// Importa a instância do Sequelize configurada no arquivo de conexão com o banco de dados
const sequelize = require('../config/database');

/**
 * Modelo Feedback
 * Relação: N : 1 com Project (cada feedback pertence a um projeto)
 */
const Feedback = sequelize.define(
  // Nome do modelo
  'Feedback',
  {
    // Coluna 'id' será a chave primária, auto-incrementada
    id: {
      type: DataTypes.INTEGER,       // Tipo inteiro
      primaryKey: true,              // Define como chave primária
      autoIncrement: true,           // Incrementa automaticamente
    },
    // Coluna 'author' armazena o nome do autor do feedback
    author: {
      type: DataTypes.STRING,        // Tipo string (texto curto)
      allowNull: false,              // Não pode ser nulo
    },
    // Coluna 'message' armazena o conteúdo do feedback
    message: {
      type: DataTypes.TEXT,          // Tipo texto longo
      allowNull: false,              // Obrigatório
    },
    // Coluna 'rating' armazena uma nota opcional de 1 a 5
    rating: {
      type: DataTypes.INTEGER,       // Tipo inteiro
      allowNull: true,               // Pode ser nulo
      validate: { min: 1, max: 5 },  // Validação: valores entre 1 e 5
    },
    // Coluna 'projectId' faz referência ao projeto ao qual o feedback pertence
    projectId: {
      type: DataTypes.INTEGER,       // Tipo inteiro
      allowNull: false,              // Obrigatório (todo feedback precisa estar ligado a um projeto)
    },
  },
  {
    // Define o nome da tabela no banco de dados
    tableName: 'feedbacks',
  }
);

// Exporta o modelo para ser usado em outras partes da aplicação
module.exports = Feedback;
