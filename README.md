# Validate RFC

![](https://img.shields.io/badge/build-passing-green?style=flat)
![](https://img.shields.io/npm/dm/validate-rfc)
![](https://img.shields.io/github/license/manuelmhtr/validate-rfc?color=blue)

Una librería sencilla y ligera para validar [RFCs Mexicanos](https://es.wikipedia.org/wiki/Registro_Federal_de_Contribuyentes) (Registro Federal de Contribuyentes).


## Instalación

### NodeJS

Usa NPM o YARN:

```shell
$ npm install --save validate-rfc
```

### Navegador

Añade el siguiente script a tu proyecto:

```html
<!-- última versión -->
<script src="https://cdn.jsdelivr.net/gh/manuelmhtr/validate-rfc@latest/dist/index.js" type="text/javascript"></script>

<!-- O especifica una versión -->
<script src="https://cdn.jsdelivr.net/gh/manuelmhtr/validate-rfc@v2.0.1/dist/index.js" type="text/javascript"></script>

<!-- Esto va a exportar una función "validateRfc": -->
<script type="text/javascript">
  var data = validateRfc('mhtr93041179a');
  console.log(data);
</script>
```


## API

La librería expone una sola función (`.validateRfc`).


### .validateRfc(rfc)


Valida que un string sea un RFC válido y entrega detalles sobre la validación.


**Parámetros**

| Parámetro | Tipo | Descripción |
| --------- | ---- | ----------- |
|`rfc`|String|El RFC a validar.|
|`options`|Object| Parámetros de configuración (Opcional).|
|`options.omitVerificationDigit`|Boolean|Si esta opción es `true`, se omite la validación del dígito verificador (Default: `false`).|


**Respuesta**

Regresa un objeto plano con los siguientes valores:


| Parámetro | Tipo | Descripción |
| --------- | ---- | ----------- |
|`isValid`|Boolean|Indica si el string ingresado es un RFC válido.|
|`rfc`|String|El RFC formateado (en mayúsculas, sin espacios ni símbolos). Regresa `null` en caso de que el RFC sea inválido.|
|`type`|String|El tipo del RFC ingresado. Los valores pueden ser `person` para personas físicas, `company` para personas morales, `generic` para el RFC genérico "XAXX010101000" o `foreign` para el RFC "XEXX010101000" para residentes en el extranjero. Regresa `null` en caso de que el RFC sea inválido.|
|`errors`|Array[String]|En caso de que el RFC no sea válido, aquí se indican los motivos por los que no fue válido.|


Los posibles valores que puede contener `errors` y su descripción son:

| Error | Descripción |
| ----- | ----------- |
|`INVALID_FORMAT`|El formato es inválido, es decir, no cuenta con la longitud o estructura de caracteres esperado. Ej: `XYZ` porque claramente no es un RFC. |
|`INVALID_DATE`|El string tiene el formato adecuado, pero los dígitos para la fecha generan una fecha inválida. Ej: `MHTR815511A70` porque refiere al mes `55`.|
|`INVALID_VERIFICATION_DIGIT`|El string tiene el formato adecuado, pero el último caracter (dígito verificador) es inválido. Ej: `MHTR810511A79` termina en `9` pero se espera que termine en `2`.|
|`FORBIDDEN_WORD`|El string contiene una de las [palabras inconvenientes](https://solucionfactible.com/sfic/resources/files/palabrasInconvenientes-rfc.pdf) que no pueden formar un RFC. Ej: `FETO930411792` las iniciales forman la palabra `FETO`.|


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

## Problemas conocidos

### Discrepancias en el dígito verificador

Algunos RFC registrados ante el SAT no pasan la validación del dígito verificador. Por ejemplo el RFC `LME060822IH5` es válido y susceptible a recibir facturas según el [validador oficial del SAT](https://agsc.siat.sat.gob.mx/PTSC/ValidaRFC/index.jsf), sin embargo al calcular su dígito verificador este debería terminar en `3` en lugar de `5`. Por lo tanto en estos casos la librería retorna `isValid` como `false` y el error `INVALID_VERIFICATION_DIGIT`.

Soluciones:

1. Si encuentras un caso en particular agrega el RFC a la [lista de RFCs válidos](/src/valid-rfcs.json). En **mayúsculas y en orden alfabético**. Al agregarlo a la lista ese RFC ayudas a documentar estos casos y evitar que regrese error.
2. Utiliza la opción `omitVerificationDigit` para ignorar la validación del dígito verificador. Tiene la ventaja de que es una solución más rápida y cubre todos lo casos; pero va a regresar como válidos muchos RFC que no están permitidos.

Referencias:
- [Issue #10](https://github.com/manuelmhtr/validate-rfc/issues/10)
- https://es.stackoverflow.com/questions/140420/validacion-de-rfc-con-errores


## Relacionado

Además de validar el formato, necesitas validar que un RFC esté registrado en el SAT o no esté en una lista negra? Prueba con [Verifier](https://rapidapi.com/manuelmhtr/api/verifier).

## Licencia

MIT
