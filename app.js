/* =================================================================

 Sección 2: Cómo funcionan las declaraciones y las uniones (binding)?

================================================================= */

/* -----------------------------------------------------------------
                Declaraciones de variables VAR vs LET
----------------------------------------------------------------- */

// - El ambito de una variable (llamado "scope" en ingles) es la zona del programa en la que se define la variable. Javascript define dos ambitos para las variables: Global y Funcion

// - Cuando usamos la declaracion "var" y hacemos referencia a esta variable antes de su definicion, javascript interpretara como "undefined" su valor, cuando debiese tirar un error de declaracion, ya que tecnicamente queremos usar una variable antes de ser definida, esto se resuelve con la declaracion "let"

// console.log( mensaje )

// var mensaje = "Hola mundo"

// - En el siguiente ejemplo al declarar la variable con "let" y al hacer referencia antes de su definicion Javascript nos tirara un error de referencia explicando que no podemos acceder a la variable antes de ser inicializada, lo cual es una manera mas clara de indentificar el problema

// console.log( mensaje )

// let mensaje = "Hola mundo"

/* -----------------------------------------------------------------
                              Hoisting
----------------------------------------------------------------- */

// - Una explicacion de porque sucede asi el funcionamiento de la declaracion "var" se debe a un comportamiento base de JavaScript llamado "Hoisting", cuando tenemos este codigo:

// if ( 1 === 3 ) {
//   var mensaje = "Hola Mundo"
// }

// console.log( mensaje )

// - A pesar de que queremos acceder a una variable, en este caso "mensaje", despues de ser declarada, hay que considerar que no podremos acceder a su valor debido a varios factores:

// - El primero es que la variable ha sido declarada dentro de una funcion que no retorna su valor, por lo que al querer acceder desde el "scope" global nos deberia tirar un error

// - Lo segundo es que, como ya explicamos anteriormente, cuando las variables son definidas con "var" siempre su valor inicial sera "undefined" a menos que se haga referencia a ella dentro del mismo "scope" obteniendo su valor "real" declarado, esto sucede por el llamado "Hoisting"

// - El "Hoisting" es un comportamiento de JavaScript que permite que las declaraciones de variables y funciones con "var" se muevan al principio del ambito en el que se encuentran, esto permite que esten siempre disponibles para poder referenciarlas en cualquier momento, entonces segun esto el codigo anterior javascript lo interpreta asi:

// var mensaje = undefined

// if ( 1 === 3 ) {
//   mensaje = "Hola Mundo"
// }

// console.log( mensaje )

// - Ahora cuando definimos una variable con "let" no es afectada por el "Hoisting", en el siguiente caso, la variable "mensaje" declarada con "let" solo existe en el "scope" del "if", por lo que al querer acceder a ella desde el "scope global" JavaScript nos devolvera un error de definicion
if ( 1 === 3 ) {
  let mensaje = "Hola Mundo"
}

console.log( mensaje )