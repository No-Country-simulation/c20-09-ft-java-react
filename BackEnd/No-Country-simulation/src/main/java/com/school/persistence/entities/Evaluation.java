package com.school.persistence.entities;

import jakarta.persistence.*;
import lombok.*;

/**
 * Clase que representa la entidad "Evaluation", la cual se mapea a una tabla en la base de datos.
 * Esta entidad almacena información relacionada con las evaluaciones de los estudiantes.
 */
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Evaluation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // ID auto-generado que actúa como clave primaria

    @Column(name = "student_name")
    private String studentName;

    @Column(name = "student_lastname")
    private String studentLastname;

    @Column(name = "dni_student")
    private String dniStudent;

    private String year;
    private String trimester;
    private String subject;
    private String feedback;
}
