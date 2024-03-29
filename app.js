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

// var funciones = []

// for ( let i = 0; i < 10 ; i++) {

//   funciones.push( function(){ console.log( i ) } )

// }

// funciones.forEach( function( func ) {

//   func()

// })

/* =================================================================

 Sección 3: Nuevos métodos con cadenas de caracteres - Strings

================================================================= */

/* -----------------------------------------------------------------
     Segmentos de caracteres - startsWith - endsWith - includes
----------------------------------------------------------------- */

// var saludo = "Hola Mundo!"

// - En Ecmascript 5 para saber si la primera letra de una cadena era la que necesitabamos, en este caso "H", habia que hacerlo de esta manera:

// console.log( saludo.substr( 0,1 ) === "H" ) // true

// - Ahora con Ecmascript 6 podemos utilizar el metodo "startsWith"

// console.log( saludo.startsWith( "H" ) ) // true

// - El metodo "startsWith" tambien acepta palabras

// console.log( saludo.startsWith( "Hola" ) ) // true

// - Ahora para saber si la ultima letra o palabra coincide con lo que necesitamos usamos el metodo "endsWith"

// console.log( saludo.endsWith( "o!" ) ) // true

// - Para saber si existe un determinado caracter o palabra en una cadena ahora podemos usar el metodo "includes"

// console.log( saludo.includes( "x" ) ) // false

// - Estas funciones poseen un parametro opcional, que es para hacer la evaluacion en una posicion especifica de la cadena, por ejemplo si queremos encontrar los caracteres "Mu" a partir de la posicion en la cual deberian encontrarse en la cadena, la posicion de los caracteres "Mu" en la cadena "Hola Mundo!" seria la 5, ya que la primera letra de la cadena corresponde a la posicion 1

// console.log( saludo.startsWith( "Mu", 5 ) ) // true

// - Tambien si nos equivocamos en la posicion podriamos obtener un "false", por ejemplo, buscar el caracter "a" en la cadena "Hola Mundo!" a partir de la posicion 6, dara "false", porque el caracter "a" se encuentra en la posicion 3

// console.log( saludo.includes( "a", 6 ) ) // false

/* -----------------------------------------------------------------
                 Repeticiones de strings - Repeat
----------------------------------------------------------------- */

// - En Ecmascript 6 existe el metodo "repeat", el cual permite duplicar caracteres, pasandole como argumento la cantidad de veces que se quiere repetir el caracter

// - Por ejemplo si queremos repetir dos veces la palabra "hola":

// let texto = "Hola"

// console.log( texto.repeat(2) ) // HolaHola

// - Ahora podemos crear maneras "novedosas" para mostrar la informacion utilizando "repeat":

// - Defino una cantidad de espacios base:

// const ESPACIOS = 12

// - Defino dos arreglos de datos que estan relacionados:

// let nombres = ["Tulio", "Patana", "Juanin"]
// let telefonos = ["99887766", "33445566", "22334455"]

// - Recorro cada arreglo y utilizando un formato especifico de impresion mas el metodo repeat puedo crear esta tabla en el console.log:

// for ( i in nombres ) {

//   let dif = ESPACIOS - nombres[i].length

//   console.log( nombres[i] + " ".repeat( dif ) + "| " + telefonos[i] )

// }

// Output:

// Tulio       | 99887766
// Patana      | 33445566
// Juanin      | 22334455

/* -----------------------------------------------------------------
            Plantillas literales - Template Literals
----------------------------------------------------------------- */

// - Las "Template literals" sirven para habilitar el uso de expresiones JavaScript en cadenas de caracteres, se definen usando el simbolo de comillas invertidas ( `` ) y para ejecutar una expresion se declara con el simbolo dolar envuelto en llaves ( ${} )

// let nombre = "Tulio"
// let apellido = "Triviño"

// function obtenerNombre() {
//   return "Tulio Triviño"
// }

// - Concatenacion de caracteres con variables de la manera clasica

// let nombreCompletoClasico = "El nombre completo es: " + nombre + " " + apellido
// console.log( nombreCompletoClasico )

// - Concatenacion de caracteres con variables usando "Template literals"

// let nombreCompletoTemplate = `El nombre completo es: ${ nombre } ${ apellido }`
// console.log( nombreCompletoTemplate )

// - Concatenacion de caracteres con funcion usando "Template literals"
// let nombreCompletoTemplateFuncion = `El nombre completo es: ${ obtenerNombre() }`
// console.log( nombreCompletoTemplateFuncion )

// - La gran ventaja de las "Template literals" aparece cuando usamos "multilinea", ya que podemos declarar caracteres especiales sin que se rompa la cadena:

// - Declaracion multilinea clasica:

// let multilineaClasica = "<h1 class=\"nombre\">" + nombre + "</h1> \n<p class=\"apellido\">" + apellido + "</p>"
// console.log( multilineaClasica )

// Declaracion multilinea con "Template literals"

// let multilineaTemplate = `<h1 class="nombre">${ nombre }</h1>
// <p class="apellido">${ apellido }</p>`

// console.log( multilineaTemplate )

/* -----------------------------------------------------------------
             Plantillas etiquetadas - Template tags
----------------------------------------------------------------- */

// - Los "Template literals" poseen una funcionalidad que permite validar o formatear los datos de una plantilla antes de asignarlos a una variable, esto se llama "Template tags", para utilizarlos primero se debe crear una funcion que sera la encargada de validar/formatear el "Template literal" y se asigna antes del mismo, pero a diferencia de un llamado de funcion normal se invoca sin los parentesis, en el estandar de Ecma se definio asi, para que Javascript sepa diferenciar entre la invocacion normal de una funcion y un "Template tag"

// - Creo la funcion que va a validar/formatear mi "template string", esta funcion desde la cadena de caracteres recibe dos argumentos, el primero se llama "literals" que es un array con literalmente los caracteres de la cadena y el segundo se llama "substituciones" que es un arreglo con todos los datos resultantes de las expresiones en la plantilla

// function etiqueta( literales, ...substituciones ) {

//   let resultado = ""

//   console.log( literales )
//   console.log( substituciones );

//   for( let i = 0; i <= substituciones.length ; i++){
//     resultado += literales[i]
//     resultado += substituciones[i] || ''
//   }

//   return resultado

// }

// let unidades = 5, costo_unitario = 10

// let mensaje = etiqueta`${ unidades } lapices cuestan ${ unidades * costo_unitario } pesos`

// console.log( mensaje )

/* -----------------------------------------------------------------
        Usando valores "raw" (crudos) en templates literales
----------------------------------------------------------------- */

// - Los "Template literals" poseen un tag/metodo unico para crear cadenas de caracteres en crudo tal como serían generadas por la función por defecto de plantilla, concatenando sus partes

// let mensaje = `Hola \nMundo\\`, mensaje2 = String.raw`Hola \nMundo\\`

// console.log( mensaje, mensaje2 )

/* =================================================================

 Sección 4: Funciones en ECMAScript 6

================================================================= */

/* -----------------------------------------------------------------
            Parametros/Argumentos - opcionales/defecto
----------------------------------------------------------------- */

// - En las versiones anteriores a Ecmascript 6 cuando no enviabamos un parametro que necesitaba una funcion como argumento, esta nos podria retornar undefined:

// function saludo( mensaje, tiempo ) {

//   setTimeout( function() {

//     console.log( mensaje )

//   }, tiempo);

// }

// saludo() // undefined

// - Lo que se suele hacer para evitar esto es colocar un valor opcional por defecto, de dos manera diferentes

// function saludo( mensaje, tiempo ) {

//   // - Primera forma, si no viene el parametro mensaje reemplazar su valor por "Hola Mundo"
//   // mensaje = mensaje || "Hola Mundo"

//   // - Segunda forma, si el tipo de valor del parametro mensaje es "undefined", reemplazar su valor por "Hola Mundo"
//   mensaje = ( typeof mensaje !== "undefined" ) ? mensaje : "Hola Mundo"

//   setTimeout( function() {

//     console.log( mensaje )

//   }, tiempo);

// }

// saludo() // "Hola Mundo"

// - Con Ecmascript 6 esto se simplico con la asignacion de valores por defectos en los argumentos

// - Si al invocar la funcion "saludo" no se declara el parametro "mensaje" se le asignara por defecto el valor de "Hola Mundo" al argumento "mensaje"

// function saludo( mensaje = "Hola Mundo", tiempo ) {

//   setTimeout( function() {

//     console.log( mensaje )

