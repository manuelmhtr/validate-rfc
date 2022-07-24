const getCheckDigit = require('./getCheckDigit');
const forbiddenWords = require('./forbiddenWords.json');
const validRfcs = require('./validRfcs.json');

const RFC_REGEXP = /^([A-ZÑ\x26]{3,4})([0-9]{6})([A-Z0-9]{3})$/;
const INVALID_FORMAT_ERROR = 'INVALID_FORMAT';
const INVALID_DATE_ERROR = 'INVALID_DATE';
const INVALID_VERIFICATION_DIGIT_ERROR = 'INVALID_VERIFICATION_DIGIT';
const FORBIDDEN_WORD_ERROR = 'FORBIDDEN_WORD';
const RFC_TYPE_FOR_LENGTH = {
  '12': 'company',
  '13': 'person'
};
const SPECIAL_CASES = {
  'XEXX010101000': 'foreign',
  'XAXX010101000': 'generic'
};

const parseInput = (input) => {
  return String(input)
    .trim()
    .toUpperCase()
    .replace(/[^0-9A-ZÑ\x26]/g, '');
};

const validateDate = (rfc) => {
  const dateStr = rfc.slice(0, -3).slice(-6);
  const year = dateStr.slice(0, 2);
  const month = dateStr.slice(2, 4);
  const day = dateStr.slice(4, 6);
  const date = new Date(`20${year}-${month}-${day}`);
  return !isNaN(date.getTime());
};

const validateVerificationDigit = (rfc) => {
  const digit = rfc.slice(-1);
  const expected = getCheckDigit(rfc);
  return expected === digit;
};

const hasForbiddenWords = (rfc) => {
  const prefix = (rfc || '').slice(0, 4);
  return forbiddenWords.includes(prefix);
};

const validate = (rfc, { omitVerificationDigit } = {}) => {
  if (isSpecialCase(rfc) || isValidCase(rfc)) return [];
  const errors = [];
  const hasValidFormat = RFC_REGEXP.test(rfc);
  const hasValidDate = hasValidFormat ? validateDate(rfc) : true;
  const hasValidDigit = hasValidFormat ? validateVerificationDigit(rfc) : true;
  if (!hasValidFormat) errors.push(INVALID_FORMAT_ERROR);
  if (!hasValidDate) errors.push(INVALID_DATE_ERROR);
  if (!hasValidDigit && !omitVerificationDigit) errors.push(INVALID_VERIFICATION_DIGIT_ERROR);
  if (hasForbiddenWords(rfc)) errors.push(FORBIDDEN_WORD_ERROR);
  return errors;
};

const isSpecialCase = (rfc) => rfc in SPECIAL_CASES;

const isValidCase = (rfc) => validRfcs.includes(rfc);

const getType = (rfc) => SPECIAL_CASES[rfc] || RFC_TYPE_FOR_LENGTH[rfc.length] || null;

const getValidResponse = (rfc) => ({
  isValid: true,
  rfc,
  type: getType(rfc)
});

const getInvalidResponse = (errors) => ({
  isValid: false,
  rfc: null,
  type: null,
  errors
});

module.exports = (input, options) => {
  const rfc = parseInput(input);
  const errors = validate(rfc, options);
  const isValid = errors.length === 0;

  return isValid ? getValidResponse(rfc) : getInvalidResponse(errors);
};
