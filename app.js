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
// if ( 1 === 3 ) {
//   let mensaje = "Hola Mundo"
// }

// console.log( mensaje )

/* -----------------------------------------------------------------
              Con Let no existen las re declaraciones
----------------------------------------------------------------- */

// - Otra gran diferencia entre "let" y "var" es que con var podemos re declarar una variable tantas veces queramos:

// var mensaje = "primero"
// var mensaje = "segundo"
// var mensaje = "tercero"
// var mensaje = "cuarto"

// console.log( mensaje ) // cuarto

// - Con "let" esto no es posible, incluso dara un error de definicion, ya que forzara a declarar una sola vez la variable

// var mensaje = "primero"
// var mensaje = "segundo"
// let mensaje = "tercero"
// var mensaje = "cuarto"

// console.log( mensaje ) // Error: Identifier 'mensaje' has already been declared

// - Debido a este comportamiento al declarar una variable con "let" se podria pensar que el siguiente console.log dara un error:

// let mensaje = "Hola"

// if ( true ) {
//   let mensaje = "Que tal"
// }

// console.log( mensaje ) // Hola

// - Pero sucede que si bien se ha declarado la misma variable dos veces, tecnicamente no son la misma variable, eso es por que una ha sido declarada en el "scope global" y otra en el "scope" del "if", por eso no dara error, para corroborar esto podemos ejecutar un console.log con el valor de "mensaje" dentro del "scope" del "if" y otro console.log con el valor de "mensaje" en el "scope global"

// let mensaje = "Hola"

// if ( true ) {
//   let mensaje = "Que tal"
//   console.log( mensaje ) // Que tal
// }

// console.log( mensaje ) // Hola

/* -----------------------------------------------------------------
                    Declaraciones de constantes
----------------------------------------------------------------- */

// - En Ecmascript 6 aparecieron las variables de tipo constante "const", su funcionamiento es casi igual a "let", salvo que la variables definidas con "const" no pueden cambiar/variar/mutar/reasignar su valor, con la definicion "let" si pueden cambiar/variar/mutar/reasignar su valor

// - En Javascript es una buena practica, pero no obligatorio, que al declarar una variable con "const" sea escrita en Mayusculas

// const IMPUESTO_SV = 15.25

// - Y a diferencia de las declaraciones "var" y "let" dara un error si la variable es declarada con "const" pero no inicializada:

// const IMPUESTO_SV // Error: Missing initializer in const declaration

// - Como explique anteriormente no se puede cambiar/variar/mutar/reasignar el valor de una variable constante:

// IMPUESTO_SV = 30 // Error: Assignment to constant variable

// - Al igual que la declaracion "let", "const" asigna su valor por scope:

// const IMPUESTO_SV = 15.25

// if ( true ) {
//   const IMPUESTO_SV = 19.75
//   console.log( IMPUESTO_SV ) // 19.75
// }

// console.log( IMPUESTO_SV ) // 15.25

// - Un comportamiento "extraño" de la definicion "const" es que si bien su valor debe ser constante, cuando definimos un objeto con esta declaracion, podemos cambiar el valor de sus propiedades, pero no re inicializar el objeto completo:

// const PERSONA = {
//   nombre: "Tulio",
//   apellido: "Triviño"
// }

// // - Esto dara error:

// // const PERSONA = {
// //   nombre: "Policarpio",
// //   apellido: "Avendañor"
// // }

// // - Pero esto no:

// PERSONA.nombre = "Bodoque"

// console.log( PERSONA ) // {nombre: 'Bodoque', apellido: 'Triviño'}

/* -----------------------------------------------------------------
                Declaraciones de variables en ciclos
----------------------------------------------------------------- */

// - Para poner en practica los conceptos explicados anteriormente veamos como funcionaria un ciclo FOR con las diferentes declaraciones de variables

// - Cuando declaramos una variable con "var" en los argumentos de un ciclo FOR, su valor podra ser accesible desde cualquier "scope"

// for ( var i = 0; i <= 10 ; i++) {

// }

// console.log( i ) // 11

// - En cambio cuando definimos una variable con "let" en los argumentos de un ciclo FOR, su valor solo existira en el "scope" del ciclo FOR

// for ( let i = 0; i <= 10 ; i++) {

// }

// console.log( i ) // Uncaught ReferenceError: i is not defined

// - Al definir una variable con "const" en los argumentos de un ciclo FOR Javascript nos dara un error ya que el valor de una variable definida con "const" no puede cambiar/variar/mutar/reasignar

// for ( const i = 0; i <= 10 ; i++) {

// }

// console.log( i ) // Uncaught TypeError: Assignment to constant variable

/* -----------------------------------------------------------------
        Declaraciones de variables en funciones con ciclos
----------------------------------------------------------------- */

// - Suponiendo que tenemos un array vacio el cual iremos "rellenando" con funciones que imprimen el valor del contador "i"

// var funciones = []

// for ( var i = 0; i < 10 ; i++) {

//   funciones.push( function(){ console.log(i) } )

// }

// - Uno esperaria que al "barrer" el arreglo "funciones" cada console.log imprimiera el numero del contador "i" del 0 hasta el 9, pero el resultado imprime 10 veces 10, esto sucede por que como se declaro la variable con "var" con alcance al "scope global" el valor de "i" fue sobreescrito en cada ciclo y al finalizar su valor queda en 10, entonces cuando hacemos el "barrido" los console.log el valor de la variable "i" es de 10
// funciones.forEach( function( func ) {

//   func()

// })

// - Si aun asi quisieramos seguir utilizando "var" para poder imprimir del 0 hasta el 9, habria que realizar una modificacion un poco mas compleja, añandiendo logica innecesaria:

// var funciones = []

// for ( var i = 0; i < 10 ; i++) {

//   funciones.push(

//     (function( i ) {

//       return function(){ console.log( i ) }

//     })(i)

//    )

// }

// funciones.forEach( function( func ) {

//   func()

// })

// - En Ecmascript 6 podemos evitar hacer todo esto y dejar el ejemplo inicial con el comportamiento esperado simplemente cambiando la declaracion de la variable por "let"

var funciones = []

for ( let i = 0; i < 10 ; i++) {

  funciones.push( function(){ console.log( i ) } )

}

funciones.forEach( function( func ) {

  func()

})