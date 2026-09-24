// Importa o módulo DataTypes do Sequelize.
// DataTypes contém os tipos de dados que podem ser usados para definir colunas no banco de dados.
const { DataTypes } = require('sequelize');

// Importa a instância do Sequelize configurada no arquivo de conexão.
// Esse arquivo geralmente contém as credenciais e configurações de acesso ao banco de dados.
const sequelize = require('../config/database');

/**
 * Definição do modelo Technology
 * Este modelo representa a tabela "technologies" no banco de dados.
 * Relação: N : N com Project (uma tecnologia pode estar em vários projetos e um projeto pode ter várias tecnologias).
 */
const Technology = sequelize.define(
  'Technology', // Nome interno do modelo (usado pelo Sequelize)
  {
    // Definição dos campos/colunas da tabela
    id: {
      type: DataTypes.INTEGER,   // Tipo de dado: número inteiro
      primaryKey: true,          // Define como chave primária da tabela
      autoIncrement: true,       // Incrementa automaticamente a cada novo registro
    },
    name: {
      type: DataTypes.STRING,    // Tipo de dado: texto (string)
      allowNull: false,          // Campo obrigatório (não pode ser nulo)
      unique: true,              // Garante que não existam nomes duplicados na tabela
    },
  },
  {
    // Configurações adicionais do modelo
    tableName: 'technologies',   // Nome da tabela no banco de dados
    // Caso não seja definido, o Sequelize criaria automaticamente um nome pluralizado
  }
);

// Exporta o modelo para que possa ser usado em outras partes da aplicação.
// Por exemplo, para criar registros, consultar ou definir relações com outros modelos.
module.exports = Technology;
