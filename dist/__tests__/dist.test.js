const validateRfc = require('../index');

describe('.validateRfc', () => {
  it('returns true for a valid RFC', () => {
    const rfc = 'MHTR93041179A';
    const response = validateRfc(rfc);
    expect(response).toEqual({
      rfc,
      isValid: true,
      type: 'person'
    });
  });

  it('returns not valid and specify errors when input is not a string', () => {
    const rfc = null;
    const response = validateRfc(rfc);
    expect(response).toEqual({
      rfc: null,
      isValid: false,
      type: null,
      errors: ['INVALID_FORMAT']
    });
  });
});
