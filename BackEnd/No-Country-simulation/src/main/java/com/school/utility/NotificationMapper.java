package com.school.utility;

import com.school.persistence.entities.Notification;
import com.school.service.dto.NotificationDTO;
import org.springframework.stereotype.Component;

@Component
public class NotificationMapper {
    /**
     * Convierte una entidad Notification en un objeto NotificationDTO.
     *
     * @param notification La entidad Notification que se desea convertir a DTO.
     * @return Un objeto NotificationDTO que representa los datos de la entidad Notification.
     *         Retorna null si la entidad Notification proporcionada es null.
     *
     * La conversión incluye los siguientes campos:
     * - year: El año del curso asociado a la notificación.
     * - session: El turno del curso asociado a la notificación.
     * - message: El mensaje de la notificación.
     * - targetGroup: El grupo objetivo de la notificación (e.g., 'student', 'parent', 'course').
     * - dni: El DNI del estudiante o del padre asociado con la notificación (o null si la notificación es para el curso).
     */
    public NotificationDTO notificationToDto(Notification notification) {
        if (notification == null) {
            return null;
        }
        return new NotificationDTO(
                notification.getYear(),
                notification.getSession(),
                notification.getMessage(),
                notification.getTargetGroup(),
                notification.getDni());
    }

    /**
     * Convierte un objeto NotificationDTO en una entidad Notification.
     *
     * @param notificationDTO El objeto NotificationDTO que se desea convertir en una entidad.
     * @return Una entidad Notification que representa los datos del NotificationDTO proporcionado.
     *         Retorna null si el NotificationDTO proporcionado es null.
     *
     * La conversión incluye los siguientes campos:
     * - year: El año del curso asociado a la notificación.
     * - session: El turno del curso asociado a la notificación.
     * - message: El mensaje de la notificación.
     * - targetGroup: El grupo objetivo de la notificación (e.g., 'student', 'parent', 'course').
     * - dni: El DNI del estudiante o del padre asociado con la notificación (o null si la notificación es para el curso).
     */
    public Notification dtoToNotification(NotificationDTO notificationDTO) {
        if (notificationDTO == null) {
            return null;
        }
        Notification notification = new Notification();
        notification.setYear(notificationDTO.year());
        notification.setSession(notificationDTO.session());
        notification.setMessage(notificationDTO.message());
        notification.setTargetGroup(notificationDTO.targetGroup());
        notification.setDni(notificationDTO.dni());
        return notification;
    }
}
