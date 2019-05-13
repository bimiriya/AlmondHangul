# Almond Hangul

[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://github.com/bimiriya/AlmondHangul/tree/master)
### Disclaimer
__✓__ Almond Hangul es una librería para transformar texto  en caracteres coreanos

`✖` __No__ es una herramienta de traducción, solo de transcripción para palabras de fonética española


 Hecho con amors &#x1F495;


### Dependencias
* [Hangul.js](https://github.com/e-/Hangul.js) para la construcción de las sílabas coreanas

### Implementación

1. Añade el script de Hangul.js antes que el de Almond Hangul
    ```
    <script src="Hangul.js"></script>
    <script src="almondhangul.js"></script>
    ```
2. Define el input que recibe los caracteres españoles por medio del id __AlmondText__
    ```
    <input type="text" id="AlmondText">
    ```
3. Define el elemento que recibirá el valor de caracteres coreanos
    ```
    <h1 id="AlmondHangul"></h1>
    ```
### License
----

MIT


**Free Software, Hell Yeah!**