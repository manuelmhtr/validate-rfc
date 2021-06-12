export default function validateRfc(rfc: string, options?: { strict?: boolean }): {
  isValid: boolean,
  type?: 'company' | 'person' | 'foreign' | 'generic',
  rfc?: string,
  errors?: ('INVALID_FORMAT' | 'INVALID_DATE' | 'INVALID_VERIFICATION_DIGIT' | 'FORBIDDEN_WORD')[]
};
