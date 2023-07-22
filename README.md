# Validate RFC

![](https://img.shields.io/badge/build-passing-green?style=flat)
![](https://img.shields.io/npm/dm/validate-rfc)
![](https://img.shields.io/github/license/manuelmhtr/validate-rfc?color=blue)

A simple and lightweight library to validate [Mexican RFCs](https://es.wikipedia.org/wiki/Registro_Federal_de_Contribuyentes) (Tax ID).


## Install

### NodeJS

Use NPM:

```shell
$ npm install --save validate-rfc
```

Or YARN:

```shell
$ yarn add validate-rfc
```

### Browser

Add the script to your project:

```html
<!-- Latest version -->
<script src="https://cdn.jsdelivr.net/gh/manuelmhtr/validate-rfc@latest/dist/index.js" type="text/javascript"></script>

<!-- Or specify a version -->
<script src="https://cdn.jsdelivr.net/gh/manuelmhtr/validate-rfc@v2.0.2/dist/index.js" type="text/javascript"></script>

<!-- This will export a global function "validateRfc": -->
<script type="text/javascript">
  var data = validateRfc('mhtr93041179a');
  console.log(data);
</script>
```


## API

The library only exposes a single function (`.validateRfc`).


### .validateRfc(rfc)


Checks whether a string is a valid RFC and returns validation details.


**Parameters**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
|`rfc`|String|The RFC to be validated.|
|`options`|Object| Settings (Optional).|
|`options.omitVerificationDigit`|Boolean|When `true`, the [_Check digit_](https://en.wikipedia.org/wiki/Check_digit) is omitted from the validation (Default: `false`). This option is useful since there are some RFCs with an invalid _Check digit_ that are recognized as valid by the Mexican authorities (See [Known issues](#known-issues)).|

**Response**

It returns a plain object with the values:

| Parameter | Type | Description |
| --------- | ---- | ----------- |
|`isValid`|Boolean|Indicates if the string is a valid RFC.|
|`rfc`|String|The formatted RFC (uppercase, with no white spaces or symbols). Returns `null` when input is an invalid RFC.|
|`type`|String|The classification of the provided RFC. Values can be `person` for a legal person, `company` for companies, `generic` for the generic RFC "XAXX010101000" ir `foreign` for the RFC "XEXX010101000" which is used by foreign people. Returns `null` when input is an invalid RFC.|
|`errors`|Array[String]|In case the RFC is invalid, the reasons why the RFC is invalid will be listed here.|

Possible `errors` values and they description are:

| Error | Descripción |
| ----- | ----------- |
|`INVALID_FORMAT`|The format is invalid, that means, the string does not meet with the required length or expected structure. Eg: `XYZ` because clearly is not an RFC. |
|`INVALID_DATE`|The string may have the correct format, but digits generate an invalid date. Eg: `MHTR815511A70` because it refers to month `55`.|
|`INVALID_VERIFICATION_DIGIT`|The string has a valid format, but the last character (check digit) is invalid. Eg: `MHTR810511A79` ends with `9` but it is expected to end with `2`.|
|`FORBIDDEN_WORD`|The string contains one of the [inconvenient words](https://solucionfactible.com/sfic/resources/files/palabrasInconvenientes-rfc.pdf) that cannot be included in an RFC. Eg: `FETO930411792` the initials make the word `FETO` (fetus, LOL).|


**Example**

```js
const validateRfc = require('validate-rfc');

const response = validateRfc('mhtr93041179a');
console.log(response);

/*
Prints:

{
  isValid: true,
  rfc: 'MHTR93041179A',
  type: 'person'
}

*/

const response = validateRfc('This is not an RFC');
console.log(response);

/*
Prints:

{
  isValid: false,
  rfc: null,
  type: null,
  errors: ['INVALID_FORMAT']
}

*/
```


## Tests

Run the test with the command:

```shell
$ yarn test
```

## Known issues

### Check digit mismatches

Some RFCs registered by the SAT (Mexican taxing bureau) does not pass the _Check digit_ validation. For instance, `LME060822IH5` is a valid RFC and able to be invoices according the [SAT official validator](https://agsc.siat.sat.gob.mx/PTSC/ValidaRFC/index.jsf), however its _Check digit_ should be `3` rather than `5`. Therefore in those cases, this library returns `isValid` as `false` and the error `INVALID_VERIFICATION_DIGIT`.

Solutions:
1. If you find one of these cases, add it to the [list of valid RFCs](/src/validRfcs.json). **Upper-cased and sorted alphabetically**. By adding them to the list you are supporting the documentation of such cases and preventing from returning an error the next time.
2. Use the option `omitVerificationDigit` to ignore the _Check digit_ validation. It has the advantage of being a faster solution and covers all the cases, but many invalid RFCs will pass the validation.

References:
- [Issue #10](https://github.com/manuelmhtr/validate-rfc/issues/10)
- https://es.stackoverflow.com/questions/140420/validacion-de-rfc-con-errores

## Used by

Used by tens of successful teams:

| <a href="https://www.zenfi.mx/"><img src="https://avatars.githubusercontent.com/u/68744962?s=200&v=4" width="64"></a><br/>Zenfi | <a href="https://www.yotepresto.com/"><img src="https://avatars.githubusercontent.com/u/31322412?s=200&v=4" width="64"></a><br/>Yotepresto | <a href="https://www.deacero.com/"><img src="https://avatars.githubusercontent.com/u/64057746?s=200&v=4" width="64"></a><br/>DeAcero |
| :--: | :--: | :--: |


## Related

* [validate-curp](https://github.com/manuelmhtr/validate-curp)
* You need to check if an RFC is registered in SAT or is blacklisted? Try with [Verifier](https://rapidapi.com/manuelmhtr/api/verifier).

## Licencia

MIT
