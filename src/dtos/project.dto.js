const { isNullOrEmpty } = require('./helpers');

/**
 * CreateProjectDTO
 * {
 *   title: string (obrigatório),
 *   description: string (obrigatório),
 *   profileId: number (obrigatório),
 *   repositoryUrl?: string,
 *   technologyIds?: number[]  (ids de tecnologias já cadastradas)
 * }
 */
function validateCreateProjectDTO(body = {}) {
  const errors = [];
  const { title, description, profileId, repositoryUrl, technologyIds } = body;

  if (isNullOrEmpty(title)) {
    errors.push('O campo "title" é obrigatório.');
  } else if (typeof title !== 'string' || title.trim().length < 3) {
    errors.push('O campo "title" deve ser uma string com pelo menos 3 caracteres.');
  }

  if (isNullOrEmpty(description)) {
    errors.push('O campo "description" é obrigatório.');
  } else if (typeof description !== 'string' || description.trim().length < 5) {
    errors.push('O campo "description" deve ser uma string com pelo menos 5 caracteres.');
  }

  if (isNullOrEmpty(profileId)) {
    errors.push('O campo "profileId" é obrigatório.');
  } else if (!Number.isInteger(Number(profileId))) {
    errors.push('O campo "profileId" deve ser um número inteiro.');
  }

  if (repositoryUrl !== undefined && repositoryUrl !== null && typeof repositoryUrl !== 'string') {
    errors.push('O campo "repositoryUrl" deve ser uma string (URL).');
  }

  if (technologyIds !== undefined && technologyIds !== null) {
    if (!Array.isArray(technologyIds)) {
      errors.push('O campo "technologyIds" deve ser um array de números.');
    } else if (technologyIds.some((id) => !Number.isInteger(Number(id)))) {
      errors.push('Todos os itens de "technologyIds" devem ser números inteiros.');
    }
  }

  return errors;
}

module.exports = { validateCreateProjectDTO };
