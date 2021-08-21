export default function validateRfc<T extends string>(rfc: T, options?: { omitVerificationDigit?: boolean }): {
  isValid: boolean,
  type?: 'company' | 'person' | 'foreign' | 'generic',
  rfc?: T,
  errors?: ('INVALID_FORMAT' | 'INVALID_DATE' | 'INVALID_VERIFICATION_DIGIT' | 'FORBIDDEN_WORD')[]
};
