# animetracker
Angular Application For Tracking Anime Content

--- 
# Consideraciones previas

Para que este programa funcione se debe añadir a la capeta /src/environments el archivo env.dev.ts ya que ahí se encuentran las configuraciones para Jikan y Firebase

---
# Estructura del proyecto

- Carpeta src: carpeta principal del proyecto
  - ***Carpeta app***: carpeta principal del proyecto
    - **Components**: carpeta que contiene los componentes que forman la aplicación
      - *content*: componentes relacionados con la página de contenido
        - characters: componente que muestra los diferentes personajes de un determinado anime. Incluye nombre, imagen y descripción si la poseen.
        - contentnav: navegador de la página de contenido. Redirige a las secciones de personajes y episodios de un determinado contenido.
        - episodes: componente encargado de representar la lista de episodios de un anime. Contiene paginación para los episodios que tengan un número de episodios mayor que 100. Esta paginación es accesible mediante la barra de paginación situada en la parte inferior de la sección.
        - maininfo: componente encargado de representar la información principal de un contenido determinado. Se centra en el título y la descripción, además de la imagen de portada del mismo. Posee además los selectores de lista y de puntuación (score) para que los usuarios pueden utilizar estas funcionalidades.
        - sideinfo: contiene información secundaria de un determinado contenido (número de likes, tipo, fuente, número de episodios, duración, estado, temporada, año, estudios, géneros, rating).
      - *header*: header del sitio que contiene los componentes signIn, signUp y la version mobile del header
        - mobile-menu: menu para la version mobile que sustituye el navegador del header normal.
        - sign-in: ventana modal para el inicio de sesión.
        - sign-up: ventana modal para el registro de usuario.
      - *footer*: footer del sitio  
  
      - *home*: componentes relacionados con página principal de la aplicación
        - animelist: componente que representa una lista de contenidos en la página principal de la aplicación. Utiliza diferentes temáticas para esta representación (contenidos en emisión pertenecientes a la temporada actual, proximas emisiones, animes con mas puntuación).
        - hero: portada del sitio web. Muestra información relacionada con el anime con más puntuación en la página web. Concretamente se puede observar su nombre, descripción, imágen de portada e información secundaria relevante.
      - *profile*: componentes relacionado con el perfil del usuario
        - edit-profile: ventana modal para editar el perfil
        - profile-nav: navegador que redirige a cada lista de seguimiento
        - table: tabla donde se encuentran los animes de cada lista
          - normal-row: file de la tabla para todas las listas menos "watching"
          - progress-row: filas para la tabla de "watching" contiene el contador de progreso
        - user-info: sección donde se muestra el nombre del usuario,descripción, foto de perfil y el botón de editar perfil si es la página del usuario registrado.
      - *ranking*: componentes relacionados con la página de ranking del sitio web. Muestra una lista ordenada con los animes con más puntuación (score) actualmente en la web.
        - rankheader: descriptor de cada columna de la tabla.
        - rankposition: fila de la tabla, contiene la posición, nombre, score y estado de emisión de cada uno de los contenidos representados en el ranking.
      - *search*: componentes relacionados con la página de búsqueda de contenido del sitio web. Sirve para ofrecer la posibilidad de cara al usuario de realizar búsquedas de contenido según nombre o diferentes filtros avanzados.
        - results: resultados de la búsqueda que haya sido efectuada por el usuario. Este componente utiliza las cartas de contenido para mostrar una imagen de portada y el nombre de cada uno de los contenidos que forman los resultados.
        - tags: etiquetas de la búsqueda. Se sincronizan constantemente con la búsqueda que el usuario realice en el sitio web. Es posible manipular la búsqueda mediante la interacción con estos elementos.
      - *sharedComponents*: componentes reutilizables en diferentes páginas o secciones del sitio web.
        - animecard: componente que representa un determinado contenido mediante la visualización de su imagen de portada (cover) y su nombre o título. Permite la redirección hacia la página de dicho contenido mediante una pulsación en el componente.
        - pagination: permite la paginación en diferentes páginas del sitio web, principalmente en la sección de episodios de cada contenido y en la página de búsqueda de contenido cuando los resultados no son representables en una única página.
        - searchbar: herramienta que permite la búsqueda y filtrado de contenido al usuario. Se representa mediante una barra con diferentes secciones (nombre, géneros, año, temporada, etc).
  - ***Carpeta models***: carpeta que contiene los modelos que brindan una interfaz concreta a los servicios de la aplicación. Actuan como interfaces, como se ha comentado de los mismos de cara a permitir una cierta modularidad e intercambiabilidad. Contiene modelos para los servicios de autentificación (auth), para los servicios de usuario (user) y los servicios de contenido (content)
  - ***Carpeta schemas***: carpeta que contiene los diferentes esquemas (schemas) que representan las estructuras de datos que se utilizan para manejar los objetos en la aplicación. Se representan mediante interfaces convirtiendo los datos provenientes de la base de datos de firebase y de la api utilizada a estas estructuras determinadas.
  - ***Carpeta services***: servicios principales de la aplicación. Implementan los modelos expuestos anteriormente brindando las funcionalidades marcadas por los mismos. Permiten diferentes aspectos relacionados con la carga de contenidos desde la api utilizada o desde la base de datos de firebase para los diferentes esquemas de datos (content). También acometen las funcionalidades de los usuarios de la página web (user services) y la implementación de la autentificación mediante las herramientas de firebase (auth).
  - ***Carpeta assets***: contiene las imágenes e iconos estáticos del sitio web.
  - ***Carpeta environments***: contiene el archivo de variables de entorno necesario para el correcto funcionamiento de la aplicación.
  - ***Carpeta styles***: contiene los estilos aplicacados de forma general a las diferentes páginas y elementos del sitio web.
