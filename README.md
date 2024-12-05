# Gotta catch 'em all 🐱‍👓!

Este repositorio guarda el código de la prueba técninca para el puesto de Frontend Developer de [Global66](https://global66.com/ar). Se creó una aplicación que hace uso de la [Pokeai](https://pokeapi.co/) siguiendo el diseño provisto en [Figma](https://www.figma.com/design/RxextQHeFs98SQKdpTrahk/Pok%C3%A9dex?node-id=0-1&node-type=canvas&t=irBt0H5tWEotGZuR-0). 

Cuenta con un listado de pokémones filtrables mediante la barra de busqueda, la opcion de añadir a favoritos, persistencia de los mismos en memoria del navegador, barra de busqueda de favoritos y un modal con información del pokemon elegido. La aplicacion es responsiva, e implementada como PWA permite al usuario instalarla en su dispositivo, permitiendo su utilización por fuera del navegador, y cacheando las respuestas de la Pokeapi permitiendo su uso offline.

Se detalla a continuación las especificaciones del proyecto, clickeando en cada item se podrá ir directamente a la sección deseada.

## Contenidos

1. [Estructura de la aplicación](#estructura-de-la-aplicación)
2. [Tecnologías utilizadas](#tecnologías-utilizadas)
3. [Implementación](#implementación)
4. [Agradecimientos](#agradecimientos)

## Estructura de la aplicación

A continuación se muestra la estructura de carpetas:

```
poke-search/
├── public/
├── src/
│   ├── api/
│   ├── assets/
│   ├── components/
│   ├── router/
│   ├── store/
│   ├── types/
│   ├── views/
│   ├── App.vue 
│   ├── registerServiceWorker.ts 
│   └── main.ts 
│
└── config.files...
```

### `public/`

En éste directorio se guardan todos los archivos estáticos que se sirven desde la raiz de la aplicación. Entre ellos, el index.html que guarda la meta información así como también oficia de _entry point_ de la aplicación que se monta en el `<div id="app">`.

### `src/`

El directorio src (diminutivo de _source_) guarda la mayoria del codigo fuente de la aplicación, detallo a continuación sus subdirectorios y sus contenidos.

#### `api/`

En el archivo index se implementan dos funciones principales que se encargan de realizar las peticiones con la API `fetch`: 
1. `getAllPokemon()` realiza una llamada al endpoint `/pokemon?limit=200&offset=0` devolviendo una lista inicial de 200 items. 
2.`getPokeByName()` toma un string como argumento y realiza una petición al endpoint `/pokemon/${nombre}` devolviendo información especifica del pokémon pasado por argumento.

#### `assets/`

Aquí se guardaron archivos a ser consumidos por la aplicación de manera dinámica, como imagenes obtenidas del Figma. Sin embargo en este directorio se guarda tambien el archivo `tailwind.css` que guarda la configuración de los estilos, clases, y utilidades de este framework.

#### `components/`

Aquí se guardan cada uno de los archivos `.vue` que se encargan del renderizado de la UI de la aplicación. Cada componente fue pensado para ser reutilizable, con la excepción de la lista de pokémones `PokemonList.vue` dividido en dos subdirectorios. Ello debido principalmente al diseño del manejo del estado de la aplicación, debiendo renderizar y filtrar por separado la lista de pokemones y la lista de favoritos.

#### `router/`

El archivo index.ts guarda la instanciación y la configuración del router de Vuen. Ya que vue ofrece la posibilidad de crear una estructura de Single Page Aplication (SPA), las rutas se encargan de montar las diferentes vistas, importadas e implementadas en dicha configuración. Son tres rutas que montan tres vistas:

1. `/`: la ruta base monta la vista `<HomeView />`, la página de bienvenida.
2. `/searchpoke`: monta la vista `<SearchView />`, página de busqueda y lista de pokemones.
3. `/favorites`: monta la vista `<FavoriteView />`, página de favoritos, con la lista y el buscador.

#### `store/`

En el archivo index.ts se configuran dos stores que funcionan como el corazón de la aplicación. Guardan el estado global de la aplicacion, definiendo los valores reactivos, relizando los llamados a la api, y manejando asi mismo las mutaciones de esos estados. 

1. `usePokeStore()`: Define los estados de los pokemones devueltos por las llamadas a la api, las acciones para realizar dichas peticiones en respuesta a la interacción del usuario y un valor computado que guarda el filtrado de los pokemones por el valor de busqueda manejado por el buscador.
2. `useFavoriteStore()`: Maneja el estado de los pokemones guardados en favoritos, utilizando la API de `localStorage()`. Maneja su propio valor de busqueda y su valor computado de filtrado.

#### `types/`

Al optar por el uso de TypeScript para el desarrollo de la aplicación, es necesario obtener los tipos de la respueesta de la pokeapi, de modo tal de poder compartir ese tipado a lo largo de la aplicación. Se definen las interfaces de la respuesta del endpoint general, como el endpoint de pokemon por nombre.

#### `views/`

Cada archivo se encarga de montar los componentes necesarios para la vista definida en el router. Se definieron tres vistas, en función de las tres rutas mencionadas anteriormente.

#### `App.vue`

Monta la vista del router, desmontando y montando dichas vistas y los componentes que implementa.

#### `main.ts`

Configuración global de la aplicación que sera enviada al entry point. Se instancia y luego con el metodo `app.use()` se aplican las configuraciones tanto del router, como del store previamente a montarse en el `<div id"app">`.

#### `registerServiceWorker.ts`

Este archivo forma parte del paquete instalado con el CLI de Vue, que crea los recursos necesarios para implementar la aplicación como una _Progressive Web App_, es decir, una aplicación que puede instalarse desde cualquier dispositivo, escritorio o móvil, corriendo de manera nativa en la plataforma que corresponda. Este archivo instala un [Service Worker](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API), una API del navegador que se encargar de cachear recursos de la aplicación para ser servidos cuando el usuario no tiene conexión a internet disponible.

## Tecnologías utilizadas

Se listan a continuación las tecnologías utilizadas para el desarrollo de la aplicación:

1. [Vue.js](https://vuejs.org/): Framework de JavaScript para el desarrollo de ui reactiva. Extiende el funcionamiento de HTML, CSS y JavaScript, mediante la escritura en un solo archivo de cada una de esas partes en un tag:

```html
<template>
  <div></div>
</template>

<script>
</script>

<style>
</style>
```
Se utilizó la version 3 de Vue que ofrece dos modos de definir el estado de cada componente, Option API y Composition API. De ellas la elegida fue composition, que mediante la propiedad `setup` aplicada al tag `<script>` permite declarar directamente los valores reactivos, los metodos del ciclo de vida, y el resto de las opciones para manejar dichos estados.

Para hacer uso de este Framework, se creo una aplicación con el [vue-cli](https://cli.vuejs.org/), que ofrece un cliente de la terminal mediante el cual se puede elegir que paquetes instalar al momento de inicializar el proyecto. Se muestra a continuación la configuracion elegida:

```bash
Vue CLI v5.0.8
? Please pick a preset: Manually select features
? Check the features needed for your project: (Press <space> to select, <a> to toggle all, <i> to invert selection, and <enter> to proceed)
 (*) Babel
 (*) TypeScript
 (*) Progressive Web App (PWA) Support
>(*) Router
 ( ) Vuex
 ( ) CSS Pre-processors
 (*) Linter / Formatter
 ( ) Unit Testing
 ( ) E2E Testing
```

2. [TypeScript](https://www.typescriptlang.org/): De acuerdo a su documentación, TypeScript es un _superset_ que aplica tipado estático a JavaScript, que por definición se trata de un lenguaje de tipado débil. Es decir, que no chequea que los valores guardados en memoria sean los esperados a la hora de su procesamiento. Ello introduce muchas veces comportamientos no esperados, bugs e inconsistencias diversas que podrían ser chequeados previamente al momento de servir una aplicación. En lineas generales se trata de un servidor que chequea en tiempo de compilacion errores en la declaracion de las variables, y las funciones y estructuras que hagan uso de ellas. Además, una aplicación con un uso correcto de typescript accede a la posibilidad del autocompletado o _intellisense_ pudiendo saber a que propiedades se tiene acceso o no en todo momento.

3. [pnpm](https://pnpm.io/es/): Como manejador de paquetes, se optó por el uso de pnpm una versión optimizada de `npm` que ofrece cacheo de instalaciones y mayor velocidad de descarga, y ejecución de scripts.

4. [Tailwind.css](https://tailwindcss.com/docs/installation): Tailwind es un framework de CSS que hace uso de clases utilitarias para aplicar un estilo o un conjunto de ellos mediante su utilización en la propiedad `class` de los elementos de HTML. Si bien Vue, en su CLI beneficia el uso de CSS puro, o bien de pre-procesadores de CSS como SASS o Less; tambien es cierto que ofrecen un puglin instalable, que realiza la configuración necesaria para poder hacer uso de tailwind.

5. [Daisy-ui](https://daisyui.com/): Daisy ui es una libreria de componentes basados en Tailwind. Mediante un conjunto reducido y componible de clases aplicadas a los elementos HTML, aplica un conjunto extenso de clases y selectores utilizando tailwind por detrás. Esto ofrece la ventaja de mantener un estilo definido, en lineas generales similar pero extendible, ya que cualquier clase de tailwin aplicada al mismo elemento toma precedencia sobre las traídas por defecto.

6. [Pinia](https://pinia.vuejs.org/): Pinia es una libreria desarrollada para reducir la complejidad que Vuex introducía cuando se hacía necesario el uso de un _global state manager_. Pinia es eso, en esencia, un manejador global del estado de la aplicación. Con su uso, podemos declarar el funcionamiento esperado de cada conjunto de valores reactivos, asi como las funciones para mutarlo, en un solo lugar. Al importar e instanciar el store en cada componente se tiene acceso al estado en tiempo real de esos valores reactivos, y cualquier cambio producido por la interacción del usuario se verá inmediatamente reflejado en el resto de la aplicación. Si bien Vue ofrece la posibilidad de la comunicacion descendente y ascendente entre componentes en el arbol virtual del DOM, a veces estos árboles crecen en complejidad de anidamiento haciendo dificil comunicar un cambio en una parte de la aplicación, a otra muy alejada en el arbol de nodos. Pinia, como cualquier store, ofrece la posibilidad de reducir esa complejidad, centralizando una parte o todo el estado de la aplicacion en un solo lugar.

7. [Lucide-icons](https://lucide.dev/guide/packages/lucide-vue-next): Librería de iconos accesibles, y reutilizables de bajo peso y en formato .svg que ofrece muchas ventajas frente a la declaración de assets.

## Implementación

1. La app puede ser implementada de manera local, una vez clonado el repositorio con el comando 

```bash
git clone https://github.com/JohnFScha/poke-search.git
```

Usando los siguientes comandos 

```bash
pnpm i >>
pnpm serve
```

Se levanta el servidor de desarrollo en el puerto `:8080`.

2. Tambien puede instalarse la dependencia global `serve`

```bash
pnpm install -g serve
```

Y compilando la aplicación con el comando 

```bash
pnpm build
```

Una vez compilada correctamente, con el comando

```bash
pnpm dlx serve dist
```

Correrá la versión compilada en el puerto `:3000`

3. Implementación en la nube.

La aplicación fue desplegada en [Netlify](https://poke-search-vue.netlify.app/) sirviendo la versión compilada en sus servidores. A su vez es preciso recordar que la aplicación fue creada como una PWA, lo que ofrece la posibilidad de instalarla en el dispositivo deseado a fin de contar una una UI limpia (como es el caso de los navegadores moviles donde no se puede esconder las barras superiores e inferiores de navegación).

## Agradecimientos

Como palabras finales, me gustaría agradecer a Camila Szyszczyc del equipo de reclutamiento, y al equipo técnico general de Global por permitirme acceder a ésta prueba técnica. Ha sido una experiencia enriquecedora y que me ha permitido refrescar conceptos clave del desarrollo de aplicaciones. 

Los saludo cordialmente.