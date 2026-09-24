// Importa os modelos do Sequelize que representam tabelas no banco de dados
// Profile → tabela de perfis
// Project → tabela de projetos
// Technology → tabela de tecnologias
// Feedback → tabela de feedbacks
const { Profile, Project, Technology, Feedback } = require('../models');

// Importa a função de validação do DTO (Data Transfer Object)
// Essa função garante que os dados enviados no corpo da requisição estão corretos
// Exemplo: se "name" e "email" forem obrigatórios, ela verifica se foram enviados
const { validateCreateProfileDTO } = require('../dtos/profile.dto');

/**
 * Função responsável por cadastrar um novo perfil
 * Rota: POST /api/profiles
 */
async function createProfile(req, res) {
  try {
    // Valida os dados enviados no corpo da requisição
    // Caso falte algum campo obrigatório ou esteja inválido, retorna erros
    const errors = validateCreateProfileDTO(req.body);
    if (errors.length > 0) {
      // Se houver erros de validação, retorna status 400 (Bad Request)
      return res.status(400).json({ message: 'Erro de validação.', errors });
    }

    // Extrai os campos necessários do corpo da requisição
    const { name, email, bio, avatarUrl } = req.body;

    // Verifica se já existe um perfil cadastrado com o mesmo e-mail
    const existing = await Profile.findOne({ where: { email } });
    if (existing) {
      // Se já existir, retorna status 409 (Conflict)
      return res.status(409).json({ message: `Já existe um perfil cadastrado com o e-mail "${email}".` });
    }

    // Cria um novo registro de perfil no banco de dados
    const profile = await Profile.create({
      name: name.trim(), // Remove espaços extras do nome
      email: email.trim(), // Remove espaços extras do e-mail
      bio: bio ? bio.trim() : null, // Se bio existir, remove espaços extras; senão, deixa nulo
      avatarUrl: avatarUrl ? avatarUrl.trim() : null, // Se avatarUrl existir, remove espaços extras; senão, deixa nulo
    });

    // Retorna o perfil criado com status 201 (Created)
    return res.status(201).json(profile);
  } catch (error) {
    // Caso ocorra algum erro inesperado, loga no console e retorna status 500 (Internal Server Error)
    console.error(error);
    return res.status(500).json({ message: 'Erro interno ao cadastrar perfil.', error: error.message });
  }
}

/**
 * Função responsável por buscar um perfil pelo ID
 * Rota: GET /api/profiles/:id
 * Inclui também os projetos relacionados ao perfil, junto com suas tecnologias e feedbacks
 */
async function getProfileById(req, res) {
  try {
    // Captura o parâmetro "id" da URL
    const { id } = req.params;

    // Valida se o id é um número inteiro
    if (!Number.isInteger(Number(id))) {
      return res.status(400).json({ message: 'O parâmetro "id" deve ser um número inteiro.' });
    }

    // Busca o perfil pelo ID informado
    // Inclui também os projetos relacionados ao perfil
    // Dentro de cada projeto, inclui:
    // - As tecnologias (com associação many-to-many, por isso o "through: { attributes: [] }")
    // - Os feedbacks associados ao projeto
    const profile = await Profile.findByPk(id, {
      include: [
        {
          model: Project,
          as: 'projects',
          include: [
            { model: Technology, as: 'technologies', through: { attributes: [] } },
            { model: Feedback, as: 'feedbacks' },
          ],
        },
      ],
    });

    // Caso não exista perfil com esse ID, retorna erro 404 (Not Found)
    if (!profile) {
      return res.status(404).json({ message: `Perfil com id ${id} não encontrado.` });
    }

    // Retorna o perfil encontrado com status 200 (OK)
    return res.status(200).json(profile);
  } catch (error) {
    // Caso ocorra algum erro inesperado, loga no console e retorna status 500
    console.error(error);
    return res.status(500).json({ message: 'Erro interno ao buscar perfil.', error: error.message });
  }
}

// Exporta as funções para serem usadas nas rotas
// Exemplo no arquivo de rotas:
// router.post('/api/profiles', createProfile);
// router.get('/api/profiles/:id', getProfileById);
module.exports = { createProfile, getProfileById };