//   }, tiempo);

// }

// saludo() // "Hola Mundo"

// - Ejemplo con argumentos opcionales de tipo "function" y "Object"

// function saludar( fn = fnArg, titere = objArg ) {

//   fn()

//   console.log( titere )

// }

// function fnArg() {
//   console.log( "Hola Mundo" )
// }

// var objArg = {
//   nombre: "Tulio"
// }

// // - Sin definicion de argumentos
// saludar()

// // - Con definicion de argumentos
// saludar( function() { console.log( "Cambiando valores opcionales") }, { nombre: "Patana" } )

/* -----------------------------------------------------------------
      Cómo los valores por defecto afectan el objeto "arguments"
----------------------------------------------------------------- */

// - Las funciones poseen un objeto similar a un array llamado "Arguments", que contiene los valores de los argumentos pasados a esa funcion, "Arguments" no es un array, pero podemos acceder a las posiciones de sus elementos y a la propiedad length

// - Cuando definimos una funcion con parametros y esos parametros son declarados como argumentos en la invocacion de la funcion, sus valores quedaran referenciados en el objeto "Arguments"

// function valoresArguments( a, b ) {

//   console.log( arguments )

// }

// valoresArguments( 2, 3 ) // Arguments(2) [2, 3]

// - Cuando definimos valores por defecto en los parametros estos no seran referenciados en el objeto "Arguments"

// function valoresArguments( a = 2, b = 3 ) {

//   console.log( arguments )

// }

// valoresArguments() // Arguments []

/* -----------------------------------------------------------------
             Parametros Rest - Parametros sin nombre
----------------------------------------------------------------- */

// - En Ecmascript 6 los parámetros "Rest" nos permiten representar un número indefinido de argumentos como un array

// - Ese parametro se convierte en un arreglo que contiene el "resto" de los parametros pasados a la funcion, de ahi se origina el nombre "Rest"

// - Por ejemplo si necesito crear una funcion que permita agregar alumnos a un arreglo, donde el primer parametro sea el arreglo actual de alumnos y los demas parametros sean N cantidad de alumnos:

// - En Ecmascript 5:
// function agregar_alumno() {

//   console.log( arguments )

//   for ( var i = 1; i < arguments.length; i++) {

//     arguments[0].push( arguments[i] )

//   }

//   return arguments[0]

// }

// var alumnos_arr = ["Tulio"]

// var alumnos_arr_resto = agregar_alumno( alumnos_arr, "Patana", "Policarpio", "Cindy", "Juanin")

// console.log( alumnos_arr_resto )

// - En Ecmascript 6:

// function agregar_alumno( arr_alumnos, ...alumnos ) {

//   console.log( arguments )

//   for ( var i = 0; i < alumnos.length; i++) {

//     arr_alumnos.push( alumnos[i] )

//   }

//   return arr_alumnos

// }

// var alumnos_arr = ["Tulio"]

// var alumnos_arr_resto = agregar_alumno( alumnos_arr, "Patana", "Policarpio", "Cindy", "Juanin")

// console.log( alumnos_arr_resto )

// - Con el parametro "Rest" queda mucho mas claro que se podran enviar N cantidad de argumentos

/* -----------------------------------------------------------------
             Restricciones del Parametro Rest
----------------------------------------------------------------- */

// - Existen dos restricciones para el uso del parametro "Rest", estas restricciones fueron creadas para que Javascript pueda diferenciar, los parametros con nombre de los parametros anonimos enviados en el arreglo de "Rest"

// - 1 - Solo puede existir un parametro "Rest" en la funcion
// function juntar_nombres( ...apellidos, ...nombres ){
//   // cualquier cosa
// }

// juntar_nombres() // Uncaught SyntaxError: Rest parameter must be last formal parameter

// - 2 - El parametro "Rest" debe ir siempre como ultimo parametro
// function juntar_nombres( ...apellidos, nombre ){
//   // cualquier cosa
// }

// juntar_nombres() // Uncaught SyntaxError: Rest parameter must be last formal parameter

/* -----------------------------------------------------------------
                           Operador Spread
----------------------------------------------------------------- */

// - Es facil confundir el operador "Spread" con el operador "Rest", ya que los dos se representan con tres puntos seguidos (...), la mayor diferencia es que "Spread" sirve para "esparcir" un elemento iterable, ya sea un arreglo (array) o cadena (string) donde cero o mas argumentos son esperados, en cambio "Rest" siempre sera declarado como un conjunto ilimitado de parametros anonimos que podria recibir una funcion

// - El operador de propagación crea una copia superficial del iterable, descomponiéndolo en sus elementos individuales

// - En Ecmascript 5 era frecuente usar Function.prototype.apply en casos donde quieres usar los elementos de un arreglo como argumentos de una función.

// var numeros = [ 1, 5, 10, 20, 100, 234]

// var max = Math.max.apply( null, numeros )

// console.log( max )

// Con el operador "Spread" (spread syntax), el código anterior puede ser escrito como:

// let numeros = [ 1, 5, 10, 20, 100, 234]

// let max = Math.max( ...numeros )

// console.log( max )

/* -----------------------------------------------------------------
            Romper la relación de referencia de los objetos
----------------------------------------------------------------- */

// let persona1 = {
//   nombre: 'Tulio',
//   edad: 35,
//   profundo: {
//     a: "b",
//     hola: "chao"
//   }
// }

// - En Javascript cuando asignamos un objeto a una variable estamos asignando su referencia, es decir: su posicion en memoria. Acá por ejemplo podriamos pensar que "persona2" es un objeto distinto, o mejor dicho una copia de "persona1" ya que estas dos variables tienen nombres distintos, pero en realidad las dos estan haciendo referencia al mismo objeto
// let persona2 = persona1

// - Para comprobar esto podemos cambiar el valor de la propiedad "nombre" en el objeto "persona2"
// persona2.nombre = 'Policarpio'

// - Uno esperaria que el valor de la propiedad "nombre" en el objeto "persona2" sea distinto al valor de la propiedad "nombre" en el objeto "persona1", pero sucede que estas dos variables hacen referencia al mismo espacio en memoria, osea al mismo objeto, si yo intento cambiar algun valor de propiedad desde cualquier referencia en realidad estoy actualizando el valor del mismo objeto, por lo tanto, en este caso, el valor de la propiedad "nombre" tanto en la referencia "persona1" como en "persona2" sera el mismo
// console.log( persona1 )
// console.log( persona2 )

// - Ahora, para poder hacer la asignacion o "copia" de un objeto sin que exista una referencia, podemos usar el operador spread que copiara todas las propiedades del objeto "persona1" y se las asignara junto con su valor a un nuevo objeto llamado "persona2"

// let persona2 = { ...persona1 }

// - Al cambiar el valor de la propiedad "nombre"

// persona2.nombre = 'Policarpio'

// - Hay que tener en consideracion, que esta manera de "copiar" objetos es "superficial", es decir, si tenemos objetos anidados como valores de propiedades no seran "copiados" y se asignara solo su referencia, por lo que si intentamos modificar una propiedad de algun objeto anidado cambiara tanto en "persona2" como en "persona1", a este comportamiento se le conoce como "shallow cloning"

// persona2.profundo.hola = 'Adios'

// console.log( persona1 )
// console.log( persona2 )

// - Para hacer una "copia" incluso de los objetos anidados, podemos usar una tecnica como la siguiente:

// const nuevoObjeto = JSON.parse(JSON.stringify( objetoOriginal ))

// - O usar alguna libreria como "lodash", a este tipo de "copia" se le conoce como "Deep cloning" y permite crear una referencia completamente nueva a partir de un objeto

/* -----------------------------------------------------------------
        Añadir propiedades a objetos a partir de otros objetos
----------------------------------------------------------------- */

// let persona1 = {
//   nombre: 'Tulio',
//   edad: 33
// }

// let persona2 = {
//   nombre: 'Juanin',
//   edad: 28,
//   direccion: 'Titirlquen 233232',
//   conduce: true,
//   vehiculo: true,
//   vegetariano: false,
//   casado: true
// }

// - Suponiendo que por algun motivo necesitamos en "persona1" las propiedades de "persona2", pero manteniendo los valores actuales en "persona1", podemos hacerlo de la siguiente manera:

// - Copiando de manera literal cada uno de los valores de "persona2" y asignarles esos valores a "persona1":

// persona1.direccion = persona2.direccion // ...Y asi con cada propiedad, lo cual si tenemos miles de propiedades es un trabajo muy ineficiente de hacer

