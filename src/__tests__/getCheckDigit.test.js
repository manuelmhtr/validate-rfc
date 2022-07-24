const getCheckDigit = require('../getCheckDigit');

describe('.getVerificationDigit', () => {
  const testCases = {
    'GODE561231GR8': '8',
    'MHTR93041179A': 'A',
    'MHTR840411790': '0',
    'RET130705MD5': '5',
    'ATR060613SN7': '7'
  };

  Object.keys(testCases).forEach(rfc => {
    const digit = testCases[rfc];

    it(`should return "${digit}" as verification digit for RFC "${rfc}"`, () => {
      expect(getCheckDigit(rfc)).toEqual(digit);
    });
  });
});
