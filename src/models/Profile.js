// Importa o objeto DataTypes do Sequelize, que contém os tipos de dados
// usados para definir os campos da tabela (STRING, INTEGER, TEXT, etc.)
const { DataTypes } = require('sequelize');

// Importa a instância configurada do Sequelize, que conecta ao banco de dados
const sequelize = require('../config/database');

/**
 * Definição do modelo Profile
 * Relação: 1 : N com Project (um perfil pode ter vários projetos)
 */
const Profile = sequelize.define(
  'Profile', // Nome do modelo (usado internamente pelo Sequelize)
  {
    // Campo 'id' será a chave primária da tabela
    id: {
      type: DataTypes.INTEGER,   // Tipo numérico inteiro
      primaryKey: true,          // Define como chave primária
      autoIncrement: true,       // Incrementa automaticamente a cada novo registro
    },
    // Campo 'name' armazena o nome do perfil
    name: {
      type: DataTypes.STRING,    // Tipo string (texto curto)
      allowNull: false,          // Não pode ser nulo (obrigatório)
    },
    // Campo 'email' armazena o e-mail do perfil
    email: {
      type: DataTypes.STRING,    // Tipo string
      allowNull: false,          // Obrigatório
      unique: true,              // Não pode haver dois perfis com o mesmo e-mail
      validate: { isEmail: true } // Validação automática para garantir formato de e-mail
    },
    // Campo 'bio' armazena uma descrição ou biografia do perfil
    bio: {
      type: DataTypes.TEXT,      // Tipo texto longo
      allowNull: true,           // Pode ser nulo (opcional)
    },
    // Campo 'avatarUrl' armazena o link para a imagem/avatar do perfil
    avatarUrl: {
      type: DataTypes.STRING,    // Tipo string (URL)
      allowNull: true,           // Opcional
    },
  },
  {
    // Configuração extra do modelo
    tableName: 'profiles',       // Nome da tabela no banco de dados
    // Outras opções poderiam ser adicionadas aqui, como timestamps: true
  }
);

// Exporta o modelo para ser usado em outras partes da aplicação
module.exports = Profile;
