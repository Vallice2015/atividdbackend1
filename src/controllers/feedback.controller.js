// Importa os modelos Project e Feedback do diretório de models
// Esses modelos representam tabelas no banco de dados (via Sequelize,)
// Project: tabela de projetos
// Feedback: tabela de feedbacks associados a projetos
const { Project, Feedback } = require('../models');

// Importa a função de validação do DTO (Data Transfer Object)
// Essa função garante que os dados enviados no corpo da requisição estão corretos
// Exemplo: se o campo "author" for obrigatório, ela verifica se foi enviado
const { validateCreateFeedbackDTO } = require('../dtos/feedback.dto');

/**
 * Função responsável por cadastrar um novo feedback para um projeto específico
 * Rota: POST /api/projects/:id/feedbacks
 */
async function createFeedback(req, res) {
  try {
    // Captura o parâmetro "id" da URL (ex: /api/projects/5/feedbacks → id = 5)
    const { id } = req.params;

    // Valida se o id recebido é um número inteiro
    // Exemplo: se o usuário enviar "abc", retorna erro
    if (!Number.isInteger(Number(id))) {
      return res.status(400).json({ message: 'O parâmetro "id" deve ser um número inteiro.' });
    }

    // Busca no banco de dados o projeto com o ID informado
    const project = await Project.findByPk(id);
    if (!project) {
      // Caso não exista projeto com esse ID, retorna erro 404 (Not Found)
      return res.status(404).json({ message: `Projeto com id ${id} não encontrado.` });
    }

    // Valida os dados enviados no corpo da requisição (req.body)
    // Exemplo: verifica se "author" e "message" foram enviados corretamente
    const errors = validateCreateFeedbackDTO(req.body);
    if (errors.length > 0) {
      // Se houver erros de validação, retorna status 400 com a lista de erros
      return res.status(400).json({ message: 'Erro de validação.', errors });
    }

    // Extrai os campos necessários do corpo da requisição
    const { author, message, rating } = req.body;

    // Cria um novo registro de feedback no banco de dados
    const feedback = await Feedback.create({
      author: author.trim(), // Remove espaços extras do nome do autor
      message: message.trim(), // Remove espaços extras da mensagem
      rating: rating !== undefined && rating !== null ? Number(rating) : null, // Converte rating para número ou deixa nulo
      projectId: Number(id), // Relaciona o feedback ao projeto pelo ID
    });

    // Retorna o feedback criado com status 201 (Created)
    return res.status(201).json(feedback);
  } catch (error) {
    // Caso ocorra algum erro inesperado, loga no console e retorna status 500 (Internal Server Error)
    console.error(error);
    return res.status(500).json({ message: 'Erro interno ao cadastrar feedback.', error: error.message });
  }
}

/**
 * Função responsável por listar todos os feedbacks de um projeto específico
 * Rota: GET /api/projects/:id/feedbacks
 */
async function listFeedbacksByProject(req, res) {
  try {
    // Captura o parâmetro "id" da URL
    const { id } = req.params;

    // Valida se o id é um número inteiro
    if (!Number.isInteger(Number(id))) {
      return res.status(400).json({ message: 'O parâmetro "id" deve ser um número inteiro.' });
    }

    // Busca o projeto pelo ID informado
    const project = await Project.findByPk(id);
    if (!project) {
      // Caso não exista, retorna erro 404
      return res.status(404).json({ message: `Projeto com id ${id} não encontrado.` });
    }

    // Busca todos os feedbacks relacionados ao projeto
    const feedbacks = await Feedback.findAll({
      where: { projectId: id }, // Filtra pelo ID do projeto
      order: [['id', 'ASC']],   // Ordena os feedbacks pelo ID em ordem crescente
    });

    // Retorna a lista de feedbacks com status 200 (OK)
    return res.status(200).json(feedbacks);
  } catch (error) {
    // Caso ocorra algum erro inesperado, loga no console e retorna status 500
    console.error(error);
    return res.status(500).json({ message: 'Erro interno ao listar feedbacks.', error: error.message });
  }
}

// Exporta as funções para serem usadas nas rotas
// Assim, no arquivo de rotas, podemos fazer:
// router.post('/api/projects/:id/feedbacks', createFeedback);
// router.get('/api/projects/:id/feedbacks', listFeedbacksByProject);
module.exports = { createFeedback, listFeedbacksByProject };
