package com.school.rest.controller;

import com.school.persistence.entities.Student;
import com.school.rest.request.DniRequest;
import com.school.rest.response.StudentResponse;
import com.school.service.dto.EvaluationDTO;
import com.school.persistence.entities.Evaluation;
import com.school.service.implementation.ParentServiceImpl;
import com.school.service.implementation.StudentServiceImpl;
import com.school.service.interfaces.IEvaluationService;
import com.school.utility.EvaluationMapper;
import jakarta.persistence.EntityNotFoundException;
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

    @Autowired
    private StudentServiceImpl studentService;

    private final ParentServiceImpl  parentService;

    public EvaluationController(ParentServiceImpl parentService) {
        this.parentService = parentService;
    }

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
        // Buscar el estudiante por DNI
        Student student = studentService.findStudentByDni(evaluationDTO.dniStudent())
                .orElseThrow(() -> new EntityNotFoundException("Student not found"));

        // Usar el mapper para convertir el DTO a entidad Evaluation, pasando el objeto Student
        Evaluation evaluation = evaluationMapper.toEntity(evaluationDTO, student);

        // Guardar la evaluación a través del servicio
        Evaluation newEvaluation = evaluationService.saveEvaluation(evaluation);

        // Devolver una respuesta HTTP 201 con la evaluación recién creada
        return new ResponseEntity<>(newEvaluation, HttpStatus.CREATED);
    }

    /**
     * Maneja las solicitudes POST para obtener evaluaciones por DNI.
     * Permite el acceso a estudiantes y padres.
     *
     * @param dniRequest Objeto que contiene el DNI del estudiante cuya evaluación se desea obtener.
     * @return Un ResponseEntity con una lista de evaluaciones y el estado HTTP 200 (OK)
     */
    @PostMapping("/student")
    @Secured({"ROLE_STUDENT", "ROLE_PARENT"})
    public ResponseEntity<List<Evaluation>> getEvaluationsByDni(@RequestBody DniRequest dniRequest) {
        // Obtiene el DNI desde el cuerpo de la solicitud.
        String dni = dniRequest.getDni();

        // Obtiene la lista de evaluaciones filtrada por el DNI del estudiante.
        List<Evaluation> evaluations = evaluationService.getEvaluationsByDni(dni);

        // Retorna la lista de evaluaciones con el estado HTTP 200 (OK).
        return new ResponseEntity<>(evaluations, HttpStatus.OK);
    }

    @Secured({"ROLE_PARENT"})
    @GetMapping("/students/parent/{dni}")
    public ResponseEntity<StudentResponse> verifyStudentByParentDni(@PathVariable String dni) {
        return ResponseEntity.ok(parentService.verifyStudentByParentDni(dni));
    }
}
