package com.school.rest.controller;

import com.school.persistence.entities.Notification;
import com.school.persistence.entities.Student;
import com.school.persistence.repository.NotificationRepository;
import com.school.persistence.repository.StudentRepository;
import com.school.rest.response.StudentResponse;
import com.school.service.dto.NotificationDTO;
import com.school.service.implementation.ParentServiceImpl;
import com.school.service.interfaces.INotificationService;
import com.school.utility.NotificationMapper;
import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * NotificationController maneja las solicitudes relacionadas con el envío de notificaciones
 * a estudiantes, padres y cursos completos. Los métodos dentro de este controlador permiten
 * a los profesores enviar notificaciones a diferentes grupos destinatarios.
 */
@RestController
@RequestMapping("/notifications")
public class NotificationController {
    private final ParentServiceImpl parentService;

    // Inyecta el servicio de notificaciones que maneja la lógica de negocio.
    @Autowired
    private INotificationService notificationService;

    // Inyecta el mapper que convierte entre DTOs y entidades de Notification.
    @Autowired
    private NotificationMapper notificationMapper;

    // Inyecta el repositorio de notificaciones para acceder directamente a la base de datos si es necesario.
    @Autowired
    private NotificationRepository notificationRepository;

    // Inyecta el repositorio de estudiantes para acceder directamente a los datos de estudiantes.
    @Autowired
    private StudentRepository studentRepository;

    public NotificationController(ParentServiceImpl parentService) {
        this.parentService = parentService;
    }

    /**
     * Este método permite a los profesores enviar una notificación a todos los estudiantes y padres
     * de un curso específico. Se asegura que el usuario tenga el rol de profesor.
     *
     * @param notificationDTO contiene los detalles de la notificación (curso, mensaje, etc.).
     * @return ResponseEntity con un mensaje de éxito.
     */
    @Secured({"ROLE_TEACHER"})
    @PostMapping("/send/all")
    public ResponseEntity<String> sendToAll(@RequestBody NotificationDTO notificationDTO) {
        // Convierte el DTO a la entidad Notification.
        Notification notification = notificationMapper.dtoToNotification(notificationDTO);

        // Llama al servicio para enviar la notificación a todos los estudiantes y padres.
        notificationService.sendNotificationToAll(notificationDTO);
        return ResponseEntity.ok("Notificación enviada a todos los estudiantes y padres del curso.");
    }

    /**
     * Este método permite a los profesores enviar una notificación a un estudiante y su padre.
     * Se asegura que el usuario tenga el rol de profesor.
     *
     * @param notificationDTO contiene los detalles de la notificación (DNI del estudiante, mensaje, etc.).
     * @return ResponseEntity con un mensaje de éxito.
     */
    @Secured({"ROLE_TEACHER"})
    @PostMapping("/send/student")
    public ResponseEntity<String> sendToStudent(@Valid @RequestBody NotificationDTO notificationDTO) {
        // Convierte el DTO a la entidad Notification.
        Notification notification = notificationMapper.dtoToNotification(notificationDTO);

        // Llama al servicio para enviar la notificación a un estudiante y su padre.
        notificationService.sendNotificationToStudent(notification);
        return ResponseEntity.ok("Notificación enviada al estudiante.");
    }

    /**
     * Este método permite a los profesores enviar una notificación únicamente al padre de un estudiante.
     * Se asegura que el usuario tenga el rol de profesor.
     *
     * @param notificationDTO contiene los detalles de la notificación (DNI del estudiante, mensaje, etc.).
     * @return ResponseEntity con un mensaje de éxito.
     */
    @Secured({"ROLE_TEACHER"})
    @PostMapping("/send/parent")
    public ResponseEntity<String> sendToParent(@Valid @RequestBody NotificationDTO notificationDTO) {
        // Convierte el DTO a la entidad Notification.
        Notification notification = notificationMapper.dtoToNotification(notificationDTO);

        // Llama al servicio para enviar la notificación solo al padre del estudiante.
        notificationService.sendNotificationToParent(notificationDTO);
        return ResponseEntity.ok("Notificación enviada al padre del estudiante.");
    }

