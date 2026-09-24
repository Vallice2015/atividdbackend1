// Importa o framework Express, que facilita a criação de APIs e rotas HTTP
const express = require('express');

// Cria um objeto "router" do Express, que permite definir rotas separadas
// e depois exportá-las para serem usadas na aplicação principal
const router = express.Router();

// Importa funções específicas do controlador de perfil
// Essas funções contêm a lógica de negócio para criar e buscar perfis
const { createProfile, getProfileById } = require('../controllers/profile.controller');

// Define a rota POST /api/profiles
// Essa rota é usada para criar um novo perfil
// Quando o cliente faz uma requisição POST para /api/profiles,
// a função createProfile será chamada
router.post('/', createProfile);

// Define a rota GET /api/profiles/:id
// Essa rota é usada para buscar um perfil específico pelo seu ID
// O ":id" é um parâmetro dinâmico da URL, que será passado para a função getProfileById
router.get('/:id', getProfileById);

// Exporta o router para que possa ser usado em outro arquivo,
// normalmente no arquivo principal da aplicação (app.js ou server.js)
module.exports = router;

//POST → usado para criar novos recursos ou enviar dados para processamento.

//PUT → usado para atualizar ou substituir um recurso existente.

//DELETE → usado para remover um recurso.

//GET → usado apenas para consultar/recuperar informações.