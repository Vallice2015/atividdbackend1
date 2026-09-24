const express = require('express');
const routes = require('./routes');

const app = express();

app.use(express.json());

// Log simples de requisições (útil para depuração)
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

// Rota raiz / health check
app.get('/', (req, res) => {
  res.json({
    status: 'ok',
    message: 'API de Perfis, Projetos, Tecnologias e Feedbacks está no ar.',
    endpoints: [
      'POST   /api/profiles',
      'GET    /api/profiles/:id', // Lista todas as tecnologias cadastradas. Retorna um array com os registros./
      'POST   /api/technologies', // ./
      'GET    /api/technologies', // Lista todas as tecnologias cadastradas. Retorna um array com os registros./
      'POST   /api/projects', // Cria um novo projeto. O cliente envia informações como título, descrição, tecnologias usadas, etc., e o servidor salva./
      'GET    /api/projects', // Lista todos os projetos cadastrados. Retorna um array com os registros./
      'GET    /api/projects/:id', // Busca os detalhes de um projeto específico pelo seu id/
      'POST   /api/projects/:id/feedbacks', //  Adiciona um feedback a um projeto específico. O cliente envia autor, mensagem e rating, e o servidor vincula esse feedback ao projeto./
      'GET    /api/projects/:id/feedbacks', // Lista todos os feedbacks de um projeto específico./
    ],
  });
});

// Todas as rotas da API ficam sob o prefixo /api
app.use('/api', routes);

// 404 — rota não encontrada
app.use((req, res) => {
  res.status(404).json({ message: `Rota "${req.method} ${req.originalUrl}" não existe.` });
});

// Tratamento de erros não capturados
app.use((err, req, res, next) => {
  console.error('Erro não tratado:', err);
  res.status(500).json({ message: 'Erro interno do servidor.', error: err.message });
});

module.exports = app;