// - La forma mas eficiente es obtener las propiedades de "persona2" con el operador "spread" y asignarle estas propiedades a "persona1", para mantener las propiedades actuales de "persona1" se las asignamos al final para sobreescribir los valores de "persona2"

// persona1 = { ...persona2, ...persona1 }

// console.log( persona1 )
// console.log( persona2 )

/* -----------------------------------------------------------------
        Diferencias entre los operadores "Spread" y "Rest"
----------------------------------------------------------------- */

// - REST: Junta los elementos de un arreglo
// - SPREAD: Esparce los elementos como si fueran enviados de forma separada

// function saludarRest( saludo, ...nombres ) {

//   for ( i in nombres ) {
//     console.log( `${saludo}, ${nombres[i]}` );
//   }

// }

// saludarRest( "Hola", "Tulio", "Juanin", "Bodoque" )

// function saludarSpread( saludo, ...nombres ) {

//   console.log( `${saludo} ${nombres}.` );

// }

// let personas = ["Tulio", "Juanin", "Bodoque"]

// saludarSpread( "Que tal!!", personas )

// Otro ejemplo con "spread"

// let salsas = ["Yogurth", "Aceto"]
// let ensalada = ["Lechuga", "Rucula", ...salsas, "Limon", "Palta"]

// console.log( ensalada )

/* -----------------------------------------------------------------
 Verificar si una funcion esta siendo invocada con el operador "new"
----------------------------------------------------------------- */

// - En Ecmascript 5 y versiones anteriores, las funciones sirven con un doble proposito, de ser llamadas con o sin la palabra reservada "new"

// function Persona( nombre ) {

//   // Cuando llamamos sin "new", el valor de "this" pasa a ser el objeto global, por tanto este valor se asignara a ese objeto, por ejemplo, en el navegador el objeto global es "window", y ahi se crearia la propiedad nombre
//   this.nombre = nombre

// }

// - Cuando hacemos el llamado con "new" el valor de "THIS" dentro de la funcion es un nuevo objeto y ese nuevo objeto es retornado

// var persona = new Persona("Tulio")

// - Cuando hacemos el llamado sin "new", simplemente esperamos el retorno de algun valor procesado que puede ser un objeto, undefined o null

// var noEsPersona = Persona("Tulio")

// console.log( persona ) // Persona {nombre: 'Tulio'}
// console.log( noEsPersona ) // undefined

// - Podemos crear una validacion, para evitar que el valor de "this" pase al objeto global y asegurarnos que la funcion sea llamada con el operador "new"

// function Persona( nombre ) {

//   console.log( this )

//   if( this instanceof Persona ) {
//     this.nombre = nombre
//   } else {
//     throw new Error('La funcion "Persona", debe ser invocada con el operador "new"')
//   }

// }

// - Esto ultimo esta bien, pero existia un problema en Ecmascript 5, todas las funciones poseen en su prototipo un metodo que permite setear, como primer parametro el valor de "this", este metodo se llama "Call"

// var persona = new Persona("Tulio")

// - Acá "simulamos" el "this" usando "call", declarando "this" con un valor que fue creado con el operador "new", la idea es crear otro objeto de tipo "Persona", pero en realidad lo que terminamos haciendo es actualizar el valor del objeto "persona" y por lo tanto nuestra funcion "Persona" no logra lanzar el error que identifica si la llamada a la funcion fue con "new", esto es un problema
// var noEsPersona = Persona.call( persona, "Bodoque")

// console.log( persona ) // Persona {nombre: 'Bodoque'}
// console.log( noEsPersona ) // undefined

// - Para resolver este problema en Ecmascript 6 se creo una "meta propiedad" llamada "new.target"

// - Una meta propiedad, es una propiedad de un "no-objeto", que provee informacion adicional relacionada con su procedencia ( como el "new" ). Cuando el constructor de la funcion es llamada, "new.target" se "llena" con el operador "new". Si el metodo "Call" es ejecutado, "new.target" no estara definida ya que no se ejecuto el constructor

// - En palabras mas sencillas, si queremos evaluar si una funcion fue creada con el operador "new" debemos usar "new.target"

// function Persona( nombre ) {

//   console.log( this )

//   if( typeof new.target !== 'undefined' ) {
//     this.nombre = nombre
//   } else {
//     throw new Error('La funcion "Persona", debe ser invocada con el operador "new"')
//   }

// }

// var persona = new Persona("Tulio")

// // - Ahora si lanzara el error, ya que esta invocacion no se esta creando con el operador "new"
// var noEsPersona = Persona.call( persona, "Bodoque")

/* =================================================================

 Sección 5: Funciones de Flecha - Arrow Functions

================================================================= */

/* -----------------------------------------------------------------
              Arrow Functions - Funciones de Flecha
----------------------------------------------------------------- */

// - Este tipo de funciones tienen una sintaxis variada que depende de lo que quieras realizar, pero normalmente tienen la misma estructura:

// - 1. Funcion con argumentos
// - 2. Seguido de una "flecha gorda" =>
// - 3. Seguido del cuerpo de la funcion

// - ¿Para que sirven?

// - De manera muy generica:

// - 1. Menos codigo que es mas simple de interpretar
// - 2. No hay un nuevo "this" dentro de las funciones
// - 3. No hay constructores, no tiene "new"
// - 4. No puedes cambiar el valor del "this" aunque uses "call()", "apply()" o "bind()"
// - 5. No hay objeto "arguments"

// - Tecnicamente hablando, son funciones definidas con una nueva sintaxis que usa una flecha "=>", pero se comportan de una forma muy diferente a las funciones normales en Ecmascript 5:

// - 1. No hay creacion de "this, super, arguments y new.target"
// - 2. No pueden ser llamadas con "new"
// - 3. No tienen "prototype"
// - 4. No pueden cambiar el valor de "this"
// - 5. No hay objeto "arguments"
// - 6. No pueden tener nombres de parametros duplicados

/* -----------------------------------------------------------------
                  Ejemplos de funciones de Flecha
----------------------------------------------------------------- */

// - Funcion tradicional
// var traditionalFunction = function ( valor ) {
//   return valor
// }

// - Homonimo de la funcion tradicional con la sintaxis de funcion de flecha
// let arrowFunction = valor => valor

// console.log( traditionalFunction("tradicional") )

// - Las funciones de flecha tienen un return implicito cuando solo poseen una unica expresion
// console.log( arrowFunction("flecha") )

// - Sumando numeros:

// var sumaTradicional = function ( num1, num2 ) {
//   return num1 + num2
// }

// let sumaFlecha = ( num1, num2 ) => num1 + num2

// console.log( sumaTradicional( 2, 2) )
// console.log( sumaFlecha( 2, 2) )

// - Sin parametros:

// var sinParTradicional = function () {
//   return "Hola Mundo"
// }

// let sinParFlecha = () => "Hola Mundo"

// console.log( sinParTradicional() )
// console.log( sinParFlecha() )

// - Multi expresion, multi linea:

// var saludarTradicional = function ( nombre ) {

//   var salida = "Hola, " + nombre

//   return salida

// }

// - Para declarar varias expresiones en las funciones de flecha debemos añadir llaves {}
// let saludarFlecha = nombre => {

//   let salida = `Hola, ${nombre}`

//   return salida
// }

// console.log( saludarTradicional( "Tulio" ) )
// console.log( saludarFlecha( "Tulio" ) )

// // - Regresar un objeto literal:

// var obtenerIdTradicional = function ( id ) {

//   return {
//     id: id,
//     nombre: "31 Minutos"
//   }

// }

// - Para declarar un objeto literal en el cuerpo de una funcion de flecha, debemos declararlo entre parentesis (), ya que si no lo hacemos, javascript lo considerara como declaracion de expresion. Tambien podemos declarar solo el nombre del parametro, cuando su valor se llama igual, en este caso "id"
// var obtenerIdFlecha = id => ({ id, nombre: "31 Minutos" })

// console.log( obtenerIdTradicional( 24500 ) )
// console.log( obtenerIdFlecha( 24500 ) )

/* -----------------------------------------------------------------
               Creando funciones de flecha anonimas
----------------------------------------------------------------- */

// - Funcion anonima tradicional
// var saludoTradicional = function ( nombre ) {

//   return "Hola " + nombre

// }( "Tradicional" )

// console.log( saludoTradicional )

// - Funcion de flecha anonima
// var saludoFlecha = ( nombre => `Hola ${nombre}` )( "Flecha" )

