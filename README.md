# animetracker
Angular Application For Tracking Anime Content

--- 
# Consideraciones previas

Para que este programa funcione se debe añadir a la capeta /src/environments el archivo env.dev.ts ya que ahí se encuentran las configuraciones para Jikan y Firebase

---
# Estructura del proyecto

* carpeta src : aquí se encuentra el código del proyecto
  - **app**
      - components: carpeta de componentes
        -   **content**: componentes relacionados con la página de contenido
            - **characters**: componente que enseña los personajes de un anime con su descripción si tuvieran.
            - **contentnav**: navegador de la página de contenido redirige a personajes o episodios
            - **episodes**: componente que enseña los episodios de un anime
            - **maininfo**: componente que enseña la información del anime( nombre, sinopsis, score), también contiene el botón de like y los selectores de lista y score.
            - **sideinfo**: contiene información del anme (número de likes, tipo, fuente, número de episodios, duración, estado, temporada, año, estudios, géneros, rating).
        -   **footer**: footer del sitio
        -   **header**: header del sitio que contiene los componentes signIn, signUp y la version mobile del header
            - **mobile-menu**: menu para la version mobile que sustituye el navegador del header normal.
            - **sign-in**: ventana modal para el inicio de sesión.
            - **sign-up**: ventana modal para el registro de usuario.
        -   **home**: componentes relacionados con la página home
            - **animelist**: componente que representa a cada fila de contenidos en la página principal
            - **hero** :  sección principal de la página principal donde se muestra el anime con más likes
        -   **profile**: componentes relacionado con el perfil del usuario
            - **edit-profile**: ventana modal para editar el perfil
            - **profile-nav**: navegador que redirige a cada lista de seguimiento
            - **table**: tabla donde se encuentran los animes de cada lista
              - **normal-row**: file de la tabla para todas las listas menos "watching"
              - **progress-row**: filas para la tabla de "watching" contiene el contador de progreso
            - **user-info**: sección donde se muestra el nombre del usuario,descripción, foto de perfil y el botón de editar perfil si es la página del usuario registrado.
        -   **ranking**: componentes relacionados con la página de ranking, enseña una tabla ordenada por animes con más score.
            - **rankheader**: descriptor de cada columna de la tabla.
            - **rankposition**:  fila de la tabla, contiene la posición, nombre,score y estado.
        -   **search**: componentes relacionados con la página search
            - **results** : resultados de la búsqueda.
            - **tags**: etiquetas de la búsqueda.
        -   **sharedComponents**: componentes que se reutilizan en otros componentes
            - **animecard**: componente que contiene la foto del anime y su nombre
            - **pagination**: componente que permite la paginación
            - **searchbar**: barra de búsqueda y filtros
  
      - models: carpeta de modelos de auth, content y user. Estos modelos sirven como interfaz de los servicios.
      - schemas: carpeta de schemas de character, characters, content, episodes y user. 
      -  services: carpeta de servicios de auth, content y  user. Contiene servicios para Firebase y Jikan.
  - assets: contiene las imágenes e iconos 
  - environments: contiene el documento de variables de entorno
  - styles: contiene los estilos generales
  

---
# Estructura de datos en Firebase

