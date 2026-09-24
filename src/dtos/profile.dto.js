const { EMAIL_REGEX, isNullOrEmpty } = require('./helpers');

/**
 * CreateProfileDTO
 * { name: string (obrigatório), email: string (obrigatório), bio?: string, avatarUrl?: string }
 */
function validateCreateProfileDTO(body = {}) {
  const errors = [];
  const { name, email, bio, avatarUrl } = body;

  if (isNullOrEmpty(name)) {
    errors.push('O campo "name" é obrigatório.');
  } else if (typeof name !== 'string' || name.trim().length < 2) {
    errors.push('O campo "name" deve ser uma string com pelo menos 2 caracteres.');
  }

  if (isNullOrEmpty(email)) {
    errors.push('O campo "email" é obrigatório.');
  } else if (typeof email !== 'string' || !EMAIL_REGEX.test(email)) {
    errors.push('O campo "email" deve ser um e-mail válido.');
  }

  if (bio !== undefined && bio !== null && typeof bio !== 'string') {
    errors.push('O campo "bio" deve ser uma string.');
  }

  if (avatarUrl !== undefined && avatarUrl !== null && typeof avatarUrl !== 'string') {
    errors.push('O campo "avatarUrl" deve ser uma string (URL).');
  }

  return errors;
}

module.exports = { validateCreateProfileDTO };
