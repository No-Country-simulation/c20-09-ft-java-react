package com.school.service.implementation;

import com.school.persistence.entities.Notification;
import com.school.persistence.entities.Parent;
import com.school.persistence.entities.Student;
import com.school.persistence.repository.NotificationRepository;
import com.school.persistence.repository.StudentRepository;
import com.school.service.dto.NotificationDTO;
import com.school.service.interfaces.INotificationService;
import com.school.utility.NotificationMapper;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Service
public class NotificationServiceImpl implements INotificationService {
    @Autowired
    private NotificationRepository notificationRepository;

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private NotificationMapper notificationMapper;

    /**
     * Envía una notificación a todos los estudiantes y padres de un curso.
     * <p>
     * Convierte el objeto {@code NotificationDTO} en una entidad {@code Notification}.
     * Verifica que el año y el turno estén presentes y establece el grupo objetivo
     * como "course". Finalmente, guarda la notificación en la base de datos.
     *
     * @param notificationDTO El DTO que contiene los detalles de la notificación.
     * @throws IllegalArgumentException Si el año o el turno no están especificados.
     */
    @Override
    public void sendNotificationToAll(NotificationDTO notificationDTO) {
        /// Convierte NotificationDTO a Notification
        Notification notification = notificationMapper.dtoToNotification(notificationDTO);

        // Asegúrate de que year y session se asignen correctamente
        validateNotificationData(notification.getDni(), notification.getYear(), notification.getSession(), notification.getTargetGroup());

        notification.setTargetGroup("course"); // Se establece el grupo objetivo como "course"

        // Guarda la notificación en la base de datos
        notificationRepository.save(notification);
    }

    /**
     * Envía una notificación a un estudiante específico y su padre.
     * <p>
     * Verifica el DNI del estudiante, busca al estudiante y su padre en la base de datos,
     * y asigna estos a la notificación. Finalmente, guarda la notificación en la base de datos.
     *
     * @param notification La notificación que se va a enviar.
     * @throws IllegalArgumentException Si el DNI del estudiante es inválido.
     * @throws EntityNotFoundException  Si el estudiante o el padre no son encontrados.
     */
    @Override
    public void sendNotificationToStudent(Notification notification) {
        // Valida el DNI y otros campos
        validateNotificationData(notification.getDni(), notification.getYear(), notification.getSession(), "student");

        // Busca al estudiante y su padre en una sola consulta
        Student student = studentRepository.findByDniWithParent(notification.getDni())
                .orElseThrow(() -> new EntityNotFoundException("Estudiante o padre no encontrado"));

        // Usa un iterador para obtener el primer padre del conjunto
        Set<Parent> parents = student.getParents();
        if (parents.isEmpty()) {
            throw new EntityNotFoundException("No se encontraron padres para el estudiante.");
        }

        Parent parent = parents.iterator().next(); // Accede al primer padre
        notification.setStudent(student);
        notification.setParent(parent);
        notification.setTargetGroup("student");
        notification.setSentAt(LocalDateTime.now());

        // Guarda la notificación
        notificationRepository.save(notification);
    }

    /**
     * Envía una notificación a un padre específico basado en el DNI del estudiante.
     * <p>
     * Convierte el objeto {@code NotificationDTO} en una entidad {@code Notification}.
     * Verifica que el DNI, el año y el turno estén presentes. Luego, busca al estudiante
     * y al padre en la base de datos, asigna el padre a la notificación y establece el grupo
     * objetivo como "parent". Finalmente, guarda la notificación en la base de datos.
     *
     * @param notificationDTO El DTO que contiene los detalles de la notificación.
     * @throws IllegalArgumentException Si el DNI, el año o el turno están vacíos.
     * @throws EntityNotFoundException  Si el estudiante o el padre no son encontrados.
     */
    @Override
    public void sendNotificationToParent(NotificationDTO notificationDTO) {
        // Convierte NotificationDTO a Notification
        Notification notification = notificationMapper.dtoToNotification(notificationDTO);

        // Valida DNI, año y turno
        validateNotificationData(notification.getDni(), notification.getYear(), notification.getSession(), "parent");

        // Busca al estudiante y su padre en una sola consulta
        Student student = studentRepository.findByDniWithParent(notification.getDni())
                .orElseThrow(() -> new EntityNotFoundException("Estudiante o padre no encontrado"));

        // Usa un iterador para obtener el primer padre del conjunto
        Set<Parent> parents = student.getParents();
        if (parents.isEmpty()) {
            throw new EntityNotFoundException("No se encontraron padres para el estudiante.");
        }

        Parent parent = parents.iterator().next(); // Accede al primer padre
        notification.setParent(parent);
        notification.setTargetGroup("parent");
        notification.setSentAt(LocalDateTime.now());

        // Guarda la notificación
        notificationRepository.save(notification);
    }

    /**
     * Valida que el DNI, año y turno no estén vacíos o nulos.
     * Este método se puede utilizar tanto en el envío de notificaciones a estudiantes como a padres.
     *
     * @param dni     El DNI que se va a validar.
     * @param year    El año académico.
     * @param session El turno escolar.
     * @throws IllegalArgumentException Si alguno de los parámetros es inválido.
     */
    private void validateNotificationData(String dni, String year, String session, String targetGroup) {
        // Validar el año
        if (year == null || year.isBlank()) {
            throw new IllegalArgumentException("El año es obligatorio.");
        }

        // Verificar que el año esté en el formato correcto
        if (!year.matches("[1-5]")) {
            throw new IllegalArgumentException("El año debe estar en el formato '1º', '2º', '3º', '4º' o '5º'.");
        }

        // Validar el turno
        if (session == null || session.isBlank()) {
            throw new IllegalArgumentException("El turno es obligatorio.");
        }

        // Verificar que el turno sea "Mañana" o "Tarde", ignorando mayúsculas y minúsculas
        if (!session.equalsIgnoreCase("Mañana") && !session.equalsIgnoreCase("Tarde")) {
            throw new IllegalArgumentException("El turno debe ser 'Mañana' o 'Tarde'.");
        }

        // Solo validar el DNI si el grupo objetivo no es "course"
        if (!"course".equals(targetGroup)) {
            if (dni == null || dni.isBlank()) {
                throw new IllegalArgumentException("El DNI no puede estar vacío.");
            }

            // Verificar el formato del DNI (debe tener 8 dígitos)
            if (!dni.matches("\\d{8}")) {
                throw new IllegalArgumentException("El DNI debe tener 8 dígitos.");
            }
        }
    }

    @Transactional
    @Override
    public void addResponse(Long notificationId, String responseText) {
        // Busca la notificación por ID
        Notification notification = notificationRepository.findById(notificationId)
                .orElseThrow(() -> new EntityNotFoundException("Notificación no encontrada con ID: " + notificationId));

        // Asigna los valores de la respuesta
        notification.setResponseTime(LocalDateTime.now());
        notification.setResponseText(responseText);

        // Guarda la notificación actualizada en la base de datos
        notificationRepository.save(notification);
    }
}