// console.log( saludoFlecha )

/* -----------------------------------------------------------------
              Funciones de flecha y el valor de "this"
----------------------------------------------------------------- */

// var manejador = {
//   id: "123",
//   init: function(){

//     // - Cuando usamos funciones tradicionales se crea el valor de "this" que hara referencia al contexto de su creacion, en este caso "this" posee el valor de "document", pero nosotros necesitamos que "this" tenga el valor de "manejador", para solucionar eso en Ecmascript 5 le pasamos el "this" de "manejador" a la funcion mediante un "bind()":

//     // document.addEventListener("click", (function( event ) {
//     //   this.clickEnPagina( event.type )
//     // }).bind(this))

//     // - En cambio en Ecmascript 6 con las funciones de flecha no se crea un nuevo contexto de "this", por lo tanto aqui apuntara directamente al "this" del objeto "manejador":

//     document.addEventListener("click", event => this.clickEnPagina( event.type ) )

//   },
//   clickEnPagina: function( type ) {
//     console.log( "Manejando " + type + " para el id: " + this.id )
//   }
// }

// manejador.init()

/* -----------------------------------------------------------------
                   Funciones de Flecha y Arreglos
----------------------------------------------------------------- */

// - Una de las mayores ventajas de usar Funciones de flecha, es que en la practica optimiza el codigo:

// var arreglo = [ 5, 10, 11, 2, 1, 9, 20 ]

// - Ordenando un array con funcion tradicional

// var ordenadoTradicional = arreglo.sort( function( a, b ) {
//   return a - b
// })

// console.log( ordenadoTradicional )

// - Ordenando un array con funcion de flecha

// var ordenadoFlecha = arreglo.sort( ( a, b ) => a - b )

// console.log( ordenadoFlecha )

/* -----------------------------------------------------------------
         Funciones de flecha: Typeof, new y arguments
----------------------------------------------------------------- */

// - Las funciones de flecha pueden ser identificadas como cualquier otra funcion:

// var restar = ( a, b ) => a - b

// console.log( typeof restar )
// console.log( restar instanceof Function )

// - Las funciones de flecha no poseen constructor, por lo que no pueden ser invocadas con "new":

// var restar = new restar( 1,2 ) // Uncaught TypeError: restar is not a constructor

// - Las funciones de flecha no poseen el objeto "Arguments":

// (( a, b ) => {
//  console.log( arguments[0] )
// })() // Uncaught ReferenceError: arguments is not defined

// - Sin embargo si son invocadas dentro de una funcion tradicional, podran hacer referencia a los "Arguments" de esa funcion:
// function ejemplo( x, y ) {
//   (( a, b ) => {
//     console.log( arguments[0] ) // 10
//   })()
// }

// ejemplo( 10, 20 )

/* =================================================================

 Sección 6: Adiciones a los objetos

================================================================= */

/* -----------------------------------------------------------------
      Simplificando la declaracion de propiedades en objetos
----------------------------------------------------------------- */

// - En Ecmascript 5 los objetos literales son colecciones de pares:

// var objeto = {
//   nombre : "Patana",
//   apellido: "Tufillo",
//   edad: 20
// }

// - Si deseamos crear un objeto a partir de una funcion, podriamos hacerlo de la siguiente manera:

// function crearTitere( nombre, apellido, edad ) {

//   return {
//     nombre: nombre,
//     apellido: apellido,
//     edad: edad
//   }

// }

// - Pero con Ecmascript 6 podemos omitir el nombre del valor de la propiedad si es igual al nombre de la propiedad:

// function crearTitere( nombre, apellido, edad ) {

//   return {
//     nombre,
//     apellido,
//     edad
//   }

// }

// let patana = crearTitere( "Patana", "Tufillo", 20 )

// console.log( patana )

/* -----------------------------------------------------------------
                     Metodos concisos en objetos
----------------------------------------------------------------- */

// - En Ecmascript 5 definimos los metodos en los objetos como un valor de funcion de una propiedad:

// var titere = {
//   nombre: "Tulio",
//   // - Propiedad "getNombre" con valor de funcion, esto es un metodo de objeto
//   getNombre: function() {
//     console.log( this.nombre )
//   }
// }

// - En Ecmascript 6 no es necesario declarar la palabra reservada "function" al momento de crear el metodo:

// var titere = {
//   nombre: "Tulio",
//   // - La propiedad "getNombre" es en si misma la funcion, esto es un metodo de objeto en Ecmascript 6
//   getNombre() {
//     console.log( this.nombre )
//   }
// }

// titere.getNombre()

/* -----------------------------------------------------------------
           Nombres de propiedades computadas o procesadas
----------------------------------------------------------------- */

// - En Ecmascript 5 podemos acceder y/o crear propiedades de un objeto con la notacion de corchetes [] y desde ahí asignarle/sobreescribir un valor a esa propiedad

// var titere = {}
// var apellido = "apellido"

// titere["primer_nombre"] = "Juan"
// titere["apellido"] = "Bodoque"

// console.log( titere["primer_nombre"] )
// console.log( titere["apellido"] )
// console.log( titere )

// - En Ecmascript 6 podemos definir directamente en el objeto la propiedad computada, esto basicamente nos podria servir para crear sufijos o prefijos de valores:

// var subFijo = " nombre"

// var titere = {
//   [ "Primer" + subFijo ]: "Juan",
//   [ "Segundo" + subFijo ]: "Carlos"
// }

// console.log( titere[ "Primer nombre"] ) // Juan
// console.log( titere[ "Segundo" + subFijo ] ) // Carlos

/* -----------------------------------------------------------------
                     Nuevo método: Object.is()
----------------------------------------------------------------- */

// - En Javascript cuando deseamos hacer comparaciones de valores podemos usar el operador == que significa "Igualdad no estricta", es decir, que compara el valor de las variables pero no sus tipos, o el operador === que significa "Igualdad estricta", es decir, que compara el valor y el tipo de las variables:

// - Por ejemplo si intentamos hacer la comparacion del cero positivo y el cero negativo con operador == y operador === en ambos casos dara "True", por que los valores matematicamente son iguales y son del mismo tipo, en este caso numerico:

// console.log( +0 == -0 ) // True
// console.log( +0 === -0 ) // True

//- Pero resulta que computacionalmente los valores son distintos y con los operadores anteriores no pudimos obtener esa comparacion, es ahi que en Ecmascript 6 se crea el metodo "Object.is()" que sirve para hacer una comparacion minuciosa, se pasan como parametros los valores a comparar y en este caso dara "False":

// console.log( Object.is( +0, -0 ) ) // False

// - Otro ejemplo, intentando comparar valores NaN (Not a number):

// - Tecnicamente un NaN al compararse con otro NaN no es igual debido al Estándar IEEE 754 que considera que los numeros flotantes no son iguales a si mismo y NaN se considera un numero flotante
// console.log( NaN == NaN ) // False
// console.log( NaN === NaN ) // False

// - Pero objetivamente un valor NaN significa que no es numero, por lo tanto al compararse en definicion un NaN con otro NaN son lo mismo
// console.log( Object.is( NaN, NaN ) ) // True

// - Otro ejemplo, si intentamos comparar un valor numerico con su mismo valor numerico, o un valor numerico con un caracter que sea igual a su valor ocurrira lo siguiente:

// - Con el comparador de "Igualdad no estricta" dara en ambos casos "True", ya que solo esta comparando el valor, pero no el tipo de valor
// console.log( 5 == 5 ) // True
// console.log( 5 == "5" ) // True

// - Con el comparador de "Igualdad estricta", el primer caso dara "True" y el segundo "False", ya que esta comparando valor y tipo, en el primer ejemplo el valor y tipo son iguales, pero en el segundo caso si bien ambos valores son el mismo valor, el primer dato es de tipo "num" y el segundo de tipo "string":

// console.log( 5 === 5 ) // True
// console.log( 5 === "5" ) // False

// - Con el comparador "Object.is()" se repite lo mismo que el comparador de "Igualdad estricta", ya que no existe un mayor nivel de precision en este ejemplo:

// console.log( Object.is( 5, 5 ) ) // True
// console.log( Object.is( 5, "5" ) ) // False

/* -----------------------------------------------------------------
                  Nuevo método: Object.assign()
----------------------------------------------------------------- */

// - En Ecmascript 5 cuando queriamos obtener todas las propiedades de un objeto y asignarselas a otro debiamos hacer lo siguiente:

