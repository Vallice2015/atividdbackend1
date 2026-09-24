// Importa o framework Express
const express = require('express');

// Cria um objeto "router" para definir rotas separadas
const router = express.Router();

// Importa funções do controller (responsáveis pela lógica)
const { createTechnology, listTechnologies } = require('../controllers/technology.controller');

// Rota POST /api/technologies → cria uma nova tecnologia
router.post('/', createTechnology);

// Rota GET /api/technologies → lista todas as tecnologias
router.get('/', listTechnologies);

// Exporta o router para ser usado no app principal
module.exports = router;
