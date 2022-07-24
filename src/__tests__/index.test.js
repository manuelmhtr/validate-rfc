const validateRfc = require('../index');

describe('.validateRfc', () => {
  describe('when RFC is valid', () => {
    it('should return true for a valid person RFC', () => {
      const rfc = 'MHTR93041179A';
      const response = validateRfc(rfc);
      expect(response).toEqual({
        rfc,
        isValid: true,
        type: 'person'
      });
    });

    it('should return true for a valid company RFC', () => {
      const rfc = 'RET130705MD5';
      const response = validateRfc(rfc);
      expect(response).toEqual({
        rfc,
        isValid: true,
        type: 'company'
      });
    });

    it('should return true when rfc has & or Ñ', () => {
      const rfc = 'Ñ&T130705MD6';
      const response = validateRfc(rfc);
      expect(response).toEqual({
        rfc,
        isValid: true,
        type: 'company'
      });
    });

    it('should work with lowercase and symbols', () => {
      const rfc = '  mhtr-930411/79a  ';
      const response = validateRfc(rfc);
      expect(response).toEqual({
        rfc: 'MHTR93041179A',
        isValid: true,
        type: 'person'
      });
    });

    it('should return valid for those documented cases when the verification digit does not match', () => {
      const rfc = 'LME060822IH5';
      const response = validateRfc(rfc);
      expect(response).toEqual({
        rfc: 'LME060822IH5',
        isValid: true,
        type: 'company'
      });
    });
  });

  describe('support for special cases', () => {
    it('should return is valid and type "generic" for RFC XAXX010101000', () => {
      const rfc = 'XAXX010101000';
      const response = validateRfc(rfc);
      expect(response).toEqual({
        rfc: 'XAXX010101000',
        isValid: true,
        type: 'generic'
      });
    });

    it('should return is valid and type "foreign" for RFC XEXX010101000', () => {
      const rfc = 'XEXX010101000';
      const response = validateRfc(rfc);
      expect(response).toEqual({
        rfc: 'XEXX010101000',
        isValid: true,
        type: 'foreign'
      });
    });
  });

  describe('when RFC is not valid', () => {
    it('should return not valid and specify errors when input is not a string', () => {
      const rfc = null;
      const response = validateRfc(rfc);
      expect(response).toEqual({
        rfc: null,
        isValid: false,
        type: null,
        errors: ['INVALID_FORMAT']
      });
    });

    it('should return not valid and specify errors when format is incorrect', () => {
      const rfc = 'INVALID_RFC';
      const response = validateRfc(rfc);
      expect(response).toEqual({
        rfc: null,
        isValid: false,
        type: null,
        errors: ['INVALID_FORMAT']
      });
    });

    it('should return not valid and specify errors when format is correct but date is not', () => {
      const rfc = 'MHTR815511A70';
      const response = validateRfc(rfc);
      expect(response).toEqual({
        rfc: null,
        isValid: false,
        type: null,
        errors: ['INVALID_DATE']
      });
    });

    it('should return not valid and specify errors when verification digit is not correct', () => {
      const rfc = 'MHTR810511A79';
      const response = validateRfc(rfc);
      expect(response).toEqual({
        rfc: null,
        isValid: false,
        type: null,
        errors: ['INVALID_VERIFICATION_DIGIT']
      });
    });

    it('should skip verification digit validation when `omitVerificationDigit` is true', () => {
      const rfc = 'MHTR810511A79';
      const response = validateRfc(rfc, { omitVerificationDigit: true });
      expect(response).toEqual({
        rfc,
        isValid: true,
        type: 'person'
      });
    });

    it('should return not valid and specify errors when contains a forbidden word', () => {
      const rfc = 'FETO930411792';
      const response = validateRfc(rfc);
      expect(response).toEqual({
        rfc: null,
        isValid: false,
        type: null,
        errors: ['FORBIDDEN_WORD']
      });
    });

    it('should return multiple errors when is required', () => {
      const rfc = 'MHTR815511778';
      const response = validateRfc(rfc);
      expect(response).toEqual({
        rfc: null,
        isValid: false,
        type: null,
        errors: ['INVALID_DATE', 'INVALID_VERIFICATION_DIGIT']
      });
    });
  });
});
