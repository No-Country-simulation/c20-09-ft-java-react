package com.school.service.interfaces;

import com.school.persistence.entities.Notification;
import com.school.service.dto.NotificationDTO;

/**
 * Interfaz para definir los métodos relacionados con el envío de notificaciones
 * dentro de la aplicación. Los métodos implementados permiten enviar notificaciones
 * a todos los estudiantes de un curso, a un estudiante específico, o a los padres
 * de un estudiante, según corresponda.
 */
public interface INotificationService {
    /**
     * Envía una notificación a todos los estudiantes y padres de un curso.
     *
     * @param notificationDTO El objeto DTO que contiene los detalles de la notificación.
     */
    void sendNotificationToAll(NotificationDTO notificationDTO);

    /**
     * Envía una notificación a un estudiante específico y a su padre.
     *
     * @param notification La entidad Notification que se va a enviar.
     */
    void sendNotificationToStudent(Notification notification);

    /**
     * Envía una notificación al padre de un estudiante específico.
     *
     * @param notificationDTO El objeto DTO que contiene los detalles de la notificación.
     */
    void sendNotificationToParent(NotificationDTO notificationDTO);

    void addResponse(Long notificationId, String responseText);
}
