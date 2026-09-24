// Importa o objeto DataTypes do Sequelize.
// O DataTypes contém os tipos de dados que podem ser usados para definir colunas no banco de dados (STRING, INTEGER, DATE, etc).
const { DataTypes } = require('sequelize');

// Importa a instância configurada do Sequelize.
// Essa instância já está conectada ao banco de dados e será usada para definir o modelo.
const sequelize = require('../config/database');


/**
 * Definição do modelo Project
 * Esse modelo representa a tabela "projects" no banco de dados.
 * Relações:
 *  - N : 1 com Profile (um projeto pertence a um perfil)
 *  - N : N com Technology (um projeto pode ter várias tecnologias)
 *  - 1 : N com Feedback (um projeto pode ter vários feedbacks)
 */
const Project = sequelize.define(
  'Project', // Nome do modelo (usado internamente pelo Sequelize)
  {
    // Coluna "id" — chave primária da tabela
    id: {
      type: DataTypes.INTEGER,     // Tipo inteiro
      primaryKey: true,            // Define como chave primária
      autoIncrement: true,         // Incrementa automaticamente a cada novo registro
    },

    // Coluna "title" — título do projeto
    title: {
      type: DataTypes.STRING,      // Tipo string (texto curto)
      allowNull: false,            // Campo obrigatório (não pode ser nulo)
    },

    // Coluna "description" — descrição detalhada do projeto
    description: {
      type: DataTypes.TEXT,        // Tipo texto longo (permite descrições maiores)
      allowNull: false,            // Campo obrigatório
    },

    // Coluna "repositoryUrl" — link para o repositório do projeto
    repositoryUrl: {
      type: DataTypes.STRING,      // Tipo string (URL é texto curto)
      allowNull: true,             // Campo opcional (pode ser nulo)
    },

    // Coluna "profileId" — chave estrangeira que referencia o perfil dono do projeto
    profileId: {
      type: DataTypes.INTEGER,     // Tipo inteiro
      allowNull: false,            // Campo obrigatório (todo projeto precisa de um dono)
    },
  },
  {
    // Configurações adicionais do modelo
    tableName: 'projects',         // Define explicitamente o nome da tabela no banco
  }
);

// Exporta o modelo para ser usado em outras partes do sistema (controllers, services, etc).
module.exports = Project;
