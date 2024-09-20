<p align="center">
  <img src="./FrontEnd/design/img/logoSchoolManager.webp" alt="Logo School Manager"/>
</p>

<div align="center">

![Estado del Proyecto](https://img.shields.io/badge/Estado-Terminado-green)
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-green)
<br>

![Java](https://img.shields.io/badge/Java-007396?logo=java&logoColor=white&color=007396)
![Spring Boot](https://img.shields.io/badge/Spring--Boot-6DB33F?logo=spring-boot&logoColor=white&color=6DB33F)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?logo=mysql&logoColor=white&color=4479A1)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-336791?logo=postgresql&logoColor=white&color=336791)
![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB&color=61DAFB)
![React Router DOM](https://img.shields.io/badge/React--Router--DOM-CA4245?logo=react-router&logoColor=white&color=CA4245)
![Axios](https://img.shields.io/badge/Axios-5A29E4?logo=axios&logoColor=white&color=5A29E4)
![Swagger](https://img.shields.io/badge/Swagger-85EA2D?logo=swagger&logoColor=black&color=85EA2D)
![JWT](https://img.shields.io/badge/JWT-black?logo=json-web-tokens&logoColor=white&color=black)

</div>

# School Manager

Proyecto desarrollado como parte de una simulación laboral en [No Country](https://www.nocountry.tech/simulacion-laboral).

Esta aplicación está dirigida a instituciones educativas, ya sean públicas o privadas, que se encuentren en transición hacia la digitalización de la información relevante para los profesores, estudiantes y sus padres. Puede ser utilizada tanto en nivel primario como secundario. Su finalidad es sustituir el boletín de notas y el cuaderno de comunicados, permitiendo que la información llegue a los padres de forma más dinámica y que tengan un mayor control sobre la enseñanza de sus hijos.


## Tabla de Contenidos

- [Descripción](#descripción)
- [Tecnologías](#tecnologías)
- [Instalación](#instalación)
- [Uso](#uso)
- [Despliegue](#despliegue)
- [Documentación](#documentación)
- [Contribución](#contribución)
- [Agradecimientos](#agradecimientos) 
- [Autores](#autores)

## Descripción

Esta plataforma ofrece las siguientes funcionalidades a los usuarios:

- **Administradores**: Administrar usuarios y roles.
- **Alumnos, Padres y Profesores**: Iniciar sesión y gestionar sus cuentas.
- **Profesores**: Registrar el rendimiento académico, proporcionar retroalimentación y enviar notificaciones.
- **Alumnos y Padres**: Consultar el rendimiento académico, la retroalimentación recibida y las notificaciones.

#### Características

- **Administradores**: Control total sobre los usuarios y roles dentro de la plataforma.
- **Alumnos, Padres y Profesores**: Acceso a sus respectivas cuentas para gestionar información personal y académica.
- **Profesores**: Capacidad para ingresar notas, ofrecer comentarios y comunicar novedades a los estudiantes y sus familias.
- **Alumnos y Padres**: Visualización de información académica, retroalimentación de los profesores y notificaciones importantes.

## Tecnologías

- **Backend:**
  - Java 17
  - Spring Boot 3.3.3, con módulos:
    - Actuator
    - Data JPA
    - Security
    - Validation
    - Web
    - Thymeleaf
  - Springdoc OpenAPI (para documentación)
  - MySQL / PostgreSQL (base de datos)
  - JWT (Auth0 Java JWT para autenticación)

- **Frontend:**
  - React 18.3.1
  - Chakra UI y Emotion (para estilos) 
  - React Hook Form (para manejo de formularios)
  - Framer Motion (animaciones)
  - Axios (para peticiones HTTP)
  - React Router DOM (para manejo de rutas)

- **Otros:**
  - Swagger (para documentación de API)
  - Postman / Insomnia (para pruebas de API)

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

## Documentación

Aquí puedes acceder a la documentación específica de cada una de las áreas del proyecto:

- [Diseño](./FrontEnd/design/README.md)
- [Frontend](./FrontEnd/README.md)
- [Backend](https://github.com/No-Country-simulation/c20-09-ft-java-react/blob/develop/BackEnd/No-Country-simulation/README.md)
- [Test](./Test/README.md)

## Contribución

¡Las contribuciones son bienvenidas! Si deseas contribuir a este proyecto:

1. **Realiza un fork** del repositorio.
2. **Crea una rama** para tu característica (`git checkout -b feature/nueva-caracteristica`).
3. **Realiza los cambios** y haz commit (`git commit -m "Añadir nueva caracteristica"`)

## Agradecimientos

Este proyecto fue posible gracias a la organización de simulaciones laborales por parte de [No Country](https://www.nocountry.tech/). Agradecemos a todo su equipo por brindar un espacio donde los desarrolladores pueden poner en práctica sus habilidades y colaborar en proyectos reales, contribuyendo al crecimiento profesional de todos los participantes.

## Autores

Proyecto creado por:

<div style="display: flex; align-items: center;">
    <img src="https://github.com/DeyviCZ.png?size=50" alt="Fica" style="border-radius: 50%; margin-right: 10px;">
    <p>
      <strong>Deyvi Correa Zamora</strong> | Front-end
    </p>
</div>

[![GitHub](https://img.shields.io/badge/GitHub-DeyviCZ-blue)](https://github.com/DeyviCZ)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Deyvi_Correa_Zamora-blue)](https://www.linkedin.com/in/deyvi-correa-zamora/)

<div style="display: flex; align-items: center;">
    <img src="https://github.com/DVTecno.png?size=50" alt="CVTecno" style="border-radius: 50%; margin-right: 10px;">
    <p>
      <strong>Diego Veras</strong> | Back-end
    </p>
</div>

[![GitHub](https://img.shields.io/badge/GitHub-DVTecno-blue)](https://github.com/DVTecno)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Diego_Cristian_Alfredo_Veras-blue)](https://www.linkedin.com/in/diego-cristian-alfredo-v-54b459249/)

<div style="display: flex; align-items: center;">
    <img src="https://github.com/Jaracax.png?size=50" alt="Jaracax" style="border-radius: 50%; margin-right: 10px;">
    <p>
      <strong>Jose Antonio Dominguez</strong> | Back-end
    </p>
</div>

[![GitHub](https://img.shields.io/badge/GitHub-Jaracax-blue)](https://github.com/Jaracax)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Jose_Antonio_Dominguez-blue)](https://www.linkedin.com/in/josedominguez99/)

<div style="display: flex; align-items: center;">
    <img src="https://github.com/AlejandroPerez24.png?size=50" alt="AlejandroPerez" style="border-radius: 50%; margin-right: 10px; width: 50px; height: 50px;">
    <p>
        <strong>Alejandro Perez</strong> | Back-end
    </p>
</div>

[![GitHub](https://img.shields.io/badge/GitHub-AlejandroPerez24-blue)](https://github.com/AlejandroPerez24)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Alejandro_P.-blue)](https://www.linkedin.com/in/alejandroqperez/)

<div style="display: flex; align-items: center;">
    <img src="https://github.com/jhonOrr.png?size=50" alt="jorrego-runa" style="border-radius: 50%; margin-right: 10px; width: 50px; height: 50px;">
    <p>
        <strong>Jhon Orrego</strong> | Full-Stack
    </p>
</div>


[![GitHub](https://img.shields.io/badge/GitHub-JhonOrr-blue)](https://github.com/jhonOrr)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Jhon_Orrego-blue)](https://www.linkedin.com/in/jhon-orrego-jesus/)

<div style="display: flex; align-items: center;">
    <img src="https://github.com/Fica-Millan.png?size=50" alt="Fica" style="border-radius: 50%; margin-right: 10px;">
    <p>
      <strong>Yesica Fica Millán</strong> | Full-stack
    </p>
</div>

[![GitHub](https://img.shields.io/badge/GitHub-Fica_Millan-blue)](https://github.com/Fica-Millan)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Yesica_Fica_Millan-blue)](https://www.linkedin.com/in/yesica-fica-millan/)

<div style="display: flex; align-items: center;">
    <img src="https://github.com/KarinaReguera.png?size=50" alt="KarinaReguera" style="border-radius: 50%; margin-right: 10px; width: 50px; height: 50px;">
    <p>
      <strong>Karina Reguera</strong> | QA Tester
    </p>
</div>

[![GitHub](https://img.shields.io/badge/GitHub-KarinaReguera-blue)](https://github.com/KarinaReguera)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Karina_Reguera-blue)](https://www.linkedin.com/in/karina-reguera/)

<div style="display: flex; align-items: center;">
    <img src="https://raw.githubusercontent.com/No-Country-simulation/c20-09-ft-java-react/refs/heads/develop/FrontEnd/design/img/paloma_carnaghi.webp?token=GHSAT0AAAAAACTN6Z4W33R2HKQ6IFGO2K7MZXNUZBA" alt="Paloma Carnaghi" style="border-radius: 50%; margin-right: 10px; width: 50px; height: 50px;">
    <p>
        <strong>Paloma Carnaghi</strong> | Team Leader
    </p>
</div>

Paloma acompañó al equipo como Team Leader, guiándonos en el proceso y ofreciendo soporte. Aunque no participó en la escritura de código ni en la toma de decisiones técnicas, su presencia y liderazgo fueron fundamentales para el éxito del proyecto.

[![Behance](https://img.shields.io/badge/Behance-Paloma_Carnaghi-blue)](https://www.behance.net/palomacarnaghi1)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Paloma_Carnaghi-blue)](https://www.linkedin.com/in/paloma-carnaghi/)