// - Declaro una funcion que recibe dos objetos, uno que tiene todas las propiedades a copiar ( "objDonador" ) y otro objeto que recibira esas propiedades ( "objReceptor" )

// function mezclar( objReceptor, objDonador ) {

//   // - Obtengo un arreglo con las propiedades del "objDonador"
//   Object.keys( objDonador ).forEach( function( key ){

//     // - Y se las asigno una por una al "objReceptor", considerar que si existe una propiedad con el mismo nombre de otra esta sera reescrita quedando con el valor de la ultima propiedad obtenida
//     objReceptor[ key ] = objDonador[ key ]

//   })

//   return objReceptor

// }

// var objReceptor = {}
// var objDonador = {
//   nombre: "Tulio",
//   apellido: "Triviño",
//   // - La unica observacion que si definimos un metodo "getter" no sera copiado en el objeto receptor y solo se obtendra el valor del metodo:
//   get profesion(){
//     return "Conductor"
//   }
// }

// - Se copian todas las propiedades, menos las definiciones "get" del "objDonador" al objeto "objReceptor"
// console.log( mezclar( objReceptor, objDonador ) )

// - Solo el "objDonador" posee las definicones "get"

// console.log( objDonador )

// - Con Ecmascript 6 no es necesario crear la funcion que barre las propiedades de un objeto asignandoselas a otro, simplemente se usa el metodo "Objet.assign" donde enviamos como parametros primero el "objReceptor" y luego el "objDonador", considerar que de esta manera tampoco se copian las definiciones "get"

// console.log( Object.assign( objReceptor, objDonador ) )

/* -----------------------------------------------------------------
       Orden de enumeracion de las propiedades de los objetos
----------------------------------------------------------------- */

// - En Ecmascript 5 el orden de la propiedades de los objetos dependia un poco del navegador, con Ecmascript 6 esto se soluciono definiendo caracteristicas que definen el orden de las propiedades:

// - Todas las llaves en orden ascendente
// - Todas las llaves tipo "string" van ordenadas en la manera que fueron agregadas al objeto
// - Todos los simbolos en el orden que fueron agregados al objeto

// var objeto = {
//   c: 1,
//   0: 1,
//   x: 1,
//   15: 1,
//   r: 1,
//   3: 1,
//   b: 1
// }

// objeto.d = 1
// objeto["2"] = 1
// objeto["a"] = 1

// - El resultado seria: 0,2,3,15,c,x,r,b,d,a, es decir, los numeros ordenados de manera ascendente y las letras "string" ordenadas en la manera que fueron agregadas:

// console.log( Object.getOwnPropertyNames( objeto ).join(",") )
// 0,2,3,15,c,x,r,b,d,a

// - Una alternativa que muestra los nombres de las propiedades "keys" en un arreglo:

// console.log( Object.keys( objeto ) )
// ['0', '2', '3', '15', 'c', 'x', 'r', 'b', 'd', 'a']

// - Con el metodo "stringify" de JSON:

// console.log( JSON.stringify( objeto ) )
// {"0":1,"2":1,"3":1,"15":1,"c":1,"x":1,"r":1,"b":1,"d":1,"a":1}

// - Con un ciclo ForIn:

// for ( i in Object.keys( objeto ) ) {
//   console.log( Object.keys( objeto )[ i ] )
// }
// 0 2 3 15 c x r b d a

/* =================================================================

 Sección 7: Prototipos mas poderosos y desestructuracion

================================================================= */

/* -----------------------------------------------------------------
          Cambiar el prototipo de un objeto: setPrototypeOf
----------------------------------------------------------------- */

// - La Programacion Orientada a Objetos de Javascript se encontraba basada en prototipos y no en clases ( Ecmascript 6 introduce las clases )

// - Los prototipos son un conjunto de normas para integrar POO en Javascript. Pero con los prototipos somos capaces de realizar tareas como:

// - Herencia
// - Encapsulamiento
// - Abstraccion
// - Poliformismo

// let gato = {
//   sonido(){
//     console.log( "Miau!" )
//   },
//   chillido(){
//     console.log( "MIAU!!!" )
//   }
// }

// let perro = {
//   sonido(){
//     console.log( "Guau!" )
//   }
// }

// // - Creo un objeto "angora" a partir del prototipo "gato"
// let angora = Object.create( gato )
// console.log( Object.getPrototypeOf( angora ) === gato ) // true

// angora.sonido() // Miau!
// angora.chillido() // MIAU!!!

// // - En Ecmascript 6 podemos asignar el prototipo a un objeto desde otro objeto con el metodo Object.setPrototypeOf:

// // - Como primer parametro recibe el objeto que va a tener el prototipo del objeto del segundo parametro
// Object.setPrototypeOf( angora, perro )

// console.log( Object.getPrototypeOf( angora ) === gato ) // False

// angora.sonido() // Guau!
// angora.chillido() // Uncaught TypeError: angora.chillido is not a function

/* -----------------------------------------------------------------
       Acceso al prototipo del padre con la referencia 'SUPER'
----------------------------------------------------------------- */

// - En Ecmascript 5 era complicado hacer el llamado a un metodo de una funcion que esta heredada de un objeto que viene del prototipo, en otras palabras, era complicado llamar metodos que vienen heredados de los prototipos

// let persona = {
//   saludar(){
//     return "Hola"
//   }
// }

// let amigo = {
//   saludar(){
//     // - En Ecmascript 5 habia que crear toda esta linea para poder acceder al metodo "saludar" del objeto "persona" y combinarlo con el metodo "saludar" del objeto "amigo"
//     // return Object.getPrototypeOf(this).saludar.call(this) + ", saludos!!!"

//     // - En Ecmascript 6 referenciamos al metodo "saludar" del objeto "persona" con la palabra reservada "super" y de esta manera podemos combinar el metodo anterior con el metodo "saludar" del objeto "amigo"
//     return super.saludar() + ", saludos!!!"
//   }
// }

// // - Necesario para obtener los metodos de "persona" en "amigo"
// Object.setPrototypeOf( amigo, persona )

// console.log( amigo.saludar() )

/* -----------------------------------------------------------------
                    Desestructuracion de objetos
----------------------------------------------------------------- */

// let ajustes = {
//   nombre: "Tulio",
//   email: "tulio@gmail.com",
//   facebook: "tuliofb",
//   google: "tuliogoogle",
//   premium: true,
//   nuevaPropiedad: true,
//   "propiedad especial": true
// }

// - En Ecmascript 5 cuando se necesitaba usar mucho una propiedad de un objeto se almacenaban esas propiedades en variables:

// var nombre = ajustes.nombre,
//     email = ajustes.email,
//     facebook = ajustes.facebook

// console.log( nombre, email, facebook )

// - Ahora con Ecmascript 6 para evitar hacer lo anterior podemos desestructurar los objetos de la siguiente manera:

// let { nombre, email, facebook } = ajustes

// console.log( nombre, email, facebook )

// - El orden de las propiedades es irrelevante al desestructurar, lo que unico que importa, es que los nombres sean referenciados con el mismo nombre que poseen en el objeto:

// let { facebook, email, nombre } = ajustes

// console.log( nombre, email, facebook )

// - De esta manera podemos crear alias para los nombres de las propiedades, por ejemplo que la propiedad "premium" sea referenciada como "dePago", al crear un alias, el nombre inicial pierde la referencia en la desestructuracion:

// let { premium:dePago } = ajustes

// console.log( dePago ) // True
// console.log( premium ) // Uncaught ReferenceError: premium is not defined

// - La desestructuracion tambien nos permite inicializar propiedades que no existan en el objeto inicial, al inicializarlas estaran disponibles desde la desestructuracion pero estas no seran agregadas al objeto de donde han sido extraidas las demas

// let { facebook, email, nombr, twitter = "Tuliotwitter" } = ajustes

// console.log( twitter, ajustes )

// - Tambien podemos combinar la inicializacion de una propiedad que no exista en el objeto inicial, asignandole un alias y un valor:

// let { google, twitter:cuentaTwi = "Tuliotwitter" } = ajustes

// console.log( cuentaTwi ) // Tuliotwitter

// - Pero si intentamos asignarle un valor a una propiedad que ya existe en el objeto, esta mantendra su valor inicial, ya que desde la desestructuracion no podemos sobreescribir valores:

// let { nuevaPropiedad = false } = ajustes

// console.log( nuevaPropiedad ) // True

// - Si por alguna razon, tenemos un nombre de propiedad con espacios, debemos si o si asignarle un alias para poder usarla:

