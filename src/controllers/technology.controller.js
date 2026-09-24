// Importa o operador "Op" do Sequelize.
// Esse operador permite usar condições avançadas nas consultas, como LIKE, IN, BETWEEN, etc.
const { Op } = require('sequelize');

// Importa o modelo "Technology".
// Esse modelo representa a tabela de tecnologias no banco de dados.
const { Technology } = require('../models');

// Importa a função de validação do DTO (Data Transfer Object).
// Essa função garante que os dados enviados pelo cliente estejam corretos antes de salvar no banco.
const { validateCreateTechnologyDTO } = require('../dtos/technology.dto');


// ===============================
// POST /api/technologies — Cadastro de tecnologia com validações
// ===============================
async function createTechnology(req, res) {
  try {
    // 1. Valida os dados recebidos no corpo da requisição.
    const errors = validateCreateTechnologyDTO(req.body);
    if (errors.length > 0) {
      // Se houver erros de validação, retorna status 400 (Bad Request).
      return res.status(400).json({ message: 'Erro de validação.', errors });
    }

    // 2. Extrai o campo "name" e remove espaços extras.
    const name = req.body.name.trim();

    // 3. Verifica se já existe uma tecnologia com esse nome no banco.
    const existing = await Technology.findOne({
      where: { name: { [Op.like]: name } }, // busca por nome semelhante
    });

    // 4. Se já existir, retorna erro 409 (Conflict).
    if (existing) {
      return res.status(409).json({ message: `A tecnologia "${name}" já está cadastrada.` });
    }

    // 5. Cria a nova tecnologia no banco de dados.
    const technology = await Technology.create({ name });

    // 6. Retorna a tecnologia criada com status 201 (Created).
    return res.status(201).json(technology);
  } catch (error) {
    // Captura qualquer erro inesperado.
    console.error(error);
    return res.status(500).json({ message: 'Erro interno ao cadastrar tecnologia.', error: error.message });
  }
}


// ===============================
// GET /api/technologies — Listagem de todas as tecnologias
// ===============================
async function listTechnologies(req, res) {
  try {
    // 1. Busca todas as tecnologias cadastradas no banco.
    // Ordena os resultados pelo nome em ordem alfabética (ASC).
    const technologies = await Technology.findAll({ order: [['name', 'ASC']] });

    // 2. Retorna a lista de tecnologias com status 200 (OK).
    return res.status(200).json(technologies);
  } catch (error) {
    // Captura qualquer erro inesperado.
    console.error(error);
    return res.status(500).json({ message: 'Erro interno ao listar tecnologias.', error: error.message });
  }
}


// Exporta as funções para serem usadas nas rotas da API.
module.exports = { createTechnology, listTechnologies };
