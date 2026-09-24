// Importa a função isNullOrEmpty do arquivo helpers.js
const { isNullOrEmpty } = require('./helpers');

/**
 * CreateFeedbackDTO
 * Estrutura esperada para o objeto de feedback:
 * { author: string (obrigatório), message: string (obrigatório), rating?: number (1 a 5) }
 */
function validateCreateFeedbackDTO(body = {}) {
  // Cria um array vazio para armazenar mensagens de erro
  const errors = [];

  // Extrai os campos author, message e rating do objeto recebido
  const { author, message, rating } = body;

  // Validação do campo "author"
  if (isNullOrEmpty(author)) {
    // Se estiver vazio ou nulo, adiciona mensagem de erro
    errors.push('O campo "author" é obrigatório.');
  } else if (typeof author !== 'string') {
    // Se não for uma string, adiciona mensagem de erro
    errors.push('O campo "author" deve ser uma string.');
  }

  // Validação do campo "message"
  if (isNullOrEmpty(message)) {
    // Se estiver vazio ou nulo, adiciona mensagem de erro
    errors.push('O campo "message" é obrigatório.');
  } else if (typeof message !== 'string' || message.trim().length < 3) {
    // Se não for string ou tiver menos de 3 caracteres, adiciona mensagem de erro
    errors.push('O campo "message" deve ser uma string com pelo menos 3 caracteres.');
  }

  // Validação do campo "rating" (opcional)
  if (rating !== undefined && rating !== null) {
    // Converte o valor para número
    const n = Number(rating);
    // Verifica se é inteiro e se está entre 1 e 5
    if (!Number.isInteger(n) || n < 1 || n > 5) {
      errors.push('O campo "rating", se informado, deve ser um número inteiro entre 1 e 5.');
    }
  }

  // Retorna o array de erros (se vazio, significa que não houve erros)
  return errors;
}

// Exporta a função para ser usada em outros arquivos
module.exports = { validateCreateFeedbackDTO };