// let { "propiedad especial": propiedadEspecial } = ajustes

// console.log( propiedadEspecial ) // True

/* -----------------------------------------------------------------
              Desestructuracion de objetos anidados
----------------------------------------------------------------- */

// let autoGuardado = {
//   archivo: "app.js",
//   cursor: {
//     linea: 7,
//     columna: 16
//   },
//   ultimoArchivo: {
//     archivo: "index.html",
//     cursor: {
//       linea: 8,
//       columna: 20
//     }
//   },
//   otroNodo: {
//     subNodo: {
//       cursor: {
//         linea: 11,
//         columna: 11
//       }
//     }
//   }
// }

// - Supongamos que necesito obtener los valores del "cursor" del "subNodo" del "otroNodo":

// - Con desestructuracion:
// let { otroNodo: { subNodo: { cursor } } } = autoGuardado

// console.log( cursor ) // {linea: 11, columna: 11}

// - O tambien podemos prescindir de la desestructuracion y acceder con notacion de punto directamete al valor solicitado y guardarlo en una variable:

// let cursorSubOtro = autoGuardado.otroNodo.subNodo.cursor

// console.log( cursorSubOtro ) // {linea: 11, columna: 11}

/* -----------------------------------------------------------------
                  Desestructuracion de arreglos
----------------------------------------------------------------- */

// let frutas = [ "platano", "pera", "uva" ]

// - En Ecmascript 6 tambien podemos desestructurar arreglos, pero una de las diferencias con respecto a la desestructuracion de objetos consiste en que aca el orden de las propiedades es secuencial, es decir, independiente de en que orden escriba los nombres de las variables desestructuradas, estas siempre traeran los valores en el orden en que estan declaradas en el array:

// let [ fruta1, fruta2 ] = frutas

// console.log( fruta1, fruta2 ) // platano pera

// Para acceder al valor "uva" que se encuentra en la posicion 2 del array, sin tener que desestructurar las otras posiciones iniciales, debo asignar una coma por cada posicion no asignada:

// let [ ,,fruta3 ] = frutas

// console.log( fruta3 ) // uva

// - La desestructuracion puede sobreescribir valores de variables ya creadas:

// var otraFruta = "manzana"

// var [ otraFruta ] = frutas

// console.log( otraFruta ) // - Uno esperaria que el valor aca fuese "manzana", pero al usar el nombre de la variable "otraFruta" en la desestructuracion, se le asigno el valor del dato que se encuentra en la posicion 0 del array "frutas", el cual es "platano"

// - Una ventaja que posee la desestructuracion es que nos permite sobre escribir valores de manera mas sencilla, por ejemplo, teniendo dos variables, me gustaria intercambiar sus valores, una alternativa para realizar esto sin la desestructuracion es de la siguiente manera:

// let a = 1
// let b = 2
// let temp

// temp = a
// a = b
// b = temp

// console.log( a )
// console.log( b )

// - Pero con desestructuracion la sintaxis es mas sencilla:

// [ a, b ] = [ b, a]

// console.log( a )
// console.log( b )

/* -----------------------------------------------------------------
                Desestructuracion de arreglos anidados
----------------------------------------------------------------- */

// let colores1 = [ "rojo", ["verde", "amarillo"], "morado", "naranja"]

// Obteniendo el valor rojo y el valor verde:

// let [ color1, [ color2 ] ] = colores1

// console.log( color1 )
// console.log( color2 )

// Asignar el primer valor del arreglo como "colorPrincipal", el segundo como "colorSecundario", y los demas colores "esparcirlos" en un nuevo arreglo:

// let colores2 = [ "rojo", "verde", "amarillo", "morado", "naranja"]

// let [ colorPrincipal, colorSecundario, ...spreadDeColores ] = colores2

// console.log( colorPrincipal )
// console.log( colorSecundario )
// console.log( spreadDeColores )

/* -----------------------------------------------------------------
            Valores por defecto en la desestructuracion
----------------------------------------------------------------- */

// let frutas1 = [ "platano" ]

// - Puedo asignar un valor "por defecto" a las variables que no tienen valores declarados en el arreglo del que quiero extraer los datos:
// let [ fruta1, fruta2 = "manzana" ] = frutas1

// console.log( fruta1, fruta2 ) //platano manzana

// - Pero no puedo asignar valores por defecto a las variables que si tienen valores declarados en el arreglo del que quiero extraer los datos:

// - Aca "fruta1" mantendra el valor de "platano" ya que ese fue el valor por defecto declarado en el arreglo "frutas1"
// let [ fruta1 = "pera", fruta2 = "manzana" ] = frutas1

// console.log( fruta1, fruta2 ) //platano manzana

// - Los valores por defecto en la desestructuracion funcionan tanto como para los objetos como los arreglos:

// let titere = {
// 	nombre: "Tulio"
// }

// let { nombre, apellido = "Triviño" } = titere

// console.log( nombre, apellido ) // Tulio Triviño

// let { nombre = "Policarpio", apellido = "Triviño" } = titere

// console.log( nombre, apellido ) // Tulio Triviño


/* -----------------------------------------------------------------
          Desestructuracion de parametros en funciones
----------------------------------------------------------------- */

// - Al crear una funcion con parametros declarados dentro de la misma, no hay manera de saber si algun parametro es un objeto y que propiedades - metodos, posee ese objeto:

// Por ejemplo creo una funcion llamada "crearJugador()" que recibe dos parametros "nickname" de tipo "string" y "opciones" de tipo "object":

// function crearJugador( nickname, opciones ) {

//   opciones = opciones || {}

//   let hp = opciones.hp,
//       sp = opciones.sp,
//       clase = opciones.clase

//   console.log( nickname, hp, sp, clase )

// }

// - Como yo cree la funcion conozco la estructura del objeto "opciones" por lo que se que argumentos tengo que setear:
// crearJugador( "Frozen_Blast", { hp: 100, sp: 50, clase: "Mago" } )

// Pero, a no ser que haya documentado la funcion no tengo forma de saber cuales son las propiedades - metodos del objeto opciones, tendria que ir especificamente a revisar el codigo donde se encuentra la funcion, para solventar esto, podemos aplicar una desestructuracion a los parametros que enviamos en una funcion, de esta manera quedo mucho mas claro que argumentos especificos necesito declarar al llamar la funcion

// function crearJugador( nickname, { hp, sp, clase } ) {

//   console.log( nickname, hp, sp, clase )

// }

// Si llamamos la funcion sin declarar argumentos para el parametro de tipo objeto, javascript nos dara un error ya que no puede desestructurar valores de un objeto con propiedades "undefined"

// crearJugador( "Frozen_Blast" ) // Uncaught TypeError: Cannot destructure property 'hp' of 'undefined' as it is undefined.

// Para resolver esto podemos aplicar un valor por defecto al objeto, es decir: si no viene declarado ningun argumento del objeto, el objeto sera un objeto vacio, por lo que se podra permitir definir valores "undefined"

// function crearJugador( nickname, { hp, sp, clase } = {} ) {

//   console.log( nickname, hp, sp, clase )

// }

// crearJugador( "Frozen_Blast" ) // Frozen_Blast undefined undefined undefined

// Tambien podemos aplicar valores por defecto a cada propiedad del parametro objeto, estas propiedades tendran esos valores siempre y cuando no sean especificados como argumentos al momento de llamar la funcion:

// function crearJugador(
//   nickname,
//   { hp, sp, clase } = { hp: 100, sp: 50, clase: "Mago" }
// ) {

//   console.log( nickname, hp, sp, clase )

// }

// crearJugador( "Frozen_Blast" ) // Frozen_Blast 100 50 Mago

// Si declaro los argumentos que necesita el objeto sobreescribira sus valores por defecto:

// crearJugador( "Frozen_Blast", { hp: 500, sp: 100, clase: "Guerrero" } ) // Frozen_Blast 500 100 Guerrero

/* =================================================================

 Sección 8: Simbolos

================================================================= */

/* -----------------------------------------------------------------
                      Simbolos y propiedades
----------------------------------------------------------------- */

// - En Ecmascript 6 se han introducido los simbolos "symbol", los cuales son un nuevo tipo de dato unico y diferente, este se adiciona a los ya existentes: undefined, null, boolean, string, number, object, array