En Firebase se encuentran 5 colleciones en Cloud Firestore:
- **Character**: representa a un personaje de un anime, sigue la siguiente estructura:
 >   id:number

    image:string
    
    name:string
    
    about:string

  ![image](https://github.com/AdrianCardonaCandil/animetracker/assets/96847234/8c9e449d-df5f-4c57-8e37-ea77a59d2219)

- **Characters**

  ![image](https://github.com/AdrianCardonaCandil/animetracker/assets/96847234/cb173d3b-b7a3-4f4a-8a6b-5f16c6c441d0)

- **Contents**: representa a cada anime, sigue la siguiente estructura:
  
      id:number

       synopsis:string

      score:number
  
      status:string
  
      episodes:number
    
      type:string
    
      source:string
    
      duration:string
    
      coverimage:string
    
      backgroundimage:string
    
      year:number
    
      season:string
    
      rating:string
    
      genres:string[]
    
      studios:string[]
    
      likes:number
  
  ![image](https://github.com/AdrianCardonaCandil/animetracker/assets/96847234/4befadc7-ff5b-4755-93bb-e8021ec31ad0)

- **Episodes**

  ![image](https://github.com/AdrianCardonaCandil/animetracker/assets/96847234/6cb0cdd4-8b07-465a-b87e-2f5cd0beb3ba)

- **Users**: representa a cada usuario, sigue la siguiente estructura:

      id: string
  
      username: string
  
      email: string
  
      password: string
  
      description: string
  
      country: string
  
      profilePicture: string
  
      watching: []
  
      dropped: []
  
      completed: []
  
      planToWatch: []
  
      favorites: []
  
      userScores: { [key: string]: number }
  
      contentProgress: { [key: string]: number }

  ![image](https://github.com/AdrianCardonaCandil/animetracker/assets/96847234/4e62fab7-3567-4f37-ae1f-a7cb131ae6b6)

---

# Funcionalidades

## Inicio de sesión

El inicio de sesión se puede acceder mediante el botón de Sign IN o apretando el botón de perfil.

EL inicio de sesión de debe hacer con un username y password que existan en la base de datos. 

Si la contraseña o username no coincide con ningún usuario se recibe un error diciendo que no se ha encontrado un usuario con esas credenciales:

![image](https://github.com/AdrianCardonaCandil/animetracker/assets/96847234/d51e4e5d-ed13-4557-b743-72fb4ae58f78)

Tambien comprueba que el password siga el formato adecuado:

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
- email debe ser un correo válido sino sale un mensaje de error, además debe tambien ser único, esto se debe a las propias reglas de Firebase.
- password debe tener mínimo una mayúscula, minúscula, número y 8 caracteres.
- repeat password: para asegurar que el usuario ha metido la contraseña que quiere se debe repetir, si no coincide con el password entonces recibirá un error de que no coinciden.

![image](https://github.com/AdrianCardonaCandil/animetracker/assets/96847234/d1c032c2-70ec-42d3-a833-d6210aecb50f)


Una vez registrado recibe un mensaje de confirmación y se inicia sesión automáticamente.

![image](https://github.com/AdrianCardonaCandil/animetracker/assets/96847234/19747a58-3611-474e-9123-4fc58fefb997)

## Página de Contenido

Se refiere a la página de contenido a la página de cada anime, donde se encuentra información del anime y funcionalidades.

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

## Página búsqueda
## Página de Ranking

## Página de Perfil

En la página de Perfil se puede ver las listas de seguimiento además de ver datos del usuario (foto de perfil, nombre de usuario, descripción). Si el usuario se encuentra viendo su propio perfil, este podrá editar sus propios datos de perfil:

El navegador permite ir a una de las 5 listas, cada lista muestran los campos de cada anime como (titulo, año, género, etc). La lista que tiene más funcionalidad es la lista "watching" la cual tiene un contador de episodios vistos. Una vez que se llegue al total de episodios sale un mensaje preguntando si quiere pasar el anime a la lista de completados.

Si un usuario entra a la página de perfil que no es suya el botón de editar perfil y el contador de progreso desaparecen.

![image](https://github.com/AdrianCardonaCandil/animetracker/assets/96847234/fffba804-92bb-44d4-830b-1677c396b26a)


### Edición de perfil

Se encuentran 3 formularios con sus validaciones.

El primer formulario permite modificar el username, email y descripción. El username y email siguen la misma validación que en inicio de sesión y registro. además, se asegura que no se modifiquen a un usuario o correo existente que no sean los del propio usuario. La descripción debe tener mínimo de 10 caracteres y un máximo de 500.

El segundo permite modificar la contraseña sigue la mima vvalidación que el registro de usuario.

El tercer formulario permite añadir una imagen como foto de perfil.


