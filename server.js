// Importa a aplicação principal (Express configurado com rotas e middlewares)
const app = require('./src/app');

// Importa o objeto sequelize, que representa a conexão com o banco de dados
const { sequelize } = require('./src/models');

// Define a porta do servidor. Se existir a variável de ambiente PORT, usa ela.
// Caso contrário, usa a porta 3000 como padrão.
const PORT = process.env.PORT || 3000;

// Função assíncrona responsável por iniciar a aplicação
async function start() {
  try {
    // Testa a conexão com o banco de dados
    await sequelize.authenticate();
    console.log('✅🔰🔰 Conexão com o banco de dados estabelecida com sucesso.');

    // Sincroniza os modelos com o banco de dados
    // force: false → mantém os dados já existentes
    // force: true → recria as tabelas do zero (apaga dados)
    await sequelize.sync({ force: false });
    console.log('✅🔰🔰 Modelos sincronizados com o banco de dados (database.sqlite).');

    // Inicia o servidor Express na porta definida
    app.listen(PORT, () => {
      console.log(`✅ Servidor rodando em http://localhost:${PORT}`);
    });
  } catch (error) {
    // Caso ocorra algum erro na conexão ou sincronização
    console.error('❌ Não foi possível iniciar a aplicação:', error);
    process.exit(1); // Encerra o processo com código de erro
  }
}

// Executa a função para iniciar tudo
start();
