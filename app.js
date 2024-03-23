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
var saludoTradicional = function ( nombre ) {

  return "Hola " + nombre

}( "Tradicional" )

console.log( saludoTradicional )

// - Funcion de flecha anonima
var saludoFlecha = ( nombre => `Hola ${nombre}` )( "Flecha" )

console.log( saludoFlecha )