<br></br>
---
# Estructura de datos en Firebase

En la base de datos de Google Firestore del proyecto se pueden encontrar 5 coleeciones diferentes:

- **Character**: representa a un personaje determinado de un contenido. Esta caracterizada por las siguientes propiedades:
    
      id:number # numero identificativo de cada personaje. Sirve como identificador unico para el documento en la base de datos de firebase.

      image:string # imagen de cada personaje

      name:string # nombre de cada personaje

      about:string # descripción de cada personaje

  ![image](https://github.com/AdrianCardonaCandil/animetracker/assets/96847234/8c9e449d-df5f-4c57-8e37-ea77a59d2219)

- **Characters**: representa la lista de personajes de un determinado contenido. Esta caracterizada por las siguientes propiedades:

      charecters:object[] # se trata de una lista de objetos que contiene los diferentes personajes del contenido. Cada uno de estos objetos posee las siguientes propiedades:

          id:number # identificador único para cada uno de los personajes

          image:string # imagen de cada personaje

          name:string # nombre de cada personaje

          role:string # rol (papel) que desempeña cada personaje en la serie

      id:number # identifica al contenido al que pertenece la lista de personajes de manera unitaria. Sirve como identificador unico para el documento en la base de datos de firebase.

  ![image](https://github.com/AdrianCardonaCandil/animetracker/assets/96847234/cb173d3b-b7a3-4f4a-8a6b-5f16c6c441d0)

- **Contents**: representa a cada anime, sigue la siguiente estructura:
  
      id:number # identifica al contenido de manera unitaria. Sirve como identificador único para el documento en la base de datos de firebase

      synopsis:string # descripción del contenido a través de una sinopsis de su trama

      score:number # nota del contenido. La funcionalidad de otorgar una puntuación no se encuentra implementada al completo por lo que las notas de los contenidos se toman de la api de datos utilizada directamente
  
      status:string # información relativa al estado de emision del contenido (momento de emision temporal del mismo)
  
      episodes:number # número de episodios total del contenido
    
      type:string # tipo de contenido (serie 'tv', ova, music, etc...)
    
      source:string # fuente de origen del contenido (manga, light novel, etc...)
    
      duration:string # duración aproximada de los episodios del contenido determinado
    
      coverimage:string # imagen de portada (cover) del contenido
    
      backgroundimage:string # imagen de fondo (background) del contenido, si es que ésta se encuentra disponible
    
      year:number # año de emision del contenido
    
      season:string # temporada de emisión del contenido (primavera, verano, otoño o invierno) dentro del correspondiente año de emisión
    
      rating:string # índice de edad recomendada para la visualización del contenido.
    
      genres:string[] # lista que contiene los diferentes géneros asociados al contenido
    
      studios:string[] # lista que contiene los estudios de animación encargados de la producción y animación del determinado contenido
    
      likes:number # número de usuarios del sitio web que han añadido el contenido a su lista de favoritos, y, que, por ende, han dado un like al contenido
  
  ![image](https://github.com/AdrianCardonaCandil/animetracker/assets/96847234/4befadc7-ff5b-4755-93bb-e8021ec31ad0)

- **Episodes**: representa la lista de episodios de un determinado contenido. Esta caracterizada por las siguientes propiedades:

      episodes:object[] # se trata de una lista de objetos que contiene los diferentes episodios del contenido. Cada uno de estos objetos representa una página dentro del sistema de paginación de esta sección. El número máximo de episodios que soporta cada página es 100 episodios.
      Estos objetos página poseen las siguientes propiedades:

        data:object[] # se trata de una lista de objetos que contiene los diferentes episodios de la página correspondiente al objeto. Cada uno de estos episodios tiene las siguientes propiedades:

          aired:Date # fecha de emisión del correspondiente episodio

          number:number # número del episodio

          romanji:string # título del episodio en alfabeto romanji

          title:string # título del episodio en alfabeto inglés

        page:number # número de la página que identifica al objeto

      id:number # identifica al contenido al que pertenece la lista de episodios de manera unitaria. Sirve como identificador unico para el documento en la base de datos de firebase.

      last_page:number # número total de páginas para representar los episodios del contenido de manera completa. Información vital de cara al sistema de paginación.

      pages:number[] # array que contiene los números de las páginas que se encuentran actualmente cargadas en la base de datos de firebase del total de páginas que el contenido tiene disponible. Información vital para el sistema de paginación.

  ![image](https://github.com/AdrianCardonaCandil/animetracker/assets/96847234/6cb0cdd4-8b07-465a-b87e-2f5cd0beb3ba)

- **Users**: representa a cada usuario, sigue la siguiente estructura:

      id: string # Código único identificativo de cada usuario de manera unitaria.
  
      username: string # Nombre de usuario.
  
      email: string # Dirección de correo electrónico asociada a la cuenta
  
      password: string # Contraseña asociada a la cuenta
  
      description: string # Descripción del usuario. Editable en la página del perfil.
  
      country: string # Nacionalidad asociada al usuario
  
      profilePicture: string # Foto de perfil asociada al usuario
  
      watching: [] # Lista de contenidos que el usuario está viendo actualmente
  
      dropped: [] # Lista de contenidos que el usuario ha dropeado
  
      completed: [] # Lista de contenidos que el usuario ha completado
  
      planToWatch: [] # Lista de contenidos que el usuario planea ver
  
      favorites: [] # Lista de contenidos favoritos del usuario
  
      userScores: { [key: string]: number } # Lista de notas asociadas a los contenidos con los que el usuario ha interactuado
  
      contentProgress: { [key: string]: number } # Número de episodios de cada uno de los contenidos que el usuario está actualmente viendo

  ![image](https://github.com/AdrianCardonaCandil/animetracker/assets/96847234/4e62fab7-3567-4f37-ae1f-a7cb131ae6b6)

---

# Funcionalidades

## Inicio de sesión

El inicio de sesión se puede acceder mediante el botón de Sign IN o apretando el botón de perfil.

EL inicio de sesión de debe hacer con un username y password que existan en la base de datos. 

Si la contraseña o username no coincide con ningún usuario se recibe un error diciendo que no se ha encontrado un usuario con esas credenciales:

![image](https://github.com/AdrianCardonaCandil/animetracker/assets/96847234/d51e4e5d-ed13-4557-b743-72fb4ae58f78)

también comprueba que el password siga el formato adecuado:

![image](https://github.com/AdrianCardonaCandil/animetracker/assets/96847234/2e901716-51d2-4baf-80a7-3f5c9e42f1e8)

Para pruebas se puede usar los siguientes usuarios:

   > username: pepe
  password: Pass12345

![image](https://github.com/AdrianCardonaCandil/animetracker/assets/96847234/ccf55255-3906-4662-8862-b5ead058968f)


  > username: pepe4
  password: Pass1234


## Registro de usuario
Se utiliza los servicios de Firebase para el registro de usuario por lo que hay que tener en consideración utilizar correos válidos.
Además, hay validación de formularos por lo que:
- username debe ser único, en el caso de que no lo sea el usuario recibe un mensaje diciendo que ese username ya existe en la base de datos. Además, debe tener mínimo 2 caracteres y máximo 10
- email debe ser un correo válido sino sale un mensaje de error, además debe también ser único, esto se debe a las propias reglas de Firebase.
- password debe tener mínimo una mayúscula, minúscula, número y 8 caracteres.
- repeat password: para asegurar que el usuario ha metido la contraseña que quiere se debe repetir, si no coincide con el password entonces recibirá un error de que no coinciden.

![image](https://github.com/AdrianCardonaCandil/animetracker/assets/96847234/d1c032c2-70ec-42d3-a833-d6210aecb50f)


Una vez registrado recibe un mensaje de confirmación y se inicia sesión automáticamente.

![image](https://github.com/AdrianCardonaCandil/animetracker/assets/96847234/19747a58-3611-474e-9123-4fc58fefb997)

## Página Principal (Home)

En la sección superior de la página principal del sitio web podemos visualizar una sección donde se representa el anime con más puntuación (score) de nuestro sitio web.
En esta sección vemos la imagen de portada de dicho contenido, su nombre y descripción e información secuendaria relevante con respecto a la serie en cuestión.
Observamos dicha sección en la siguiente imagen:

![image](https://github.com/AdrianCardonaCandil/animetracker/assets/142026679/b2cbde12-0235-4d55-bc9d-a93cdc419f2b)

Seguidamente, podemos ver la barra de búsqueda del sitio web. La información relevante a dicha barra de búsqueda será descrita posteriormente en la sección perteneciente a la página de
búsqueda. En el contexto de la página principal, la selección de una opción en dicha barra o la realización de una búsqueda por nombre redirige a la página de búsqueda realizando además
dicha búsqueda.

En la parte inferior de la página se encuentran tres listas de contenidos con cinco resultados diferentes por cada una de las listas. Estas listas representan diferentes aspectos que se
detallan a continuación:

- Lista de animes con más nota del sitio web: la primera de las listas representa, a través de una búsqueda en la base de datos, una lista con los animes que más puntuación (score) poseen
  en nuestro sitio web. En concreto corresponden a los contenidos posicionados desde el número dos al número seis con respecto a dicha propiedad pues el primer contenido se visualiza en la
  sección superior (hero).

  Visualizamos dicha lista en la siguiente imagen:

  ![image](https://github.com/AdrianCardonaCandil/animetracker/assets/142026679/f7bb8ec6-46f1-4ba9-901f-994bac57394b)

- Lista de animes actualmente en emisión pertenecientes a la temporada actual: la segunda de las listas representa, mediante una consulta a la api de datos utilizada, una lista con los
  contenidos que están siendo actualmente emitidos en la temporada de anime actual.

  Visualizamos dicha lista en la siguiente imagen:

  ![image](https://github.com/AdrianCardonaCandil/animetracker/assets/142026679/6a49e814-90f0-4fd0-a471-e7a31f779f4f)

- Lista de animes pertenecientes a la siguiente o siguientes temporadas (no emitidos actualmente): la tercera de las listas representa, mediante una consulta a la api de datos utilizada,
  una lista con los contenidos que serán emitidos en futuras temporadas (upcoming seasons).

  Visualizamos dicha lista en la siguiente imagen:

  ![image](https://github.com/AdrianCardonaCandil/animetracker/assets/142026679/ca8a7c81-13ff-4069-898b-bf3ad13c8f41)

## Página de Contenido

Detallamos a continuación las características de la página de contenidos junto a las funcionalidad que brinda al usuario.

En la parte superior de la página podemos encontrar una sección que describe las características principales de un contenido. Concrétamente, nos referimos a aquellas tales como el nombre,
la descripción, la imagen de portada y la nota del mismo. Además, dicha sección brinda las funcionalidades que se detallan a continuación:

![image](https://github.com/AdrianCardonaCandil/animetracker/assets/142026679/8487694c-f19c-494b-8ea4-717ff3c2f979)

### Selección de listas

Se encuentra la funcionalidad de añadir al anime a algunas de las listas de seguimiento. 

![image](https://github.com/AdrianCardonaCandil/animetracker/assets/96847234/c0106847-7c9c-44bf-9b5c-24dfce8b0a6e)

Si  ya se encuentra seleccionada una lista aparecerá en color azul oscuro. Es importante recalcar que un anime no puede estar en más de 1 lista salvo que esa lista sea la de favoritos (ver más adelante) ya que si no sería contradictorio. 
Las listas para seleccionar son:
- Completed: animes completados
- PlanToWatch: animes que se quieren ver
- Watching: animes viendo
- Dropped: animes abandonados

Para borrar listas solo se debe deseleccionar la lista. Si se cambia de lista esta se borrará de la anterior y se añadirá a la nueva. 

Estas listas se podrán ver en el apartado de perfil del usuario.

### Dar like a un contenido

Hay un botón con un corazón, al clicarlo añadirá el anime a la lista de favoritos del usuario. Además, incrementa el contador de likes del anime, este se encuentra en el aside.

![image](https://github.com/AdrianCardonaCandil/animetracker/assets/96847234/61f2aaa4-e821-43e0-9840-0abb820ad6e0)

![image](https://github.com/AdrianCardonaCandil/animetracker/assets/96847234/9e09348c-5f78-4f95-88e4-93146035b42e)

En la sección inferior se encuentra una barra lateral (aside), que muestra información secundaria relativa al contenido (serie) que se está visualizando en la página. Incluye
datos referentes al número de likes que posee la serie, el tipo, la fuente, el número de episodios, etc... Se puede observar en la siguiente imagen:

![image](https://github.com/AdrianCardonaCandil/animetracker/assets/142026679/5fa8704e-7b0b-45e3-b3aa-11bdcb80a142)

A la derecha observamos una barra de navegación que nos permite alternar entre las sección de eposidios y personajes del contenido visualizado. Basta con pulsar sobre el nombre
de la sección para ser redirigidos adecuadamente.

### Sección de personajes

En la sección de personajes se puede observar la representación de la lista de personajes del contenido que se visualiza en ese momento. Cada uno de los personajes está representado
por un imagen del mismo, su nombre y, si se pulsa sobre el personaje y la descripción del mismo está disponible, se puede observar dicha descripción. Observamos dicha lista de personajes
en la siguiente imagen:

![image](https://github.com/AdrianCardonaCandil/animetracker/assets/142026679/30fd6093-47f2-4fb4-8709-276ee1aa382d)

### Sección de episodios

En la sección de episodios se puede observar la representación de la lista de episodios del contenido que se visualiza en ese momento. Cada uno de los episodios está representado en una
tabla que incluye las siguiente columnas:

- Número del episodio
- Nombre del episodio
- Fecha de emisión del episodio
- Estado de emisión del episodio

El estado de emisión del episodio puede variar entre tres estados diferenciados, los cuales son Aired (ya emitido), Airing (en emisión), y Yet To Air (aun sin emitir). El estado airing se da cuando
el episodio está actualmente siendo emitido (estrenado) en los canales de visualización autorizados nipones. Yet To Air se aprecia en un episodio cuando aún éste no ha sido estrenado.

La página de episodios cuenta con sistema de paginación. Si el contenido visualizado en la página tiene más de 100 episodios, se podrá navegar entre las diferentes páginas accesibles según el número
total de episodios utilizando la barra de paginación disponible en la parte inferior de la sección.

Observamos la sección descrita en la siguiente imagen:

![image](https://github.com/AdrianCardonaCandil/animetracker/assets/142026679/d1e552a2-bef5-457b-8cb1-43d42a33aa02)

Observamos la barra de navegación en un anime que cuenta con más de 100 episodios en la siguiente imagen:

![image](https://github.com/AdrianCardonaCandil/animetracker/assets/142026679/af5bbcff-5371-414a-9fee-6a2a842e7e07)

## Página búsqueda

La página de búsqueda permite al usuario realizar la funcionalidad de búsqueda y filtrado de contenidos según el nombre del mismos o diferentes filtros avanzados que serán descritos a continuación.

En la parte superior de la página se puede observar el mismo componente (barra) de búsqueda visible en la página inicial del sitio web. Dicha barra de búsqueda incluye cinco secciones diferenciadas
cada una de las cuales brinda la siguiente característica:

- Search: permite al usuario introducir el nombre de un contenido para realizar una búsqueda cuyo resultado incluirá aquellos animes cuyo nombre esté formado completa o parcialmente por el texto
  introducido por el usuario.
  
- Genres: permite al usuario seleccionar de una lista desplegable uno o varios generos que constituirán unos de los filtros para los resultados de la búsqueda. Los resultados solo contendrán
  contenidos que concuerden con aquellos géneros especificados por el usuario.
  
- Year: permite al usuario seleccionar de una lista desplegable un año que constituirá otro filtro para los resultados de la búsqueda. Los resultados solo contendrán aquellos contenidos
  que estén o hayan estado en emisión durante el año y temporada que el usuario o automáticamente se ha especificado. Cuando el usuario selecciona un año y no selecciona una temporada, se selecciona
  de forma automática la temporada actual en la que nos encontremos pues la búsqueda por año es complementaria a la búsqueda por temporada.

- Season: permite al usuario seleccionar de una lista desplegable una temporada que constituirá otro filtro para los resultados de la búsqueda. Los resultados solo contendrán aquellos contenidos
  que estén o hayan estado en emisión durante el año y temporada que el usuario o automáticamente se ha especificado. Cuando el usuario selecciona una temporada y no selecciona un año, se selecciona
  de forma automática el año actual en el que nos encontramos pues la búsqueda por temporada es complementaria a la búsqueda por año.

- Format: permite al usuario seleccionar de una lista desplegable un tipo (formato) de contenido que constituirá otros filtro para los resultados de búsqueda. Los resultados solo contendrán aquellos
  resultados cuyos contenidos concuerden en tipo con el tipo especificado con el usuario.

Podemos observar dicha barra de búsqueda en la siguiente imagen:

![image](https://github.com/AdrianCardonaCandil/animetracker/assets/142026679/d9a3cc3b-bbde-4d7b-93c3-b0706a45cb57)

Es necesario denotar que la búsqueda por nombre y géneros no es compatible con la búsqueda por año y temporada. Cuando el usuario seleccione una búsqueda por una de las opciones de estos subgrupos de
filtros, automáticamente las opciones seleccionadas en el subgrupo opuesto serán descartadas y eliminadas. Por ejemplo, en el caso de que se esté efectuando una búsqueda por los contenidos del año y
temporada actual, la barra de búsqueda adquiriría el siguiente aspecto:

![image](https://github.com/AdrianCardonaCandil/animetracker/assets/142026679/9e0f3655-af3d-4b57-b392-5fc1de17dfe4)

En el caso de que el usuario quisiese a continuación realizar un búsqueda por los contenidos cuyo nombre concuerden parcialmente o completamente con el texto 'Frieren', la barra adquiriría el siguiente
aspecto, eliminandose las opciones marcadas en la búsqueda anterior:

![image](https://github.com/AdrianCardonaCandil/animetracker/assets/142026679/c31113fb-7b31-4bd1-8b1b-31059211c5a5)

Por otra parte, en las imagenes anteriores se pueden apreciar también los tags de búsqueda que van marcando cada uno de los filtros u opciones que el usuario tiene activo a la hora de realizar una determinada
búsqueda. Los tags permiten interactuar con la propia búsqueda pues, al pulsar sobre uno de ellos, el usuario puede eliminar dicho filtro u opción de la búsqueda actual.

Los resultados se muestran en estilo carta de contenido. Cada uno de estos se visualiza por una imagen de portada y el nombre que caracteriza a ese contenido. Es muy probable que los resultados de una búsqueda
no sean visualizables en una sola página por lo que la paginación se extiende y es utilizable tambien a través del mismo componente reutilizable en esta página. La barra de paginación para manejar las diferentes
páginas de resultados es visualizable en la sección inferior de la página de búsqueda.

Se muestra a continuación una imagen de los resultados de una búsqueda cuyo tamaño en cantidad de resultados requiere del uso de paginación (búsqueda de la totalidad de contenidos emitidos en la temporada de otoño
en el año 2021):

![image](https://github.com/AdrianCardonaCandil/animetracker/assets/142026679/c511b9ed-9c7a-4899-8fe5-54fd9d45d889)
![image](https://github.com/AdrianCardonaCandil/animetracker/assets/142026679/293b4f22-aeec-42c8-aa25-105d9c264732)

** La página de búsqueda solo es accesible mediante la barra de búsqueda visualizada en la página principal del sitio web **

## Página de Ranking

La página de ranking permite visualizar una lista de los cincuenta animes con más puntuación (score) en nuestro sitio web. Para ello, se utiliza una consulta en la base de datos de firebase que nos devuelve el resultado deseaso. Cada uno de los resultados se representa en una tabla que incluye las siguiente columnas:

- Position: posición que ocupa el contenido en la totalidad del ranking
- Name: nombre del contenido
- Score: puntuación (score) del contenido que marca su posición en el ranking
- Status: información relevante con respecto al estado de emisión del contenido (emitido, en emisión o por emitir).

Visualizamos dicha página y la tabla de ranking que contiene en las siguientes imagenes:

![image](https://github.com/AdrianCardonaCandil/animetracker/assets/142026679/3a4d178a-f95a-4780-846d-739a88b25853)
![image](https://github.com/AdrianCardonaCandil/animetracker/assets/142026679/f4676e0c-e1ac-476c-bd57-eebd8822424e)

## Página de Perfil

En la página de Perfil se puede ver las listas de seguimiento además de ver datos del usuario (foto de perfil, nombre de usuario, descripción). Si el usuario se encuentra viendo su propio perfil, este podrá editar sus propios datos de perfil:

![image](https://github.com/AdrianCardonaCandil/animetracker/assets/96847234/d37ad5cd-27e4-41be-820d-a79d0bd89f20)

El navegador permite ir a una de las 5 listas, cada lista muestran los campos de cada anime como (titulo, año, género, etc). La lista que tiene más funcionalidad es la lista "watching" la cual tiene un contador de episodios vistos. Una vez que se llegue al total de episodios sale un mensaje preguntando si quiere pasar el anime a la lista de completados.

![image](https://github.com/AdrianCardonaCandil/animetracker/assets/96847234/4d6facec-50ea-4f76-a4e8-9a7e4ef6898e)

Si un usuario entra a la página de perfil que no es suya el botón de editar perfil y el contador de progreso desaparecen.

![image](https://github.com/AdrianCardonaCandil/animetracker/assets/96847234/fffba804-92bb-44d4-830b-1677c396b26a)


### Edición de perfil

Se encuentran 3 formularios con sus validaciones.

El primer formulario permite modificar el username, email y descripción. El username y email siguen la misma validación que en inicio de sesión y registro. además, se asegura que no se modifiquen a un usuario o correo existente que no sean los del propio usuario. La descripción debe tener mínimo de 10 caracteres y un máximo de 500.

![image](https://github.com/AdrianCardonaCandil/animetracker/assets/96847234/872da2fd-d41d-4241-9f60-e82b20b2c839)
![image](https://github.com/AdrianCardonaCandil/animetracker/assets/96847234/637f83c0-e5f5-43ca-beaa-754d7e8dd467)

![image](https://github.com/AdrianCardonaCandil/animetracker/assets/96847234/14ad1782-517b-475a-9f67-fb2dee3ae4f9)

El segundo permite modificar la contraseña sigue la mima validación que el registro de usuario.

![image](https://github.com/AdrianCardonaCandil/animetracker/assets/96847234/81ba5aed-78fa-4f21-a28e-322177f2bb35)

![image](https://github.com/AdrianCardonaCandil/animetracker/assets/96847234/00be5da9-7156-48ff-b7aa-86d823fe2d07)

El tercer formulario permite añadir una imagen como foto de perfil.

![image](https://github.com/AdrianCardonaCandil/animetracker/assets/96847234/0c158f59-5c70-4dce-9e19-840336e794d0)
![image](https://github.com/AdrianCardonaCandil/animetracker/assets/96847234/7b430f31-6541-440d-9f9e-7b95c69ae42e)

También hay un botón para eliminar la cuenta, si se preciona saldrá un mensaje preguntando si esta seguro. Si se acepta se borrará la cuenta

![image](https://github.com/AdrianCardonaCandil/animetracker/assets/96847234/1a512210-d62f-46ae-bf31-4bf814ae1a74)


---

# TRELLO
https://trello.com/b/Q4pjshn9/pwm
