# School Manager

Una plataforma para evaluar y hacer seguimiento del rendimiento escolar de estudiantes, construida con React y Vite en el frontend, Java con Spring Boot en el backend, y MySQL como base de datos.

## Tabla de Contenidos

- [Descripción](#descripción)
- [Tecnologías](#tecnologías)
- [Instalación](#instalación)
- [Uso](#uso)
- [Despliegue](#despliegue)
- [Contribución](#contribución)
- [Licencia](#licencia)

## Descripción

Esta plataforma permite a los usuarios:

- Iniciar sesión y gestionar sus sesiones.
- Ver y editar perfiles de estudiantes.
- Consultar el rendimiento académico.
- Administrar usuarios y roles (para administradores).

## Tecnologías

- **Frontend**:
  - React
  - Vite
  - Styled Components

- **Backend**:
  - Java con Spring Boot
  - MySQL
  - Spring Security (para autenticación y autorización)

- **Otros**:
  - Axios (para hacer peticiones HTTP)
  - React Router DOM (para manejo de rutas)

## Instalación

### Frontend

1. **Clona el repositorio**:

    ```bash
    git clone https://github.com/No-Country-simulation/c20-09-ft-java-react/FrontEnd
    cd plataforma-evaluacion/frontend
    ```

2. **Instala las dependencias**:

    ```bash
    npm install
    ```

3. **Inicia el servidor de desarrollo**:

    ```bash
    npm run dev
    ```

    La aplicación estará disponible en `http://localhost:5173`.

### Backend

1. **Clona el repositorio** (si aún no lo has hecho):

    ```bash
    git clone https://github.com/No-Country-simulation/c20-09-ft-java-react/BackEnd
    ```

2. **Configura la base de datos**. Asegúrate de tener MySQL instalado y una base de datos creada. Actualiza las credenciales en el archivo `application.properties`:

    ```properties
    spring.datasource.url=jdbc:mysql://localhost:3306/tu_base_de_datos
    spring.datasource.username=tu_usuario
    spring.datasource.password=tu_contraseña
    ```

3. **Compila e inicia el backend**:

    ```bash
    ./mvnw spring-boot:run
    ```

    El backend estará disponible en `http://localhost:8080`.

## Uso

1. **Inicia sesión** en la aplicación web en `http://localhost:3000/login`.
2. **Accede** a las diferentes secciones de la plataforma, como el perfil del estudiante, rendimiento académico y administración, dependiendo de los permisos del usuario.
3. **Gestiona** los datos y perfiles de los estudiantes según los permisos y roles asignados.

## Despliegue

Para desplegar la aplicación en un entorno de producción, realiza los siguientes pasos:

1. **Frontend**:
    - Construye el proyecto con Vite:

        ```bash
        npm run build
        ```

    - El contenido de la carpeta `dist` puede ser servido por un servidor web estático.

2. **Backend**:
    - Compila el proyecto con Maven:

        ```bash
        ./mvnw package
        ```

    - Despliega el archivo JAR resultante en un servidor de aplicaciones o plataforma en la nube (AWS, Heroku, etc.).

## Contribución

¡Las contribuciones son bienvenidas! Si deseas contribuir a este proyecto:

1. **Realiza un fork** del repositorio.
2. **Crea una rama** para tu característica (`git checkout -b feature/nueva-caracteristica`).
3. **Realiza los cambios** y haz commit (`git commit -am 'Añadir nueva caracte
