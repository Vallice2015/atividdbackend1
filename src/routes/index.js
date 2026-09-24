// Importa o framework Express, que facilita a criação de APIs e rotas HTTP
const express = require('express');

// Cria um objeto "router" do Express, que permite organizar rotas em módulos separados
const router = express.Router();

// Monta o módulo de rotas de perfis no caminho /profiles
// Ou seja, qualquer rota definida dentro de profile.routes.js será acessível a partir de /profiles
router.use('/profiles', require('./profile.routes'));

// Monta o módulo de rotas de tecnologias no caminho /technologies
// Exemplo: GET /technologies, POST /technologies, etc.
router.use('/technologies', require('./technology.routes'));

// Monta o módulo de rotas de projetos no caminho /projects
// Exemplo: GET /projects, POST /projects, etc.
router.use('/projects', require('./project.routes'));

// Monta o módulo de rotas de feedbacks também no caminho /projects
// A diferença é que dentro de feedback.routes.js as rotas são definidas como /:id/feedbacks
// Assim, o resultado final será algo como: /projects/:id/feedbacks
router.use('/projects', require('./feedback.routes'));

// Exporta o router para que possa ser usado no arquivo principal da aplicação
// Normalmente em app.js ou server.js, onde será montado em /api ou outro prefixo
module.exports = router;
