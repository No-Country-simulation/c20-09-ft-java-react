<p align="center">
    <img src="../FrontEnd/design/img/banner_test.webp" alt="banner test">
</p>

<div align="center">

![Jira](https://img.shields.io/badge/Jira-0052CC?logo=jira&logoColor=white)
![X-Ray](https://img.shields.io/badge/X--Ray-0052CC?logo=x-ray&logoColor=white)
![Postman](https://img.shields.io/badge/Postman-FF6C37?logo=postman&logoColor=white)
![Swagger](https://img.shields.io/badge/Swagger-85EA2D?logo=swagger&logoColor=black)
![Git Bash](https://img.shields.io/badge/Git--Bash-4A4A55?logo=git&logoColor=white)
![GitHub](https://img.shields.io/badge/GitHub-181717?logo=github&logoColor=white)
![Visual Studio Code](https://img.shields.io/badge/VS--Code-0078D4?logo=visual-studio-code&logoColor=white)
![MySQL Workbench](https://img.shields.io/badge/MySQL--Workbench-4479A1?logo=mysql&logoColor=white)
![IntelliJ IDEA](https://img.shields.io/badge/IntelliJ--IDEA-000000?logo=intellij-idea&logoColor=white)

</div>

<h1 align="center">Plan de Pruebas</h1>

## Tabla de Contenidos

- [Objetivo](#objetivo)
- [Metodología](#metodología)
- [Tipos de Pruebas](#tipos-de-pruebas)
- [Herramientas](#herramientas)
- [Agradecimiento](#agradecimiento)
- [Autor](#autor)


## Objetivo
- El objetivo de este plan de pruebas es validar que la aplicación web funcione correctamente, ofreciendo una interfaz intuitiva, segura y fácil de usar. 

- Además, se busca garantizar que la plataforma satisfaga las necesidades específicas de sus principales usuarios: alumnos, padres y profesores.

## Metodología
1. **Identificación de elementos y características a probar**: Se definen los componentes clave del sistema que serán objeto de prueba.
2. **Definición de la estrategia de pruebas**: Se establece un plan detallado con los tipos de pruebas a realizar y los resultados esperados.
3. **Ejecución de pruebas**: Implementación de los casos de prueba según la estrategia definida.


## Tipos de Pruebas

### Pruebas Funcionales
- **Registro de usuarios**: Verificación de que el sistema permita crear cuentas de estudiantes, padres y profesores, asignar roles y establecer permisos de acceso correctamente.
- **Login de usuarios**: Comprobación de que los usuarios puedan acceder a sus perfiles (estudiantes, padres y profesores) de manera segura.
- **Gestión de módulos**: Pruebas de la correcta funcionalidad de los módulos de gestión, permitiendo el seguimiento del Historial Académico, Informes de Rendimiento y Notificaciones.
- **Ingreso de calificaciones y comentarios**: Validación de que el sistema permita ingresar calificaciones numéricas y generar comentarios de los profesores.


### Pruebas de Usabilidad
- **Interfaz de usuario**: Evaluación de la facilidad de uso, navegabilidad y diseño intuitivo adaptado a los distintos perfiles de usuario.
- **Experiencia del usuario**: Identificación de posibles obstáculos o dificultades en el uso del sistema y propuestas de mejora.

### Pruebas de Seguridad
- **Protección de datos**: Verificación de la seguridad en el almacenamiento y manejo de los datos de estudiantes, padres y profesores.


# Herramientas

Para llevar a cabo el plan de pruebas de manera eficiente, se utilizaron diversas herramientas que cubren tanto la gestión de pruebas como el desarrollo, la validación de API y el control de versiones. A continuación, se detallan las principales herramientas y su propósito en el proceso de pruebas:

- **Gestión de pruebas**: Jira, X-Ray
- **API Testing**: Postman, Swagger
- **Control de versiones**: Git Bash, GitHub
- **Entorno de desarrollo**: Visual Studio Code, IntelliJ IDEA Community, MySQL Workbench
- **Documentación**: Google Drive



### Gestión de pruebas:
- **Jira**: Jira para gestionar las tareas relacionadas con las pruebas, rastrear el progreso de los casos de prueba y documentar cualquier incidencia o bug encontrado durante las pruebas.
- **X-Ray**: X-Ray usado en conjunto con Jira para la planificación y ejecución de pruebas, permitiendo una mejor integración en el ciclo de vida de desarrollo y asegurando que los casos de prueba estén bien documentados.

    [Acceder a la documentación de JIRA](https://nocountryjavareact.atlassian.net/jira/software/projects/NC/boards/3/backlog)


### API Testing:
- **Postman**: Postman como herramienta para probar y validar las APIs del sistema. Permitiendo verificar que las solicitudes y respuestas entre el cliente y servidor sean correctas.

  [Acceder a la documentación de Postman](https://warped-moon-241511.postman.co/workspace/2c4b5d90-18fa-4048-8438-b4fde27951d1/collection/38230746-cd1a717a-ebb0-4d13-b99d-ef634d0cbda6?tab=runs) (Previamente es necesario levantar el servidor)

- **Swagger**: Swagger ayuda a documentar las APIs y a validar su funcionamiento de manera visual. 

  [Acceder a la documentación de Swagger](https://choolmanager-production.up.railway.app/swagger-ui/index.html)

### Control de versiones:
- **Git Bash**: Git Bash, interfaz principal para interactuar con el repositorio Git desde la línea de comandos, permitiendo realizar commits, merges y gestionar el control de versiones de nuestro código fuente.
- **GitHub**: GitHub para alojar el repositorio y gestionar el código de manera colaborativa. Además, nos ayuda a realizar revisiones de código y asegurar la integración continua.

  [Acceder al repositorio de Github](https://github.com/No-Country-simulation/c20-09-ft-java-react)


### Entorno de desarrollo:
- **Visual Studio Code**: Utilizado para el desarrollo y corrección de código en la plataforma. Visual Studio Code ofrece diversas extensiones que facilitan la depuración y ejecución de pruebas unitarias.
- **IntelliJ IDEA Community**: Herramienta útil para los desarrolladores que trabajen con tecnologías como Java, permitiendo una mayor integración con las herramientas de desarrollo de backend.
- **MySQL Workbench**: Se utiliza MySQL Workbench para gestionar la base de datos, ejecutar consultas y verificar la integridad de los datos que se están utilizando en las pruebas.

### Documentación:
- **Google Drive**: Google Drive será el repositorio de documentos para almacenar toda la documentación relacionada con el plan de pruebas, resultados obtenidos y cualquier otro material que facilite la comunicación y el seguimiento del proyecto.

  [Acceder al documentación de las Pruebas de Testing en Google Drive](https://drive.google.com/drive/folders/1JFawUgZzQCommEs8ZYLS2qZdmqfSD10a?usp=sharing)


## Agradecimiento
#### Programa de Simulación Tech [No-Country](hhttps://www.linkedin.com/company/nocountrytalent/posts/?feedView=all)

## Autor
Este testeo fue realizado por [Karina Reguera](mailto:karinareguera@gmail.com)

Puedes conectar conmigo a través de:

[![GitHub](https://img.shields.io/badge/GitHub-KarinaReguera-blue)](https://github.com/KarinaReguera)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Karina_Reguera-blue)](https://www.linkedin.com/in/karina-reguera/)
