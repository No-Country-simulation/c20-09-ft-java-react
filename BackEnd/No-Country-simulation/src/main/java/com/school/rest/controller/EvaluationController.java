package com.school.rest.controller;

import com.school.service.dto.EvaluationDTO;
import com.school.persistence.entities.Evaluation;
import com.school.service.interfaces.IEvaluationService;
import com.school.utility.EvaluationMapper;
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

    @Autowired
    private EvaluationMapper evaluationMapper;

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
        // Usar el mapper para convertir el DTO a entidad
        Evaluation evaluation = evaluationMapper.toEntity(evaluationDTO);
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
        // Obtiene la lista de evaluaciones filtrada por el DNI del estudiante.
        List<Evaluation> evaluations = evaluationService.getEvaluationsByDni(dni);
        // Retorna la lista de evaluaciones con el estado HTTP 200 (OK).
        return new ResponseEntity<>(evaluations, HttpStatus.OK);
    }
}
