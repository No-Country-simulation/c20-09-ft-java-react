package com.school.persistence.repository;


import com.school.persistence.entities.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface NotificationRepository extends JpaRepository <Notification, Long> {
    // Busca todas las notificaciones enviadas a un estudiante específico usando su DNI
    List<Notification> findByStudentDni(String dni);

    // Busca todas las notificaciones enviadas a un padre específico usando el DNI del padre
    List<Notification> findByParentDni(String dni);

    // Busca las notificaciones enviadas a todo un curso en un año y turno específicos.
    // Incluye las notificaciones enviadas a un estudiante particular dentro de ese curso.
    // La condición '(targetGroup = 'course')' busca las notificaciones generales para el curso,
    // mientras que '(targetGroup = 'student' AND dni = :dni)' filtra las notificaciones individuales para el estudiante.
    @Query("SELECT n FROM Notification n WHERE n.year = :year AND n.session = :session AND (n.targetGroup = 'course' OR (n.targetGroup = 'student' AND n.dni = :dni))")
    List<Notification> findCourseNotifications(@Param("year") String year, @Param("session") String session, @Param("dni") String dni);

}