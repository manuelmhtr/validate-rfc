# Changelog
All notable changes to this project will be documented in this file.

## [2.0.3] - 2023-07-22
### Changed
- Include typescript declaration file in package.json ([#33](https://github.com/manuelmhtr/validate-rfc/pull/33) by [@armando-cruz-digital](https://github.com/armando-cruz-digital))

## [2.0.2] - 2022-07-24
### Changed
- Translated README to English.
- Replaced Mocha with Jest.

## [2.0.1] - 2021-08-23
### Fixed
- Update TS definition file.

## [2.0.0] - 2021-06-12
### Added
- Accepts an optional second parameter `options`.
- Accepts the options `omitVerificationDigit` to skip the `INVALID_VERIFICATION_DIGIT` error validation.
- Adds the `FORBIDDEN_WORD` error that validates the RFC does not contain one of the "inconvenient" words.
- Add the `valid-rfc.json` list with the list of valid RFCs by the SAT that does not comply with the "verification digit" rule.
