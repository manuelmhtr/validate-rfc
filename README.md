# Validate RFC

![](https://img.shields.io/badge/build-passing-green?style=flat)
![](https://img.shields.io/npm/dm/validate-rfc)
![](https://img.shields.io/github/license/manuelmhtr/validate-rfc?color=blue)

Una librería sencilla y ligera para validar [RFCs Mexicanos](https://es.wikipedia.org/wiki/Registro_Federal_de_Contribuyentes) (Registro Federal de Contribuyentes).


## Instalación

Usa NPM o YARN:

```shell
$ npm install validate-rfc
```


## API


La librería expone una sola función (`.validateRfc`).


### .validateRfc(rfc)


Valida que un string sea un RFC válido y entrega detalles sobre la validación.


**Parámetros**

| Parámetro | Tipo | Descripción |
| --------- | ---- | ----------- |
|`rfc`|String|El RFC a validar.|


**Respuesta**

Regresa un objeto plano con los siguientes valores:


| Parámetro | Tipo | Descripción |
| --------- | ---- | ----------- |
|`isValid`|Boolean|Indica si el string ingresado es un RFC válido.|
|`rfc`|String|El RFC formateado (en mayúsculas, sin espacios ni simbolos). Regresa `null` en caso de que el RFC sea inválido.|
|`type`|String|El tipo del RFC ingresado. Los valores pueden ser `person` para personas físicas, `company` para personas morales, `generic` para el RFC genérico "XAXX010101000" o `foreign` para el RFC "XEXX010101000" para residentes en el extranjero. Regresa `null` en caso de que el RFC sea inválido.|
|`errors`|Array[String]|En caso de que el RFC no sea válido, aquí se indican los motivos por los que no fue válido.|


Los posibles valores que puede contener `errors` y su descripción son:

| Error | Descripción |
| ----- | ----------- |
|`INVALID_FORMAT`|El formato es inválido, es decir, no cuenta con la longitud o estructura de caracteres esperado. Ej: `XYZ` porque claramente no es un RFC. |
|`INVALID_DATE`|El string tiene el formato adecuado, pero los dígitos para la fecha generan una fecha inválida. Ej: `MHTR815511A70` porque refiere al mes `55`.|
|`INVALID_VERIFICATION_DIGIT`|El string tiene el formato adecuado, pero el último caracter (dígito verificador) es inválido. Ej: `MHTR810511A79` termina en `9` pero se espera que termine en `2`.|


**Ejemplo**

```js
const validateRfc = require('validate-rfc');

const response = validateRfc('mhtr93041179a');
console.log(response);

/*
Imprime:

{
  isValid: true,
  rfc: 'MHTR93041179A',
  type: 'person'
}

*/

const response = validateRfc('Este no es un RFC');
console.log(response);

/*
Imprime:

{
  isValid: false,
  rfc: null,
  type: null,
  errors: ['INVALID_FORMAT']
}

*/
```


## Pruebas

Para correr las pruebas ejecuta el comando:

```shell
$ npm test
```


## Licencia

MIT
