// Importa o framework Express, que facilita a criação de APIs e rotas HTTP
const express = require('express');

// Cria um objeto "router" do Express, que permite organizar rotas em módulos separados
const router = express.Router();

// Importa as funções do controlador de feedback
// Essas funções contêm a lógica de negócio para criar e listar feedbacks
const { createFeedback, listFeedbacksByProject } = require('../controllers/feedback.controller');

// Define a rota POST /api/projects/:id/feedbacks
// Essa rota é usada para criar um novo feedback associado a um projeto específico
// O ":id" é um parâmetro dinâmico da URL que representa o ID do projeto
// Quando o cliente faz uma requisição POST para /api/projects/123/feedbacks,
// a função createFeedback será chamada para salvar o feedback no projeto de ID 123
router.post('/:id/feedbacks', createFeedback);

// Define a rota GET /api/projects/:id/feedbacks
// Essa rota é usada para listar todos os feedbacks de um projeto específico
// O ":id" novamente representa o ID do projeto
// Quando o cliente faz uma requisição GET para /api/projects/123/feedbacks,
// a função listFeedbacksByProject será chamada para retornar todos os feedbacks
// relacionados ao projeto de ID 123
router.get('/:id/feedbacks', listFeedbacksByProject);

// Exporta o router para que possa ser usado em outro arquivo,
// normalmente no arquivo principal da aplicação (app.js ou server.js)
module.exports = router;
