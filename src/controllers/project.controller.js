// Importa o operador "Op" do Sequelize.
// Esse operador é usado para consultas mais avançadas, como IN, LIKE, BETWEEN, etc.
const { Op } = require('sequelize');

// Importa os modelos definidos no projeto.
// Cada modelo representa uma tabela no banco de dados e suas relações.
const { Profile, Project, Technology, Feedback } = require('../models');

// Importa a função de validação do DTO (Data Transfer Object).
// Essa função garante que os dados enviados pelo cliente estejam no formato correto.
const { validateCreateProjectDTO } = require('../dtos/project.dto');


// ===============================
// POST /api/projects — Cadastro de projeto
// ===============================
async function createProject(req, res) {
  try {
    // 1. Valida os dados recebidos no corpo da requisição.
    const errors = validateCreateProjectDTO(req.body);
    if (errors.length > 0) {
      // Se houver erros, retorna status 400 (Bad Request) com a lista de erros.
      return res.status(400).json({ message: 'Erro de validação.', errors });
    }

    // 2. Extrai os campos enviados pelo cliente.
    const { title, description, profileId, repositoryUrl, technologyIds } = req.body;

    // 3. Verifica se o perfil dono do projeto existe (relação 1:N).
    const profile = await Profile.findByPk(profileId);
    if (!profile) {
      // Se não existir, retorna erro 404 (Not Found).
      return res.status(404).json({ message: `Perfil com id ${profileId} não encontrado.` });
    }

    // 4. Se foram enviadas tecnologias, verifica se todas existem no banco.
    let technologies = [];
    if (Array.isArray(technologyIds) && technologyIds.length > 0) {
      // Busca todas as tecnologias cujos IDs estão na lista.
      technologies = await Technology.findAll({ where: { id: { [Op.in]: technologyIds } } });

      // Se a quantidade encontrada for diferente da enviada, significa que faltam IDs.
      if (technologies.length !== technologyIds.length) {
        const foundIds = technologies.map((t) => t.id); // IDs encontrados
        const missing = technologyIds.filter((id) => !foundIds.includes(Number(id))); // IDs faltantes
        return res.status(404).json({ message: `Tecnologia(s) não encontrada(s): ${missing.join(', ')}` });
      }
    }

    // 5. Cria o projeto no banco de dados.
    const project = await Project.create({
      title: title.trim(), // remove espaços extras
      description: description.trim(),
      repositoryUrl: repositoryUrl ? repositoryUrl.trim() : null, // se não enviado, fica null
      profileId: Number(profileId), // garante que seja número
    });

    // 6. Associa as tecnologias ao projeto (relação N:N).
    if (technologies.length > 0) {
      await project.setTechnologies(technologies);
    }

    // 7. Busca o projeto recém-criado já com os relacionamentos.
    const created = await Project.findByPk(project.id, {
      include: [
        { model: Profile, as: 'profile' }, // inclui dados do perfil dono
        { model: Technology, as: 'technologies', through: { attributes: [] } }, // inclui tecnologias associadas
        { model: Feedback, as: 'feedbacks' }, // inclui feedbacks
      ],
    });

    // 8. Retorna o projeto criado com status 201 (Created).
    return res.status(201).json(created);
  } catch (error) {
    // Captura qualquer erro inesperado.
    console.error(error);
    return res.status(500).json({ message: 'Erro interno ao cadastrar projeto.', error: error.message });
  }
}


// ===============================
// GET /api/projects — Listagem de projetos
// ===============================
async function listProjects(req, res) {
  try {
    // 1. Busca todos os projetos com seus relacionamentos.
    const projects = await Project.findAll({
      include: [
        { model: Profile, as: 'profile', attributes: ['id', 'name', 'email'] }, // inclui dados básicos do perfil
        { model: Technology, as: 'technologies', through: { attributes: [] } }, // inclui tecnologias associadas
        { model: Feedback, as: 'feedbacks' }, // inclui feedbacks
      ],
      order: [['id', 'ASC']], // ordena os projetos pelo ID em ordem crescente
    });

    // 2. Retorna a lista de projetos.
    return res.status(200).json(projects);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro interno ao listar projetos.', error: error.message });
  }
}


// ===============================
// GET /api/projects/:id — Buscar projeto por ID
// ===============================
async function getProjectById(req, res) {
  try {
    const { id } = req.params; // pega o parâmetro da URL

    // 1. Valida se o ID é um número inteiro.
    if (!Number.isInteger(Number(id))) {
      return res.status(400).json({ message: 'O parâmetro "id" deve ser um número inteiro.' });
    }

    // 2. Busca o projeto pelo ID, incluindo os relacionamentos.
    const project = await Project.findByPk(id, {
      include: [
        { model: Profile, as: 'profile' }, // inclui perfil dono
        { model: Technology, as: 'technologies', through: { attributes: [] } }, // inclui tecnologias
        { model: Feedback, as: 'feedbacks' }, // inclui feedbacks
      ],
    });

    // 3. Se não encontrar, retorna erro 404.
    if (!project) {
      return res.status(404).json({ message: `Projeto com id ${id} não encontrado.` });
    }

    // 4. Retorna o projeto encontrado.
    return res.status(200).json(project);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro interno ao buscar projeto.', error: error.message });
  }
}


// Exporta as funções para serem usadas nas rotas da API.
module.exports = { createProject, listProjects, getProjectById };