// - Segun https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Symbol Los Symbols se utilizan a menudo para añadir claves de propiedades únicas a un objeto que no sean iguales a las claves que cualquier otro código pueda añadir al objeto, y que están ocultas de cualquier mecanismo que otro código utilice normalmente para acceder al objeto. Esto permite una forma de encapsulation débil, o una forma débil de ocultación de información. Se garantiza que cada llamada a Symbol() devuelve un único Symbol

// let primerNombre = Symbol()
// let persona = {}

// console.log( primerNombre ) // Symbol()

// - Es importante entender que si queremos asignar una variable con valor "Symbol()" como propiedad al objeto "persona{}" debemos hacerlo mediante la notacion de corchetes
// persona[primerNombre] = 'Tulio'

// - De esta manera el objeto quedaria asi:
// console.log( persona ) // {Symbol(): 'Tulio'}

// - En cambio si lo hacemos con la notacion de punto, creariamos una propiedad con el nombre literal de la variable y no con su valor "Symbol()"
// persona.primerNombre = 'Tulio'

// console.log( persona ) // {primerNombre: 'Tulio'}

// - Como usamos la notacion de corchetes para asignar instancias de variables con valor "Symbol()" si queremos visualizar el el valor de esa propiedad en el objeto "persona{}" usamos nuevamente esa notacion
// console.log( persona[primerNombre] ) // Tulio

// - Si usaramos la notacion de punto esto daria "undefined" ya que no hemos asignado ninguna propiedad con el nombre "primeraPersona"
// console.log( persona.primerNombre ) // undefined

// Podemos asignar alias a los simbolos, pasandolo como argumento al declarar un "Symbol()"

// let simbolo1 = Symbol( 'simbolo' )
// let simbolo2 = Symbol( 'simbolo' )

// console.log( simbolo1 ) // Symbol( 'simbolo' )
// console.log( simbolo2 ) // Symbol( 'simbolo' )

// - Si bien, ambas variables "simbolo1" y "simbolo2", tienen como valor "Symbol( 'simbolo' )" no son iguales, esto es porque Javascript se asegura de que cada simbolo sea distinto, esa esa la logica de que exista "Symbol()" y esto lo podemos corroborar al usar 3 operadores de igualdad, los cuales daran en cada caso "false":

// console.log( simbolo1 == simbolo2 ) // false
// console.log( simbolo1 === simbolo2 ) // false
// console.log( Object.is( simbolo1, simbolo2 ) ) // false

// - Una forma para saber que variables poseen simbolos es usar el operador "typeof"

// console.log( typeof primerNombre ) // symbol

// - Otro detalle a considerar es que los simbolos por ser valores de tipo primitivos no podran ser convertidos a "strings", por lo tanto no es posible contatenar texto con varibles que posean valor de "Symbol"

// console.log( "Mi simbolo: " + primerNombre ) // Uncaught TypeError: Cannot convert a Symbol value to a string
// console.log( `Mi simbolo: ${primerNombre}` ) // Uncaught TypeError: Cannot convert a Symbol value to a string

/* -----------------------------------------------------------------
       Compartiendo símbolos - Symbol.for() y Symbol.keyFor()
----------------------------------------------------------------- */

// - El método "Symbol.for(key)" busca los símbolos existentes en un registro de símbolos en tiempo de ejecución con la clave dada y lo devuelve si lo encuentra. En caso contrario, se crea un nuevo símbolo en el registro global de símbolos con esta clave:

// let userID = Symbol.for( "userId" )
// let objeto = {}

// objeto[userID] = "12345"

// console.log( objeto[userID] ) // 12345
// console.log( userID ) // Symbol(userId)

// let userID2 = Symbol.for( "userId" )

// console.log( userID == userID2 ) // true
// console.log( userID === userID2 ) // true
// console.log( Object.is( userID, userID2 ) ) // true

// console.log( objeto[userID2] ) // 12345
// console.log( userID2 ) // Symbol(userId)

// - El método "Symbol.keyFor(sym)" recupera la clave de símbolo compartida del símbolo pasado como argumento desde el registro global de símbolos:

// let id = Symbol.for( "id unico" )
// console.log( Symbol.keyFor( id ) ) // id unico

// let id2 = Symbol.for( "id unico" )
// console.log( Symbol.keyFor( id2 ) ) // id unico

// console.log( id == id2 ) // true

// let id3 = Symbol( "id unico" )
// console.log( Symbol.keyFor( id3 ) ) // undefined


/* -----------------------------------------------------------------
              Recuperando las propiedades simbolo
----------------------------------------------------------------- */

// - Cuando queremos obtener todas las propiedades de un objeto podemos usar un ciclo ForIn:

// let titere = {
//   nombre: "Tulio",
//   apellido: "Triviño",
//   color: "rojo"
// }

// for ( key in titere ) {
//   console.log( key, titere[ key ] )
// }

// - Resulta que si agregamos propiedades de tipo "Symbol()" estas no se mostraran en el ciclo ForIn:

// let id = Symbol.for( "id" )
// let activo = Symbol.for( "activo" )

// let titere = {
//   [id]: "123",
//   [activo]: true,
//   nombre: "Tulio",
//   apellido: "Triviño",
//   color: "rojo"
// }

// - Solo mostrara:
// nombre Tulio
// apellido Triviño
// color rojo

// for ( key in titere ) {
//   console.log( key, titere[ key ] )
// }

// - Incluso utilizando Object.keys tampoco mostrara las propiedades de tipo "Symbol()""

// console.log( Object.keys( titere ) ) // ['nombre', 'apellido', 'color']

// - Para poder mostrar las propiedades de tipo "Symbol()" es necesario usar el metodo "Object.getOwnPropertySymbols":

// let simbolos = Object.getOwnPropertySymbols( titere )
// console.log( simbolos ) // [Symbol(id), Symbol(activo)]

// - Luego podemos hacer un ForIn en "simbolos" para mostrar las propiedades de tipo "Symbol"

// for ( i in simbolos ) {
//   console.log( simbolos[ i ], Symbol.keyFor( simbolos[ i ] ) )
// }

// Symbol(id) 'id'
// Symbol(activo) 'activo'

/* =================================================================

 Sección 9: Sets

================================================================= */

/* -----------------------------------------------------------------
       Creando Sets, agregando items y buscando elementos
----------------------------------------------------------------- */

// - El objeto Set le permite almacenar valores únicos de cualquier tipo, ya sea valores primitivos o referencias a objetos.

// - Los objetos Set son colecciones de valores. Puede iterar a través de los elementos de un conjunto en orden de inserción. Un valor en un Set solo puede ocurrir una vez; es único en la colección del Set.

// - Los Sets son como los arreglos, exceptuando que tienen funciones nativas en su prototipo y no pueden tener valores duplicados

// - Creacion de un "Set":

// let items = new Set()

// - Para agregar datos al "Set" usamos el metodo "add":

// items.add( 10 )
// items.add( 11 )
// items.add( 8 )
// items.add( 7 )

// console.log( items ) // Set(4) {10, 11, 8, 7}

// - Si intentamos agregar un valor que ya fue agregado, "Set" simplemente lo ignorara:

// items.add( 7 ) // Esto es ignorado, ya que existe el valor de 7

// - Para ver cuantos elementos se han agregado a "Set" podemos usar la propiedad "size"

// console.log( items.size ) // 4

// - Podemos agregar valores a un objeto "Set" desde una coleccion de datos como un "array", pero considerando que los valores duplicados en el "array" seran ignorados en la creacion del "Set":

// let itemsArray = new Set( [ 1, 2, 3, 4, 5, 6, 7, 7, 7, 7, 7, 7] )

// console.log( itemsArray ) // Set(7) {1, 2, 3, 4, 5, 6, 7}
// console.log( itemsArray.size ) // 7

// - Para saber si existe un valor especifo en el "Set" podemos buscarlo con el metodo "has" pasandole como argumento el valor a buscar:

// console.log( itemsArray.has( 7 ) ) // true

/* ------------------------------------------------------------------
                        Sets: Removiendo valores
----------------------------------------------------------------- */

// - Para eliminar valores en un "Set" usamos el metodo "delete" pasandole como argumento el valor a eliminar:

// let itemsDelete = new Set( [ "manzana", "pera", "uva", "sandia", "melon"] )

// console.log( itemsDelete ) // Set(5) {'manzana', 'pera', 'uva', 'sandia', 'melon'}
// console.log( itemsDelete.size ) // 5

// // - Elimino el valor "uva"

// itemsDelete.delete( "uva" )

// console.log( itemsDelete ) // Set(4) {'manzana', 'pera', 'sandia', 'melon'}
// console.log( itemsDelete.size ) // 4

