const { isNullOrEmpty } = require('./helpers');

/**
 * CreateTechnologyDTO
 * { name: string (obrigatório) }
 */
function validateCreateTechnologyDTO(body = {}) {
  const errors = [];
  const { name } = body;

  if (isNullOrEmpty(name)) {
    errors.push('O campo "name" é obrigatório.');
  } else if (typeof name !== 'string' || name.trim().length < 2) {
    errors.push('O campo "name" deve ser uma string com pelo menos 2 caracteres.');
  }

  return errors;
}

module.exports = { validateCreateTechnologyDTO };
