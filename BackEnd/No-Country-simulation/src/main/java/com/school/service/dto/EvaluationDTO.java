package com.school.service.dto;

import jakarta.validation.constraints.NotBlank;

/**
 * Record que representa el DTO (Data Transfer Object) de Evaluación.
 * Este DTO se utiliza para transferir datos relacionados con una evaluación entre las capas de la aplicación.
 * Se asegura de que los campos esenciales no estén vacíos gracias a las validaciones con @NotBlank.
 *
 * Los campos del record son:
 * - studentName: Nombre del estudiante.
 * - studentLastname: Apellido del estudiante.
 * - dniStudent: Documento de identidad del estudiante.
 * - year: Año académico de la evaluación.
 * - trimester: Trimestre de la evaluación.
 * - subject: Materia evaluada.
 * - feedback: Comentarios sobre el desempeño del estudiante.
 */
public record EvaluationDTO(
        @NotBlank String studentName,
        @NotBlank String studentLastname,
        @NotBlank String dniStudent,
        @NotBlank String year,
        @NotBlank String trimester,
        @NotBlank String subject,
        @NotBlank String feedback){
}
