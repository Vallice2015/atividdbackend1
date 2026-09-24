// Importa o módulo 'express' para criar rotas e gerenciar requisições HTTP
const express = require('express');

// Cria um objeto 'router' que permite definir rotas separadas do app principal
const router = express.Router();

// Importa as funções do controller de projetos
// Essas funções contêm a lógica de cada operação (criar, listar, buscar por ID)
const { createProject, listProjects, getProjectById } = require('../controllers/project.controller');

// Define a rota POST /api/projects
// Essa rota é usada para criar um novo projeto
router.post('/', createProject);

// Define a rota GET /api/projects 
// Essa rota é usada para listar todos os projetos cadastrados
router.get('/', listProjects);

// Define a rota GET /api/projects/:id http://localhost:3000/api/projects/1
// Essa rota é usada para buscar um projeto específico pelo seu ID
// O ":id" é um parâmetro dinâmico que será substituído pelo valor enviado na URL
router.get('/:id', getProjectById);

// Exporta o router para que possa ser usado no arquivo principal da aplicação (app.js ou server.js)
// Assim, todas essas rotas ficam disponíveis quando o servidor é iniciado
module.exports = router;