// // - Borrar todos los valores del "Set" con el metodo "clear"

// itemsDelete.clear()

// console.log( itemsDelete ) // Set(0) {size: 0}
// console.log( itemsDelete.size ) // 0

/* ------------------------------------------------------------------
                     Uso de forEach en los Sets
----------------------------------------------------------------- */

// let titeres = new Set([ "Policarpio", "Juanin", "Bodoque" ])

// - Al usar "forEach" en un "Set" la funcion que se pasa como argumento recibira como parametro, cada "valor" del "Set", la "llave" que sera igual al "valor" y el "setOriginal":

// titeres.forEach( function( valor, llave, setOriginal ) {

//   console.log( valor, llave, setOriginal )

//   console.log( titeres === setOriginal ) // true

// })

// Output:
// Policarpio Policarpio Set(3) {'Policarpio', 'Juanin', 'Bodoque'}
// Juanin Juanin Set(3) {'Policarpio', 'Juanin', 'Bodoque'}
// Bodoque Bodoque Set(3) {'Policarpio', 'Juanin', 'Bodoque'}

/* ------------------------------------------------------------------
                  Convertir un 'Set' en un 'Array'
----------------------------------------------------------------- */

// let setNumeros = new Set([ 1, 2, 3, 4, 5, 6, 7 ])

// console.log( setNumeros ) // Set(7) {1, 2, 3, 4, 5, 6, 7}

// // Convirtiendo "setNumeros" a un array:

// let arrayNumeros = [ ...setNumeros ]

// console.log( arrayNumeros ) // (7) [1, 2, 3, 4, 5, 6, 7]

/* ------------------------------------------------------------------
            Eliminar duplicados de un 'array' con 'Set'
----------------------------------------------------------------- */

// let numerosDuplicados = [ 1, 2, 3, 4, 5, 6, 7, 7, 7, 7, 3, 1, 2, 3, 4, 5 ]

// let numerosSinDuplicados = eliminaDuplicados( numerosDuplicados )

// console.log( numerosSinDuplicados ) // (7) [1, 2, 3, 4, 5, 6, 7]

// function eliminaDuplicados( items ) {

//   return [ ... new Set( items ) ]

// }

/* ------------------------------------------------------------------
                              WeakSets
----------------------------------------------------------------- */

// - Los objetos WeakSet son colecciones de objetos. Al igual que Set, cada objecto WeakSet puede estar solo una vez; todos los objetos en una colección WeakSet son unicos.

// - Las principales diferencias con el objeto Set son que los WeakSet son colecciones de objetos solamente. No pueden contener valores arbitrarios de cualquier tipo, como pueden hacerlo los Set

// - El principal uso de los "WeakSet" es para almacenar referencias a los objetos

// let weakSet = new WeakSet()

// let titere1 = {
//   nombre: "Bodoque"
// }

// let titere2 = {
//   nombre: "Policarpio"
// }

// weakSet.add( titere1 )
// weakSet.add( titere2 )

// console.log( weakSet ) // WeakSet {{ nombre: 'Bodoque' }, { nombre: 'Policarpio' }}

// - Caracteristicas principales:

// - 1. En un "WeakSet" los metodos "add", "has", "remove", dan un error si enviamos como parametro algo que no sea un objeto
// - 2. No tiene manera de hacer repeticiones o ciclos "ForIn"
// - 3. Los "WeakSet" no tienen "keys", "values", por lo que no hay manera via programacion, de saber cuantos elementos hay adentro
// - 4. No tienen un "ForEach"
// - 5- No tienen propiedad "size"

/* =================================================================

 Sección 10: Maps

================================================================= */

/* -----------------------------------------------------------------
                       Mapas y sus metodos
----------------------------------------------------------------- */

// - Es un nuevo tipo de coleccion de datos tipo key-value ( llave - valor)

// - Creacion de un objeto "Map"

// let mapa = new Map()

// - Insertando un valor al objeto "Map"

// mapa.set( "nombre", "Tulio" )
// mapa.set( "edad", "31" )
// mapa.set( "apellido" )
// mapa.set()
// mapa.set( {}, { hola: "hola mundo" } )

// console.log( mapa )
// Output:
// Map(5) {'nombre' => 'Tulio', 'edad' => '31', 'apellido' => undefined, undefined => undefined, {…} => {…}}
// console.log( mapa.size ) // 5

// console.log( mapa.get( "nombre" ) ) // Tulio
// console.log( mapa.get( "edad" ) ) // 31

// console.log( mapa.has( "nombre" ) ) // true
// console.log( mapa.has( "apellido" ) ) // true

// mapa.delete( "nombre" )

// console.log( mapa.has( "nombre" ) ) // false
// console.log( mapa.get( "nombre" ) ) // undefined

// - Eliminar solo el valor de una llave:

// mapa.set( "edad")

// console.log( mapa ) // Map(4) {'edad' => undefined, 'apellido' => undefined, undefined => undefined, {…} => {…}}

// - Borrar todos los datos de "mapa":

// mapa.clear()

// console.log( mapa ) // Map(0) {size: 0}

/* -----------------------------------------------------------------
                  Inicializaciones de los mapas
----------------------------------------------------------------- */

// - Para inicializar los datos en un objeto "Map" se deben definir parametros de "clave/valor" en formato de arrays dentro de un array:

// let mapa = new Map([ ["Nombre", "Tulio"], ["edad", "31"] ])

// console.log( mapa ) // Map(2) {'Nombre' => 'Tulio', 'edad' => '31'}

/* -----------------------------------------------------------------
                       forEach de los mapas
----------------------------------------------------------------- */

// - Podemos obtener los valores de un mapa usando forEach, la funcion interna del forEach recibira como parametros, el valor, llave y el mapa original:

// let mapa = new Map([ ["Nombre", "Tulio"], ["edad", "31"] ])

// mapa.forEach( function( key, value, originalMap ) {

//   console.log( `Llave: ${key}, Valor: ${value}` )

// })

// Output:
// Llave: Tulio, Valor: Nombre
// Llave: 31, Valor: edad

/* -----------------------------------------------------------------
                       Ciclo ForOf
----------------------------------------------------------------- */

// let titeres = [
//   { nombre: "Tulio", edad: 31 },
//   { nombre: "Patana", edad: 18 },
//   { nombre: "Juanin", edad: 20 },
//   { nombre: "Guantecillo", edad: 59 },
//   { nombre: "Cindy", edad: 28 },
// ]

// for ( const titere of titeres ) {
//   console.log( titere.nombre, titere.edad )
// }
// Output:
// Tulio 31
// Patana 18
// Juanin 20
// Guantecillo 59
// Cindy 28

// let titeresSet = new Set()

// titeresSet.add({ nombre: "Tulio", edad: 31 })
// titeresSet.add({ nombre: "Patana", edad: 18 })
// titeresSet.add({ nombre: "Juanin", edad: 20 })

// for ( const titere of titeresSet ) {
//   console.log( titere.nombre, titere.edad )
// }
// Output:
// Tulio 31
// Patana 18
// Juanin 20

// Esto dara error por que "Map" no puede tener valores repetidos:
// let titeresMap = new Map([ ["nombre", "Tulio"], ["nombre", "Patana"] ])

// let titeresMap = new Map([ ["nombre", "Tulio"], ["apellido", "Triviño"] ])

// for ( const titere of titeresMap ) {
//   console.log( titere )
// }
// Output:
// (2) ['nombre', 'Tulio']
// (2) ['apellido', 'Triviño']

/* =================================================================

 Sección 11: Clases

================================================================= */

/* -----------------------------------------------------------------
                   Pre-introduccion a las clases
----------------------------------------------------------------- */

// - Las clases son una abstraccion de algun objeto de la vida real

// - Todas las clases poseen propiedades, por ejemplo podemos tener una clase llamada "carro" y sus propiedades serian las caracteristicas que definen a "carro": puertas, color, marca, modelo, fabricante, etc

// - Todas las clases poseen metodos, es decir, acciones/funciones que pueden ejecutar las clases, en el caso de la clase "carro" sus metodos serian: encender(), apagar(), acelerar(), etc

// - Las clases poseen herencia, es decir, pueden heredar sus metodos y propiedades a otras clases, un ejemplo seria que si tenemos una clase llamada "forma" con las propiedades de lados y area, estas propiedades podrian heredarlas otras clases, por ejemplo una clase llamada "cuadrado" u otra clase llamada "rectangulo"














