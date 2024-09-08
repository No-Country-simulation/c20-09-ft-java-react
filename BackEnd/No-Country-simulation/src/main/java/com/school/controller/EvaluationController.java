package com.school.controller;

import com.school.dto.EvaluationDTO;
import com.school.entities.Evaluation;
import com.school.service.interfaces.IEvaluationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controlador REST que maneja las solicitudes relacionadas con las evaluaciones.
 * Se utiliza para recibir datos desde el cliente y procesarlos mediante la capa de servicio.
 */
@RestController
@RequestMapping("/evaluations") // Punto de entrada para las solicitudes relacionadas con evaluaciones
public class EvaluationController {

    @Autowired
    private IEvaluationService evaluationService;

    /**
     * Maneja las solicitudes POST para crear una nueva evaluación.
     * Convierte el EvaluationDTO en una entidad y la guarda en la base de datos.
     *
     * @param evaluationDTO Datos de la evaluación recibidos en formato JSON desde el cliente
     * @return Un ResponseEntity con la evaluación creada y el estado HTTP 201 (CREATED)
     */
    @PostMapping("/load")
    @Secured("ROLE_TEACHER")
    public ResponseEntity<Evaluation> loadEvaluation(@RequestBody EvaluationDTO evaluationDTO) {
        // Convertir DTO a Entidad
        Evaluation evaluation = new Evaluation(
                null, // El ID se genera automáticamente
                evaluationDTO.studentName(),
                evaluationDTO.studentLastname(),
                evaluationDTO.dniStudent(),
                evaluationDTO.year(),
                evaluationDTO.trimester(),
                evaluationDTO.subject(),
                evaluationDTO.feedback()
        );

        // Guardar la evaluación a través del servicio
        Evaluation newEvaluation = evaluationService.saveEvaluation(evaluation);
        // Devolver una respuesta HTTP 201 con la evaluación recién creada
        return new ResponseEntity<>(newEvaluation, HttpStatus.CREATED);
    }

    /**
     * Maneja las solicitudes GET para obtener evaluaciones por DNI.
     * Permite el acceso a estudiantes y padres.
     *
     * @param dni DNI del estudiante cuya evaluación se desea obtener.
     * @return Un ResponseEntity con una lista de evaluaciones y el estado HTTP 200 (OK)
     */
    @GetMapping("/student/{dni}")
    @Secured({"ROLE_STUDENT", "ROLE_PARENT"})
    public ResponseEntity<List<Evaluation>> getEvaluationsByDni(@PathVariable String dni) {
        List<Evaluation> evaluations = evaluationService.getEvaluationsByDni(dni);
        return new ResponseEntity<>(evaluations, HttpStatus.OK);
    }
}