    /**
     * Este método maneja las solicitudes GET para obtener notificaciones dirigidas a todo un curso,
     * filtradas por año y turno. Si se proporciona el DNI de un estudiante, también se incluyen
     * las notificaciones específicas dirigidas a ese estudiante dentro del curso.
     *
     * @param year    El año del curso (obligatorio).
     * @param session El turno del curso (obligatorio, por ejemplo: mañana o tarde).
     * @param dni     (Opcional) El DNI del estudiante para incluir notificaciones dirigidas específicamente a él.
     * @return ResponseEntity con una lista de NotificationDTO que contienen las notificaciones del curso y del estudiante.
     */
    @Secured({"ROLE_STUDENT", "ROLE_PARENT"})
    @GetMapping("/course-notifications")
    public ResponseEntity<List<NotificationDTO>> getCourseNotifications(
            @RequestParam String year,
            @RequestParam String session,
            @RequestParam(required = false) String dni) {

        // Llama al repositorio para obtener las notificaciones filtradas
        List<Notification> notifications = notificationRepository.findCourseNotifications(year, session, dni);

        // Convierte las notificaciones a DTOs
        List<NotificationDTO> notificationDTOs = notifications.stream()
                .map(notificationMapper::notificationToDto)
                .collect(Collectors.toList());

        // Retorna la lista de notificaciones como respuesta
        return ResponseEntity.ok(notificationDTOs);
    }

    /**
     * Este método maneja las solicitudes GET para obtener las notificaciones específicas
     * de un estudiante basado en su DNI. Solo los estudiantes tienen acceso a este endpoint.
     *
     * @param dni El DNI del estudiante para el cual se desean obtener las notificaciones.
     * @return ResponseEntity con una lista de NotificationDTO que contienen las notificaciones
     *         dirigidas específicamente al estudiante con el DNI proporcionado.
     */
    @Secured({"ROLE_STUDENT"})
    @GetMapping("/student/{dni}")
    public ResponseEntity<List<NotificationDTO>> getNotificationsForStudent(@PathVariable String dni) {
        // Llama al repositorio para obtener las notificaciones dirigidas al estudiante con el DNI proporcionado
        List<Notification> notifications = notificationRepository.findByStudentDni(dni);

        // Convierte las notificaciones a DTOs para su uso en el frontend
        List<NotificationDTO> notificationDTOs = notifications.stream()
                .map(notificationMapper::notificationToDto)
                .collect(Collectors.toList());

        // Retorna la lista de notificaciones como respuesta en formato JSON
        return ResponseEntity.ok(notificationDTOs);
    }


    /**
     * Este método maneja las solicitudes GET para obtener todas las notificaciones relevantes para un padre
     * basado en su DNI. Solo los padres tienen acceso a este endpoint.
     *
     * @param dni El DNI del padre para el cual se desean obtener las notificaciones.
     * @return ResponseEntity con una lista de NotificationDTO que contienen las notificaciones
     *         específicas para el padre, así como las notificaciones del curso donde está matriculado
     *         su hijo, sin duplicados.
     *
     * La lógica del método es la siguiente:
     * 1. Recupera el estudiante asociado con el DNI del padre proporcionado.
     * 2. Obtiene las notificaciones dirigidas específicamente al padre.
     * 3. Obtiene las notificaciones relacionadas con el curso en el que está matriculado el hijo del padre.
     * 4. Combina ambas listas de notificaciones y elimina posibles duplicados.
     * 5. Convierte la lista combinada de notificaciones a DTOs para su uso en el frontend.
     */
    @Secured({"ROLE_PARENT"})
    @GetMapping("/parent/{dni}")
    public ResponseEntity<List<NotificationDTO>> getNotificationsForParent(@PathVariable String dni) {
        // Obtener al estudiante en función del DNI del padre
        Student student = studentRepository.findByParentDni(dni)
                .orElseThrow(() -> new EntityNotFoundException("Estudiante no encontrado para el padre con DNI: " + dni));

        // Obtener notificaciones específicas para el padre
        List<Notification> parentNotifications = notificationRepository.findByParentDni(dni);

        // Obtener notificaciones del curso donde está matriculado el hijo del padre
        List<Notification> studentCourseNotifications = notificationRepository.findCourseNotifications(
                student.getYear(),
                student.getSession(),
                student.getDni());

        // Combinar las listas y eliminar duplicados si es necesario
        List<Notification> allNotifications = new ArrayList<>();
        allNotifications.addAll(parentNotifications);
        allNotifications.addAll(studentCourseNotifications);

        // Convertir a DTOs
        List<NotificationDTO> notificationDTOs = allNotifications.stream()
                .map(notificationMapper::notificationToDto)
                .distinct()  // Elimina duplicados basados en los campos del NotificationDTO
                .collect(Collectors.toList());

        return ResponseEntity.ok(notificationDTOs);
    }

    @Secured({"ROLE_STUDENT", "ROLE_PARENT"})
    @PostMapping("/{id}/responses")
    public ResponseEntity<String> respondToNotification(@PathVariable Long id, @RequestParam String responseText) {

        notificationService.addResponse(id, responseText);

        return ResponseEntity.ok("Respuesta añadida a la notificación.");
    }

    @GetMapping("/verify/{dni}")
    public ResponseEntity<StudentResponse> getStudentAndParentByDni(@PathVariable String dni) {
        return ResponseEntity.ok(parentService.getStudentAndParentByDni(dni));
    }

}
