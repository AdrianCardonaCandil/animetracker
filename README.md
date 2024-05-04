# animetracker
Angular Application For Tracking Anime Content

--- 
# Consideraciones previas

Para que este programa funcione se debe añadir a la capeta /src/environments el archivo env.dev.ts ya que ahí se encuentran las configuraciones para Jikan y Firebase

---
# Organización del proyecto

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
            - **edit-profile**
            - **profile-nav**
            - **table**
            - **user-info**
        -   **ranking**: componentes relacionados con la página de ranking
            - **rankheader**
            - **rankposition**   
        -   **search**: componentes relacionados con la página search
            - **results**
            - **tags**
        -   **sharedComponents**: componentes que se reutilizan en otros componentes
            - **animecard**
            - **pagination**
            - **searchbar**
  
      - models: carpeta de modelos
      - schemas: carpeta de schemas
      -  services: carpeta de servicios de auth, content y  user
  - assets: contiene las imágenes e iconos 
  - environments: contiene el documento de variables de entorno
  - styles: contiene los estilos generales
  

---

# Funcionalidades

## Inicio de sesión

EL inicio de sesión de debe hacer con un username y password que existan en la base de datos. 

Si la contraseña o username no coincide con ningún usuario se recibe un error diciendo que no se ha encontrado un usuario con esas credenciales.

Para pruebas se puede usar los siguientes usuarios:

   > username: pepe
  password: Pass12345

  > username: pepe4
  password: Pass1234


## Registro de usuario
Se utiliza los servicios de Firebase para el registro de usuario por lo que hay que tener en consideración utilizar correos válidos.
Además, hay validación de formularos por lo que:
- username debe ser único, en el caso de que no lo sea el usuario recibe un mensaje diciendo que ese username ya existe en la base de datos. Además, debe tener mínimo 2 caracteres y máximo 10
- email debe ser un correo válido sino sale un mensaje de error, además debe tambien ser único, esto se debe a las propias reglas de Firebase.
- password debe tener mínimo una mayúscula, minúscula, número y 8 caracteres.
- repeat password: para asegurar que el usuario ha metido la contraseña que quiere se debe repetir, si no coincide con el password entonces recibirá un error de que no coinciden.

Una vez registrado recibe un mensaje de confirmación y se inicia sesión automáticamente.
  
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

### Edición de perfil

Se encuentran 3 formularios con sus validaciones.

El primer formulario permite modificar el username, email y descripción. El username y email siguen la misma validación que en inicio de sesión y registro. además, se asegura que no se modifiquen a un usuario o correo existente que no sean los del propio usuario. La descripción debe tener mínimo de 10 caracteres y un máximo de 500.

El segundo permite modificar la contraseña sigue la mima vvalidación que el registro de usuario.

El tercer formulario permite añadir una imagen como foto de perfil.


