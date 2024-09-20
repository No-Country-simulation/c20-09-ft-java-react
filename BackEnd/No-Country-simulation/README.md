<p align="center">
  <img src="https://github.com/No-Country-simulation/c20-09-ft-java-react/blob/develop/FrontEnd/design/img/banner_backend.webp" alt="banner backend"/>
</p>

<div align="center">

![Java 17](https://img.shields.io/badge/Java%2017-007396?logo=java&logoColor=white&color=007396)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-6DB33F?logo=spring-boot&logoColor=white&color=6DB33F)
![Spring Boot Actuator](https://img.shields.io/badge/Spring%20Boot%20Actuator-6DB33F?logo=spring-boot&logoColor=white&color=6DB33F)
![Spring Boot Data JPA](https://img.shields.io/badge/Spring%20Boot%20Data%20JPA-6DB33F?logo=spring-boot&logoColor=white&color=6DB33F)
![Spring Boot Mail](https://img.shields.io/badge/Spring%20Boot%20Mail-6DB33F?logo=spring-boot&logoColor=white&color=6DB33F)
![Spring Boot Security](https://img.shields.io/badge/Spring%20Boot%20Security-6DB33F?logo=spring-boot&logoColor=white&color=6DB33F)
![Spring Boot Validation](https://img.shields.io/badge/Spring%20Boot%20Validation-6DB33F?logo=spring-boot&logoColor=white&color=6DB33F)
![Spring Boot Web](https://img.shields.io/badge/Spring%20Boot%20Web-6DB33F?logo=spring-boot&logoColor=white&color=6DB33F)
![Spring Boot Thymeleaf](https://img.shields.io/badge/Spring%20Boot%20Thymeleaf-6DB33F?logo=spring-boot&logoColor=white&color=6DB33F)
![Springdoc OpenAPI](https://img.shields.io/badge/Springdoc%20OpenAPI-6DB33F?logo=springdoc&logoColor=white&color=6DB33F)
![MySQL Connector](https://img.shields.io/badge/MySQL%20Connector-4479A1?logo=mysql&logoColor=white&color=4479A1)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?logo=postgresql&logoColor=white&color=4169E1)
![Lombok](https://img.shields.io/badge/Lombok-2C2D72?logo=lombok&logoColor=white&color=2C2D72)
![Auth0 Java JWT](https://img.shields.io/badge/Auth0%20Java%20JWT-000000?logo=auth0&logoColor=white&color=000000)

</div>

<h1 align="center">Back-End</h1>

## Estructura del Proyecto

El proyecto está organizado en varios paquetes, cada uno de los cuales contiene clases que manejan diferentes aspectos de la lógica de la aplicación. A continuación se presenta un resumen de los paquetes y las clases más importantes.

- [Confing](#configuración)
- [Data](#carga-de-datos)
- [Exception](#manejo-de-excepciones)
- [Persistence](#persistencia)
- [Rest](#controladores-rest)
- [Security](#configuración-de-seguridad)
- [Service](#servicios)
- [Utility](#utilidades)
- [Agradecimientos](#agradecimientos)

## Configuración 
### Paquete `com.school.confing`

Este paquete contiene configuraciones esenciales para la seguridad, el inicio de la aplicación y la generación de la documentación de la API.

### Clases

#### 1. `JwtTokenValidator`
- **Descripción**: Extiende `OncePerRequestFilter` para validar los tokens JWT en cada solicitud HTTP.
- **Funcionalidad**:
  - Extrae el token JWT de la cabecera `Authorization`.
  - Valida el token utilizando `JwtUtils`.
  - Si el token es válido, establece un contexto de seguridad con el nombre de usuario y las autoridades extraídas.
- **Propósito**: Garantizar que solo los usuarios autenticados con tokens válidos puedan acceder a los recursos protegidos de la API.

#### 2. `AppInitializer`
- **Descripción**: Componente que se ejecuta al iniciar la aplicación.
- **Funcionalidad**:
  - Inicializa un administrador predeterminado (Super Admin) con un correo y DNI predefinidos.
  - Usa el servicio `AdminServiceImpl` para crear el administrador al arrancar la aplicación.
- **Propósito**: Asegurar que siempre haya un administrador por defecto disponible en la base de datos.

#### 3. `SwaggerConfig`
- **Descripción**: Configuración de Swagger para la documentación de la API.
- **Funcionalidad**:
  - Define la integración con Swagger para generar la documentación de la API.
  - Configura los servidores de desarrollo y producción.
  - Establece un esquema de seguridad basado en autenticación JWT (Bearer Authentication).
  - Proporciona los recursos necesarios para acceder a la interfaz de Swagger (`/swagger-ui/`) y los documentos OpenAPI (`/v3/api-docs/`).
- **Propósito**: Facilitar la visualización y exploración de la API mediante una interfaz gráfica y documentación automática.

Este paquete asegura que la aplicación esté protegida mediante autenticación JWT, que siempre se inicialice un administrador por defecto, y que la documentación de la API esté disponible para los desarrolladores.

## Carga de Datos
### Paquete `com.school.data`

Este paquete se encarga de la configuración y carga inicial de datos en la aplicación, específicamente para los roles de usuario.

### Clases

#### 1. `DataLoader`
- **Descripción**: Componente que se utiliza para cargar datos iniciales al arrancar la aplicación.
- **Funcionalidad**:
  - Implementa un `ApplicationRunner` que se ejecuta al iniciar la aplicación.
  - Llama al método `setupRoles()` del servicio `RoleSetup` para configurar los roles necesarios.
- **Propósito**: Asegurar que los roles de usuario estén configurados correctamente en la base de datos antes de que la aplicación empiece a recibir solicitudes.

Este paquete facilita la configuración automática de roles, lo que simplifica la gestión de permisos y la seguridad de la aplicación.


## Manejo de Excepciones 
### Paquete `com.school.exception`

Este paquete se encarga de gestionar las excepciones que pueden ocurrir en la aplicación, proporcionando respuestas adecuadas y estructuradas para diferentes tipos de errores.

### Clases

#### 1. `CustomAccessDeniedHandler`
- **Descripción**: Implementa `AccessDeniedHandler` para manejar excepciones de acceso denegado.
- **Funcionalidad**:
  - Configura la respuesta HTTP con un código 403 (Forbidden).
  - Devuelve un mensaje JSON detallando el error de acceso denegado.
- **Propósito**: Informar a los usuarios sobre la falta de permisos para acceder a recursos específicos.

#### 2. `EvaluationExceptionHandler`
- **Descripción**: Manejador de excepciones específico para las evaluaciones.
- **Funcionalidad**:
  - Maneja la excepción `EvaluationNotFoundException`.
  - Retorna un `ResponseEntity` con un mensaje y estado 404 (Not Found).
- **Propósito**: Proveer respuestas adecuadas cuando no se encuentran evaluaciones.

#### 3. `GlobalExceptionHandler`
- **Descripción**: Manejador global de excepciones para toda la aplicación.
- **Funcionalidad**:
  - Maneja múltiples tipos de excepciones, como `UserNotFoundException`, `DataIntegrityViolationException`, y más.
  - Devuelve respuestas estructuradas con códigos de estado y mensajes claros.
- **Propósito**: Centralizar el manejo de errores para ofrecer respuestas coherentes y comprensibles.

#### 4. `NotificationExceptionHandler`
- **Descripción**: Manejador de excepciones para las notificaciones.
- **Funcionalidad**:
  - Maneja excepciones como `ResourceNotFoundException`, `AccessDeniedException`, y más.
  - Proporciona respuestas personalizadas en función del tipo de error.
- **Propósito**: Brindar información específica sobre errores relacionados con notificaciones.

#### 5. Clases de Excepción Personalizadas
- **`EmailServiceException`**: Indica problemas al enviar correos electrónicos.
- **`ErrorResponse`**: Estructura que encapsula la información de error que se devuelve al cliente, incluyendo un mensaje y un tipo de error.
- **`EvaluationNotFoundException`**: Indica que no se han encontrado evaluaciones para un DNI específico.
- **`ExpiredJwtException`**: Señala que un token JWT ha expirado.
- **`InvalidTokenException`**: Indica que un token proporcionado no es válido.
- **`ResourceNotFoundException`**: Utilizada para señalar que un recurso no se ha encontrado.
- **`UserAlreadyExistsException`**: Indica que un intento de registro de usuario falló porque ya existe.
- **`UserNotFoundException`**: Indica que no se ha encontrado un usuario específico.

Este paquete asegura que todos los errores sean manejados de manera uniforme y que los usuarios reciban información clara sobre cualquier problema que surja.

## Persistencia
### Paquete `com.school.persistence.entities`

Este paquete contiene las entidades que representan las tablas de la base de datos, utilizando JPA para la persistencia de datos. A continuación se describen las principales clases:

#### Clases

##### 1. `Address`
Representa la dirección de un usuario, con campos como país, estado, ciudad, código postal y dirección.

##### 2. `Admin`
Extiende de la clase `User`. Representa a un administrador del sistema y contiene una relación uno a uno con `UserEntity`.

##### 3. `Course`
Representa un curso académico. Está relacionado con las entidades `Subject` (materia) y `Teacher` (profesor).

##### 4. `CourseStudent`
Asocia estudiantes con cursos, incluyendo la nota y comentarios, así como la fecha de la evaluación.

##### 5. `Evaluation`
Almacena información sobre las evaluaciones de los estudiantes, incluyendo nombre, apellido, DNI, año, trimestre, materia y retroalimentación.

##### 6. `MedicalInformation`
Contiene información médica relevante, como tipo de sangre, alergias y condiciones adicionales.

##### 7. `Notification`
Modelo para las notificaciones enviadas a estudiantes, padres o profesores, incluyendo detalles como el grupo objetivo, mensaje y fecha de envío.

##### 8. `Parent`
Extiende de la clase `User`. Representa a un padre o tutor, con una relación de muchos a muchos con los estudiantes y campos adicionales como la relación con el niño y ocupación.

##### 9. `PermissionEntity`
Define permisos que pueden ser asignados a roles dentro del sistema.

##### 10. `ProfessionalInformation`
Almacena información profesional de un profesor, incluyendo títulos académicos, materias que enseña y horas de trabajo.

##### 11. `RoleEntity`
Representa roles dentro del sistema, que pueden tener uno o más permisos asociados.

##### 12. `Student`
Extiende de la clase `User`. Representa a un estudiante, con relaciones con padres y profesores, así como información médica y de inscripción.

##### 13. `Subject`
Representa una materia en el sistema.

##### 14. `Teacher`
Extiende de la clase `User`. Representa a un profesor, con relaciones con estudiantes y un campo para información profesional.

##### 15. `User`
Clase abstracta que contiene campos comunes para usuarios, como nombre, apellido, DNI, correo electrónico, número de teléfono y dirección.

##### 16. `UserEntity`
Modelo de usuario que gestiona la autenticación y autorización en el sistema, incluyendo roles, tokens y estados de la cuenta.

### Paquete `com.school.persistence.enums`
#### Clases
##### `PermissionEnum`
Define los permisos disponibles en el sistema:
- `READ_PRIVILEGES`: Permiso para leer información.
- `WRITE_PRIVILEGES`: Permiso para escribir información.
- `DELETE_PRIVILEGES`: Permiso para eliminar información.
- `UPDATE_PRIVILEGES`: Permiso para actualizar información.

#### `RoleEnum`
Define los roles disponibles en el sistema:
- `STUDENT`: Rol para estudiantes.
- `PARENT`: Rol para padres.
- `TEACHER`: Rol para profesores.
- `ADMIN`: Rol para administradores.

### Paquete `com.school.persistence.repository`

Este paquete contiene las interfaces de repositorio que permiten realizar operaciones de acceso a datos en las entidades del sistema.

#### Clases 
##### `AdminRepository`
Permite realizar operaciones CRUD sobre la entidad `Admin`.
- `findByUser(UserEntity userEntity)`: Busca un administrador por su entidad de usuario.
- `existsByDni(String dni)`: Verifica si existe un administrador con el DNI proporcionado.

##### `CourseRepository`
Permite realizar operaciones CRUD sobre la entidad `Course`.

##### `CourseStudentRepository`
Permite realizar operaciones CRUD sobre la entidad `CourseStudent`.
- `findByStudent(Student student)`: Busca todas las inscripciones de un estudiante en cursos.

##### `EvaluationRepository`
Permite realizar operaciones CRUD sobre la entidad `Evaluation`.
- `findByDniStudent(String dniStudent)`: Busca todas las evaluaciones de un estudiante por su DNI.

##### `NotificationRepository`
Permite realizar operaciones CRUD sobre la entidad `Notification`.
- `findByStudentDni(String dni)`: Busca notificaciones enviadas a un estudiante por su DNI.
- `findByParentDni(String dni)`: Busca notificaciones enviadas a un padre por su DNI.
- `findCourseNotifications(String year, String session, String dni)`: Busca notificaciones de un curso en un año y turno específicos.

##### `ParentRepository`
Permite realizar operaciones CRUD sobre la entidad `Parent`.
- `findByUser(UserEntity user)`: Busca un padre por su entidad de usuario.
- `existsByDni(String dni)`: Verifica si existe un padre con el DNI proporcionado.
- `findByLastName(String lastName, Pageable pageable)`: Busca padres por apellido con paginación.

##### `PermissionRepository`
Permite realizar operaciones CRUD sobre la entidad `PermissionEntity`.
- `findByName(String name)`: Busca un permiso por su nombre.

##### `RoleEntityRepository`
Permite realizar operaciones CRUD sobre la entidad `RoleEntity`.
- `findRoleEntitiesByRoleEnumIn(List<String> roleNameList)`: Busca roles por una lista de nombres de rol.
- `findByRoleEnum(RoleEnum roleEnum)`: Busca un rol por su enumeración.

##### `StudentRepository`
Permite realizar operaciones CRUD sobre la entidad `Student`.
- `findByUser(UserEntity userEntity)`: Busca un estudiante por su entidad de usuario.
- `existsByDni(String dni)`: Verifica si existe un estudiante con el DNI proporcionado.
- `findByDniWithParents(String dni)`: Busca un estudiante y su información de padres por el DNI.
- `findByParentDni(String dni)`: Busca estudiantes asociados con un padre por el DNI del padre.
- `findByLastName(String lastName, Pageable pageable)`: Busca estudiantes por apellido con paginación.

##### `SubjectRepository`
Permite realizar operaciones CRUD sobre la entidad `Subject`.
- `existsByName(String name)`: Verifica si existe una materia por su nombre.

##### `TeacherRepository`
Permite realizar operaciones CRUD sobre la entidad `Teacher`.
- `existsByDni(String dni)`: Verifica si existe un profesor con el DNI proporcionado.
- `findByUser(UserEntity userEntity)`: Busca un profesor por su entidad de usuario.
- `findByLastName(String lastName, Pageable pageable)`: Busca profesores por apellido con paginación.

##### `UserEntityRepository`
Permite realizar operaciones CRUD sobre la entidad `UserEntity`.
- `findUserEntityByEmailAndIsDeletedFalse(String email)`: Busca un usuario por email que no haya sido eliminado.
- `existsByEmail(String email)`: Verifica si existe un usuario por su email.
- `findByResetPasswordToken(String resetPasswordToken)`: Busca un usuario por el token de restablecimiento de contraseña.

## Controladores REST
### Paquete `com.school.rest.controller`
Este paquete contiene controladores REST que manejan las solicitudes HTTP y coordinan la interacción entre el cliente y los servicios de la aplicación.

#### `AuthenticationController`
- **Descripción**: Maneja la autenticación de usuarios.
- **Endpoints**:
  - `POST /auth/login`: Inicia sesión y devuelve un token de autenticación.
  - `POST /auth/refresh-token`: Permite refrescar el token de autenticación.

#### `ControllerTeacher`
- **Descripción**: Controlador dedicado a las operaciones relacionadas con los profesores.
- **Endpoints**:
  - `GET /teacher/verifyStudent/{dni}`: Verifica la existencia de un estudiante por su DNI.

#### `CourseController`
- **Descripción**: Maneja la creación y gestión de cursos.
- **Endpoints**:
  - `POST /api/v1/course/create`: Crea un nuevo curso.

#### `CourseStudentController`
- **Descripción**: Relaciona estudiantes con cursos.
- **Endpoints**:
  - `POST /api/v1/course-student/create`: Crea una asociación entre un curso y un estudiante.
  - `GET /api/v1/course-student/{studentId}`: Obtiene los cursos asociados a un estudiante.

#### `EvaluationController`
- **Descripción**: Administra las evaluaciones.
- **Endpoints**:
  - `POST /evaluations/load`: Carga una nueva evaluación para un estudiante.
  - `POST /evaluations/student`: Obtiene las evaluaciones de un estudiante por su DNI.

#### `NotificationController`
- **Descripción**: Administra el envío y recuperación de notificaciones para estudiantes y padres.
- **Endpoints**:
  - `POST /notifications/send/all`: Envía una notificación a todos los estudiantes y padres de un curso.
  - `GET /notifications/course-notifications`: Obtiene notificaciones de un curso.
  - `GET /notifications/student/{dni}`: Obtiene notificaciones específicas para un estudiante.
  - `GET /notifications/parent/{dni}`: Obtiene notificaciones relevantes para un padre.

#### `StatusServerController`
- **Descripción**: Proporciona información sobre el estado del servidor.
- **Endpoints**:
  - `GET /api/v1/status`: Verifica si el servidor está en funcionamiento.

#### `SubjectController`
- **Descripción**: Maneja la creación de asignaturas.
- **Endpoints**:
  - `POST /api/v1/subject/create`: Crea una nueva asignatura.

#### `UserPasswordResetController`
- **Descripción**: Maneja las solicitudes de recuperación de contraseña.
- **Endpoints**:
  - `POST /api/forgot-password`: Inicia el proceso de recuperación de contraseña.
  - `GET /api/reset_password`: Procesa la solicitud de restablecimiento de contraseña.





### Paquete `com.school.rest.entityController`

Este paquete contiene controladores REST para gestionar el registro y administración de entidades en el sistema escolar. Los controladores permiten registrar administradores, padres, estudiantes y profesores, así como realizar operaciones de actualización, búsqueda y eliminación.

#### AdminController

- **URL**: `/admin`
- **Funciones**:
  - **POST /register**: Registra un nuevo administrador en el sistema. 
    - **Request Body**: `AdminRegistrationDto`
    - **Respuestas**:
      - `201`: Administrador registrado exitosamente.
      - `400`: Datos de entrada inválidos.
      - `500`: Error interno del servidor.

#### ParentController

- **URL**: `/admin/parent`
- **Funciones**:
  - **POST /register**: Registra un nuevo padre.
    - **Request Body**: `ParentRegistrationDto`
    - **Respuestas**:
      - `201`: Padre registrado exitosamente.
      - `400`: Datos de entrada inválidos.
      - `500`: Error interno del servidor.
  - **PUT /update/{id}**: Actualiza los detalles de un padre por ID.
  - **GET /find{id}**: Encuentra un padre por ID.
  - **DELETE /delete/{id}**: Elimina un padre por ID.
  - **GET /verify/{dni}**: Verifica la existencia de un niño por su DNI.

#### StudentController

- **URL**: `/admin/student`
- **Funciones**:
  - **POST /register**: Registra un nuevo estudiante.
    - **Request Body**: `StudentRegistrationDto`
    - **Respuestas**:
      - `201`: Estudiante registrado exitosamente.
      - `400`: Datos de entrada inválidos.
      - `500`: Error interno del servidor.
  - **PUT /update/{id}**: Actualiza los detalles de un estudiante por ID.
  - **GET /find{id}**: Encuentra un estudiante por ID.
  - **DELETE /delete{id}**: Elimina un estudiante por ID.
  - **POST /verifyChild**: Verifica un niño por su DNI.

#### TeacherController

- **URL**: `/admin/teacher`
- **Funciones**:
  - **POST /register**: Registra un nuevo profesor.
    - **Request Body**: `TeacherRegistrationDto`
    - **Respuestas**:
      - `201`: Profesor registrado exitosamente.
      - `400`: Datos de entrada inválidos.
      - `500`: Error interno del servidor.
  - **GET /find/{id}**: Encuentra un profesor por ID.
  - **GET /findAll/withoutPagination**: Obtiene una lista de todos los profesores sin paginación.
  - **GET /findByLastName**: Encuentra profesores por apellido con paginación.
  - **GET /findAll**: Obtiene una lista de todos los profesores con paginación.
  - **PUT /update/{id}**: Actualiza los detalles de un profesor por ID.
  - **DELETE /delete/{id}**: Elimina un profesor por ID.
  - **GET /verify/{dni}**: Verifica la existencia de un estudiante por su DNI.

### Paquete `com.school.rest.request`

Este paquete contiene las clases de solicitud (request) que se utilizan para manejar las entradas de los usuarios en el sistema. Estas clases incluyen validaciones para asegurar que los datos proporcionados sean correctos.

#### AuthLoginRequest

- **Descripción**: Solicitud de inicio de sesión con validaciones.
- **Campos**:
  - `email`: Correo electrónico del usuario (requerido, debe ser válido).
  - `password`: Contraseña del usuario (requerida, debe tener entre 11 y 12 caracteres, con al menos una letra mayúscula, una letra minúscula y un carácter especial).

#### AuthRegisterRoleRequest

- **Descripción**: Solicitud para registrar roles de usuario.
- **Campos**:
  - `roleListName`: Lista de roles (máximo uno).

#### AuthRegisterUserRequest

- **Descripción**: Solicitud para registrar un nuevo usuario.
- **Campos**:
  - `email`: Correo electrónico del usuario (requerido).
  - `dni`: Documento Nacional de Identidad (requerido).
  - `username`: Nombre de usuario (opcional).
  - `roleRequest`: Detalles de los roles a asignar (opcional).
  - `profileType`: Tipo de perfil (requerido).

#### ChildDniRequest

- **Descripción**: Solicitud para verificar el DNI de un niño.
- **Campos**:
  - `childDNI`: DNI del niño (requerido).

#### CourseRequest

- **Descripción**: Solicitud para crear o actualizar un curso.
- **Campos**:
  - `subjectId`: ID de la asignatura.
  - `teacherId`: ID del profesor.

#### CourseStudentRequest

- **Descripción**: Solicitud para asociar un estudiante a un curso.
- **Campos**:
  - `courseId`: ID del curso.
  - `studentId`: ID del estudiante.
  - `nota`: Calificación del estudiante.
  - `comments`: Comentarios sobre el estudiante.

#### DniRequest

- **Descripción**: Solicitud para validar el DNI.
- **Campos**:
  - `dni`: DNI del usuario (requerido, debe ser un número válido).

#### PasswordRecoveryRequest

- **Descripción**: Solicitud para recuperar la contraseña.
- **Campos**:
  - `email`: Correo electrónico del usuario (requerido).

#### PasswordResetRequest

- **Descripción**: Solicitud para restablecer la contraseña.
- **Campos**:
  - `token`: Token de recuperación (requerido).
  - `password`: Nueva contraseña (requerida, debe tener entre 11 y 15 caracteres y cumplir con las reglas de seguridad).

#### RefreshTokenRequest

- **Descripción**: Solicitud para refrescar un token de acceso.
- **Campos**:
  - `refreshToken`: Token de refresco (requerido).

#### SubjectRequest

- **Descripción**: Solicitud para crear o actualizar una asignatura.
- **Campos**:
  - `name`: Nombre de la asignatura.

### Paquete `com.school.rest.response`

Este paquete contiene las clases de respuesta (response) utilizadas para enviar datos de vuelta al cliente. Estas clases estructuran las respuestas de la API y aseguran que se envíen los mensajes adecuados en cada caso.

#### ApiError

- **Descripción**: Clase que representa un error de la API.
- **Campos**:
  - `message`: Mensaje de error.
  - `details`: Detalles adicionales sobre el error.

#### AuthResponse

- **Descripción**: Respuesta de autenticación que incluye información del usuario.
- **Campos**:
  - `name`: Nombre del usuario.
  - `password`: Contraseña del usuario.
  - `message`: Mensaje de respuesta.
  - `refreshToken`: Token de refresco.
  - `status`: Estado de la respuesta (true/false).

#### DeleteResponse

- **Descripción**: Respuesta para operaciones de eliminación.
- **Campos**:
  - `message`: Mensaje sobre la operación de eliminación.
  - `success`: Indica si la operación fue exitosa.

#### LoginAuthResponse

- **Descripción**: Respuesta para el inicio de sesión.
- **Campos**:
  - `name`: Nombre del usuario.
  - `dni`: Documento Nacional de Identidad.
  - `mensaje`: Mensaje de respuesta.
  - `token`: Token de acceso.
  - `refreshToken`: Token de refresco.
  - `status`: Estado de la respuesta (true/false).

#### PasswordRecoveryResponse

- **Descripción**: Respuesta para la recuperación de contraseña.
- **Campos**:
  - `message`: Mensaje sobre el proceso de recuperación.
  - `token`: Token para la recuperación de la contraseña (opcional).

#### RegisterResponse

- **Descripción**: Respuesta para el registro de un nuevo usuario.
- **Campos**:
  - `email`: Correo electrónico del usuario registrado.
  - `password`: Contraseña del usuario.

#### Response

- **Descripción**: Clase genérica para enviar respuestas con un mensaje y datos.
- **Campos**:
  - `message`: Mensaje de respuesta.
  - `data`: Datos de la respuesta (tipo genérico).

#### StudentResponse

- **Descripción**: Respuesta que contiene información del estudiante.
- **Campos**:
  - `dni`: Documento Nacional de Identidad del estudiante.
  - `firstName`: Nombre del estudiante.
  - `lastName`: Apellido del estudiante.
  - `year`: Año escolar del estudiante.
  - `session`: Sesión del estudiante.
  - `parentName`: Nombre del padre o tutor.
  - `parentLastName`: Apellido del padre o tutor.

#### UpdateResponse

- **Descripción**: Respuesta para operaciones de actualización.
- **Campos**:
  - `message`: Mensaje sobre la operación de actualización.
  - `status`: Indica si la operación fue exitosa.
  - `entity`: Entidad actualizada (tipo genérico).

## Configuración de Seguridad
### Paquete `com.school.security`

Este paquete contiene la configuración de seguridad de la aplicación, utilizando Spring Security para gestionar la autenticación y autorización.

#### SecurityConfig

- **Descripción**: Clase de configuración principal para la seguridad de la aplicación.
- **Características**:
  - Configura la política de creación de sesiones para ser **stateless**.
  - Establece las reglas de acceso a diferentes rutas de la API.
  - Permite la integración con CORS y configuraciones de seguridad de las solicitudes HTTP.
  
- **Rutas Accesibles**:
  - **Sin autenticación**: 
    - `/swagger-ui.html`, `/v3/api-docs/**`, `/webjars/**`, `/swagger-ui/**`
    - `/api/v1/status`
    - `/auth/login`
    - `/api/forgot-password`, `/api/reset_password`
  - **Con roles específicos**: 
    - Permisos para administradores, estudiantes, padres y profesores en diferentes rutas relacionadas con la gestión de evaluaciones y notificaciones.

- **Manejo de errores**: 
  - Configura un manejador de acceso denegado personalizado y un punto de entrada de autenticación.

#### RoleSetup

- **Descripción**: Clase responsable de la configuración inicial de los roles y permisos en la aplicación.
- **Método**:
  - `setupRoles()`: Crea y configura los roles de `TEACHER`, `PARENT`, `STUDENT` y `ADMIN` junto con sus respectivos permisos utilizando el servicio de permisos de rol.

#### Componentes de Seguridad

- **JwtTokenValidator**: Filtro que valida los tokens JWT en las solicitudes entrantes.
- **CustomAccessDeniedHandler**: Manejador personalizado para gestionar accesos denegados.
- **PasswordEncoder**: Utiliza BCrypt para el cifrado de contraseñas.

Este paquete asegura que solo los usuarios autenticados y autorizados puedan acceder a ciertos recursos de la aplicación, proporcionando así una capa robusta de seguridad.

## Servicios
### Paquete `com.school.service.dto`

Este paquete contiene las clases de **Data Transfer Objects (DTO)**, que se utilizan para transferir datos entre las distintas capas de la aplicación. Estos DTO aseguran que los datos estén estructurados correctamente y validan las entradas antes de ser procesadas.

#### AddressDto
- **Descripción**: Representa la dirección de una entidad.
- **Campos**:
  - `streetNameNumberDepartmentFloorAndNumber`
  - `city`
  - `state`
  - `zipCode`

#### AdminRegistrationDto
- **Descripción**: DTO para la registración de administradores.
- **Validaciones**: 
  - Nombre, DNI y correo electrónico deben ser válidos.

#### CourseDto
- **Descripción**: Representa un curso en el sistema.
- **Campos**:
  - `id`
  - `subjectId`
  - `teacherId`

#### CourseStudentDto
- **Descripción**: DTO que asocia estudiantes con cursos y sus evaluaciones.
- **Campos**:
  - `courseId`
  - `studentId`
  - `nota`
  - `comments`
  - `fecha`

#### EvaluationDTO
- **Descripción**: DTO para las evaluaciones de estudiantes.
- **Validaciones**: Asegura que los campos esenciales como `dniStudent`, `year`, `trimester`, `subject`, y `feedback` no estén vacíos.

#### MedicalInformationDto
- **Descripción**: DTO que encapsula información médica de una entidad.
- **Campos**:
  - `bloodType`
  - `allergies`
  - `additionalConditions`

#### NotificationDTO
- **Descripción**: DTO para enviar notificaciones a estudiantes, padres o grupos.
- **Validaciones**: Valida campos como `year`, `session`, `message`, `targetGroup`, y `dni`.

#### ParentDto
- **Descripción**: Representa a un padre en el sistema.
- **Campos**:
  - `id`, `name`, `lastName`, `dni`, `phoneNumber`, `email`, etc.

#### ParentRegistrationDto
- **Descripción**: DTO para la registración de padres.
- **Validaciones**: Incluye validaciones para nombre, apellido, DNI, número de teléfono, y correo electrónico.

#### ProfessionalInformationDto
- **Descripción**: DTO que encapsula información profesional de un docente.
- **Campos**:
  - `academicTitles`
  - `subjectCodeNameMap`
  - `workingHours`
  - `tutorship`
  - `extracurricularClasses`

#### StudentDto
- **Descripción**: Representa a un estudiante en el sistema.
- **Campos**:
  - `id`, `address`, `session`, `name`, `lastName`, `dni`, `phoneNumber`, etc.

#### StudentRegistrationDto
- **Descripción**: DTO para la registración de estudiantes.
- **Validaciones**: Asegura que los campos como nombre, apellido, DNI y correo electrónico sean válidos.

#### TeacherDto
- **Descripción**: Representa a un docente en el sistema.
- **Campos**:
  - `id`, `name`, `lastName`, `dni`, `phoneNumber`, etc.

#### TeacherRegistrationDto
- **Descripción**: DTO para la registración de docentes.
- **Validaciones**: Valida campos como nombre, apellido, DNI, número de teléfono, y correo electrónico.

#### UpdateParentDto
- **Descripción**: DTO para la actualización de datos de padres.
- **Validaciones**: Incluye validaciones similares a las de `ParentRegistrationDto`.

#### UpdateStudentDto
- **Descripción**: DTO para la actualización de datos de estudiantes.
- **Validaciones**: Similar a `StudentRegistrationDto`, pero permite la actualización de datos existentes.

#### UpdateTeacherDto
- **Descripción**: DTO para la actualización de datos de docentes.
- **Validaciones**: Incluye validaciones similares a las de `TeacherRegistrationDto`.

Estos DTOs facilitan la validación y transferencia de datos, mejorando la integridad y consistencia de la información en la aplicación.


### Paquete: `com.school.service.implementation`

Este paquete contiene las implementaciones de los servicios que gestionan la lógica de negocio en la aplicación. A continuación, se detallan las principales clases y sus responsabilidades:

#### `AdminServiceImpl`
Este servicio maneja la lógica relacionada con los administradores de la aplicación.
- **Registro de Administradores**: Registra nuevos administradores utilizando el `AdminRepository` y el `UserEntityServiceImpl`.
- **Verificación de DNI**: Verifica si el DNI del administrador ya está registrado.
- **Creación de Usuarios**: Crea un registro de usuario con el rol de administrador y lo asocia con los datos del administrador.
- **Logging**: Utiliza un mecanismo de logging para el seguimiento de eventos importantes.

#### `CourseServiceImpl`
Este servicio gestiona la creación de cursos y su asociación con asignaturas y profesores.
- **Búsqueda de Asignaturas y Profesores**: Busca asignaturas y profesores según los IDs proporcionados en las solicitudes.
- **Creación de Cursos**: Crea cursos y los guarda en la base de datos utilizando el `CourseRepository`.
- **Transformación de Entidades**: Transforma las entidades `Course` en `CourseDto` para las respuestas.

#### `CourseStudentService`
Este servicio maneja las relaciones entre cursos y estudiantes.
- **Registro de Relaciones**: Crea nuevas relaciones entre estudiantes y cursos, registrando notas y comentarios.
- **Recuperación de Asignaciones**: Recupera las asignaciones de estudiantes a cursos específicos.
- **Interacción con Repositorios**: Utiliza repositorios como `CourseStudentRepository` y `StudentRepository` para interactuar con la base de datos.

#### `EmailServiceImpl`
Este servicio se encarga del envío de correos electrónicos, como la recuperación de contraseñas y la confirmación de cambios.
- **Envío de Correos**: Envía correos electrónicos utilizando plantillas de `Thymeleaf`.
- **Manejo de Excepciones**: Maneja excepciones relacionadas con el envío de correos mediante `EmailServiceException`.

#### `EvaluationServiceImpl`
Este servicio gestiona la lógica relacionada con las evaluaciones.
- **Guardado de Evaluaciones**: Guarda evaluaciones en la base de datos utilizando el `EvaluationRepository`.
- **Recuperación de Evaluaciones**: Recupera evaluaciones por el DNI del estudiante.
- **Manejo de Excepciones**: Maneja excepciones cuando no se encuentran evaluaciones para un estudiante dado.

#### `NotificationServiceImpl`
Este servicio gestiona el envío de notificaciones a estudiantes, padres y cursos completos.
- **Envío de Notificaciones**: Permite enviar notificaciones basadas en el DNI del estudiante o asociadas a un curso en particular.
- **Validación de Datos**: Valida los datos proporcionados y guarda las notificaciones en el repositorio correspondiente.
- **Respuestas a Notificaciones**: Permite agregar respuestas a notificaciones previamente enviadas.

#### `ParentServiceImpl`
Este servicio gestiona la creación, actualización y eliminación de padres.
- **Registro y Asociación**: Registra usuarios asociados a padres, valida DNIs, y asocia padres con sus hijos.
- **Interacción con Repositorios**: Utiliza los repositorios `ParentRepository`, `StudentRepository`, `UserEntityRepository` y el servicio `UserEntityServiceImpl`.

#### `RolePermissionServiceImpl`
Este servicio maneja la creación de roles con sus permisos asociados.
- **Creación de Roles**: Maneja la creación de roles y permite asignar permisos a roles específicos, como `ADMIN`, `TEACHER`, `PARENT`, y `STUDENT`.
- **Interacción con Repositorios**: Utiliza los repositorios `RoleEntityRepository` y `PermissionRepository`.

#### `StudentServiceImpl`
Este servicio gestiona la creación, actualización y eliminación de estudiantes.
- **Búsqueda de Estudiantes**: Permite la búsqueda de estudiantes por apellido y verificación de estudiantes mediante DNI.
- **Interacción con Repositorios**: Utiliza los repositorios `StudentRepository`, `UserEntityRepository`, y el servicio `UserEntityServiceImpl`.

#### `SubjectServiceImpl`
Este servicio proporciona la lógica para la creación de materias.
- **Verificación de Materias**: Verifica si ya existen materias antes de crear nuevas.
- **Interacción con Repositorios**: Utiliza el repositorio `SubjectRepository`.

#### `TeacherServiceImpl`
Este servicio gestiona la lógica relacionada con la administración de profesores.
- **Creación de Profesores**: Verifica si el DNI ya está registrado, genera una contraseña basada en el DNI y registra al profesor como usuario en el sistema.
- **Actualización de Profesores**: Permite actualizar los datos de un profesor existente utilizando un DTO de actualización.
- **Eliminación de Profesores**: Marca al profesor y al usuario asociado como eliminados en el sistema.
- **Búsqueda de Profesores**: Soporta la búsqueda de profesores por ID y apellido, y devuelve la información en formato DTO.
- **Verificación de Estudiantes**: Proporciona la funcionalidad de verificar la existencia de estudiantes a partir de su DNI.
  
Dependencias:
- `TeacherRepository` y `UserEntityRepository` para las interacciones con la base de datos.
- `TeacherMapper` para convertir entre entidades y DTOs.
- `PasswordUtil` para generar contraseñas.
- `StudentServiceImpl` para verificar información relacionada con estudiantes.

#### `UserEntityServiceImpl`
Este servicio gestiona la creación, autenticación y actualización de usuarios en el sistema.
- **Registro de Usuarios**: Maneja el registro de nuevos usuarios, vinculándolos con roles y permisos adecuados.
- **Autenticación de Usuarios**: Utiliza JWT para la autenticación de usuarios y proporciona métodos para refrescar tokens de acceso.
- **Gestión de Roles y Permisos**: Asigna roles a los usuarios y asegura que los permisos de los roles sean aplicados correctamente.
- **Actualización de Contraseñas**: Permite a los usuarios actualizar su contraseña y gestionar tokens de restablecimiento de contraseñas.

Dependencias:
- `UserEntityRepository`, `RoleEntityRepository` para la interacción con la base de datos.
- `JwtUtils` para la gestión de tokens JWT.
- `PasswordEncoder` para encriptar contraseñas.














### Paquete: `com.school.service.interfaces`

Este paquete contiene las interfaces de servicio que definen los contratos de las operaciones principales de la aplicación. Estas interfaces permiten una clara separación de la lógica de negocio y ayudan a mantener la flexibilidad para futuras implementaciones. Las interfaces incluidas son:

- **GenericService**: Define los métodos CRUD genéricos (`create`, `update`, `findById`, `delete`) aplicables a diferentes entidades con sus respectivos DTOs y tipos de retorno.
  
- **ICourseService**: Proporciona métodos relacionados con la gestión de cursos, como la creación de un curso mediante una solicitud específica.

- **ICourseStudentService**: Gestiona la relación entre estudiantes y cursos, permitiendo la creación de registros y la obtención de estudiantes asociados a un curso.

- **IEmailService**: Encargada del envío de correos electrónicos relacionados con la recuperación de contraseñas y la confirmación de cambios de contraseña, manejando posibles excepciones relacionadas con el servicio de email.

- **IEvaluationService**: Gestiona las evaluaciones académicas de los estudiantes, incluyendo la creación de evaluaciones y la obtención de evaluaciones basadas en el DNI de un estudiante.

- **INotificationService**: Define los métodos para el envío de notificaciones dentro de la aplicación, permitiendo el envío a estudiantes, padres, y cursos, además de agregar respuestas a notificaciones.

- **IRoleService**: Proporciona métodos para la creación de roles con permisos específicos y la asignación de permisos a roles, además de la búsqueda y creación de permisos.

- **ISubjectService**: Maneja la creación de materias basadas en solicitudes recibidas.

- **IUserService**: Define los métodos para la autenticación y gestión de usuarios, como el registro de usuarios, la actualización de contraseñas mediante tokens, y el manejo de tokens JWT para la autenticación y actualización.


## Utilidades 
### Paquete `com.school.utility.mapper

Este paquete contiene mappers que facilitan la conversión entre entidades y objetos de transferencia de datos (DTOs). Los mappers juegan un papel clave en la separación de la lógica de negocio y la capa de presentación, permitiendo una fácil conversión entre los datos de las entidades y los objetos que se utilizan en las vistas y controladores.

#### Clases y Componentes:

- **GenericMapper**:  
  Interfaz genérica que define los métodos para transformar entidades a DTOs y viceversa:
  - `convertToDto`: Convierte una entidad en un DTO.
  - `createFromDto`: Crea una entidad a partir de un DTO.
  - `updateFromDto`: Actualiza una entidad utilizando datos de un DTO.

- **ParentMapper**:  
  Implementa `GenericMapper` para la entidad `Parent` y los DTOs asociados (`ParentDto`, `ParentRegistrationDto`, `UpdateParentDto`). Facilita la conversión de entidades relacionadas con los padres y sus direcciones, gestionando información personal y de contacto.

- **StudentMapper**:  
  Implementa `GenericMapper` para la entidad `Student` y los DTOs asociados (`StudentDto`, `StudentRegistrationDto`, `UpdateStudentDto`). Además, gestiona la conversión de información médica de los estudiantes a través de `MedicalInformationDto`.

- **TeacherMapper**:  
  Implementa `GenericMapper` para la entidad `Teacher` y los DTOs asociados (`TeacherDto`, `TeacherRegistrationDto`, `UpdateTeacherDto`). Gestiona la conversión de información profesional y personal de los profesores.

- **EvaluationMapper**:  
  Convierte entre entidades `Evaluation` y `EvaluationDTO`, gestionando la información relacionada con las evaluaciones de los estudiantes.

- **NotificationMapper**:  
  Convierte entre entidades `Notification` y `NotificationDTO`, gestionando las notificaciones enviadas a los estudiantes, padres y cursos. Facilita el procesamiento de mensajes, grupos objetivo (e.g., `student`, `parent`, `course`), y la asociación con el DNI del receptor.


### Paquete `com.school.utility`

El paquete `utility` contiene utilidades clave para la seguridad y generación de respuestas estándar en la aplicación. A continuación, se describen las clases y sus principales funcionalidades:

#### JwtUtils
Clase que gestiona la creación y validación de tokens JWT (JSON Web Tokens) para autenticar usuarios de manera segura.

- **createToken(Authentication authentication)**: Genera un token JWT para un usuario autenticado, estableciendo las autoridades, el emisor, la fecha de emisión y la fecha de expiración.
- **validateToken(String token)**: Valida el token JWT, verificando su firma y decodificando su contenido.
- **extractSubjectFromToken(DecodedJWT decodedJWT)**: Extrae el sujeto (usualmente el nombre de usuario) del token decodificado.
- **getUsernameClaim(DecodedJWT decodedJWT, String claimName)**: Obtiene un claim específico del token JWT.
- **createRefreshToken(UsernamePasswordAuthenticationToken authentication)**: Crea un token de refresh para renovar el token de acceso.
- **validateRefreshToken(String oldRefreshToken)**: Valida el token de refresh cuando se solicita uno nuevo.

#### PasswordUtil
Clase encargada de generar contraseñas seguras para los usuarios, combinando un prefijo especial y el DNI del usuario.

- **generatePassword(String dni)**: Genera una contraseña segura compuesta por un prefijo aleatorio (una letra mayúscula, una minúscula y un carácter especial) seguido del DNI del usuario.

#### ResponseUtils
Clase que proporciona métodos para crear respuestas estándar y de error en la API.

- **createResponse(String message)**: Crea una respuesta exitosa que incluye un mensaje, un estado de éxito y una marca de tiempo.
- **createErrorResponse(String message, int code)**: Crea una respuesta de error que incluye un mensaje de error, un código de estado y una marca de tiempo.

---

## Agradecimientos

Este archivo README fue creado con la ayuda de [ChatGPT](https://openai.com/chatgpt) para estructurar, redactar y revisar el contenido.


