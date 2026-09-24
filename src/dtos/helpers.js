const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isNullOrEmpty(value) {
  return value === undefined || value === null || String(value).trim() === '';
}

module.exports = { EMAIL_REGEX, isNullOrEmpty };
