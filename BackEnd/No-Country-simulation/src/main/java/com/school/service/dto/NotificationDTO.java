package com.school.service.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

import java.time.LocalDateTime;

/**
 * NotificationDTO es un registro que encapsula los datos necesarios para enviar una notificación
 * a un estudiante, padre o grupo de curso. Este DTO es utilizado para recibir las solicitudes
 * desde el frontend y validarlas antes de ser procesadas.
 */
public record NotificationDTO(
        // El año del curso al que se envia la notificación (obligatorio).
        @NotBlank(message = "El campo 'year' es obligatorio.")
        String year,

        // El turno (por ejemplo, mañana, tarde) para el que aplica la notificación (obligatorio).
        @NotBlank(message = "El campo 'session' es obligatorio.")
        String session,

        // El mensaje de la notificación (obligatorio).
        @NotBlank(message = "El campo 'message' es obligatorio.")
        String message,

        // El grupo objetivo de la notificación (puede ser 'all', 'student' o 'parent', obligatorio).
        @NotBlank(message = "El campo 'targetGroup' es obligatorio.")
        String targetGroup,

        // El DNI del estudiante para identificarlo en la base de datos (obligatorio y debe ser un número de 8 dígitos).
        @NotBlank(message = "El DNI no puede estar vacío")
        @Pattern(regexp = "\\d{8}", message = "El DNI debe ser un número de 8 dígitos")
        String dni,

       LocalDateTime sentAt,

        String subject,

        String responseText,

        LocalDateTime responseTime) {
}
