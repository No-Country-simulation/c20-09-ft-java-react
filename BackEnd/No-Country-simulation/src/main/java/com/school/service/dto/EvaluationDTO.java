package com.school.service.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

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
        @NotBlank String dniStudent,

        @NotBlank
        @Pattern(regexp = "1º|2º|3º|4º|5º", message = "Year must be one of the following: 1º, 2º, 3º, 4º, 5º")
        String year,

        @NotBlank
        @Pattern(regexp = "primero|segundo|tercero", message = "Trimester must be one of the following: primero, segundo, tercero")
        String trimester,

        @NotBlank String subject,
        @NotBlank String feedback){
}
