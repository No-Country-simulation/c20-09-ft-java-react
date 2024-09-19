package com.school.persistence.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

/**
 * Esta clase representa una entidad Notification, que se almacena en la base de datos.
 * Cada notificación está asociada a un estudiante, padre, profesor, o a un curso en general.
 * Las notificaciones pueden ser enviadas a estudiantes, padres o a un curso completo.
 * También puede contener respuestas y un registro de cuándo fue enviada.
 */
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Notification {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Año al que está asociada la notificación (por ejemplo, "1º", "2º", etc.)
    private String year;

    // Turno asociado a la notificación (por ejemplo, "mañana", "tarde")
    private String session;

    // Define el grupo objetivo de la notificación: 'all' (todo el curso), 'student' (un estudiante), 'parent' (un padre)
    private String targetGroup;

    // Mensaje de la notificación, no puede estar en blanco
    @NotBlank
    private String message;

    // DNI del estudiante o padre asociado a la notificación, si aplica
    private String dni;

    // Relación con la entidad Student, si la notificación es específica para un estudiante
    @ManyToOne
    private Student student;

    // Relación con la entidad Parent, si la notificación es específica para un padre
    @ManyToOne
    private Parent parent;

    // Relación con la entidad Teacher que envía la notificación
    @ManyToOne
    private Teacher teacher;

    // Fecha y hora en que la notificación fue enviada
    private LocalDateTime sentAt;

    // Lista de respuestas a la notificación, si se han agregado
    //private List<String> responses;

    private String subject;

    private LocalDateTime responseTime;

    private String responseText;
}
