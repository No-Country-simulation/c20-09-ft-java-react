package com.school.service.implementation;

import com.school.exception.EvaluationNotFoundException;
import com.school.persistence.entities.Evaluation;
import com.school.persistence.repository.EvaluationRepository;
import com.school.service.interfaces.IEvaluationService;
import com.school.utility.EvaluationMapper;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Implementación de los servicios relacionados con las evaluaciones.
 * Esta clase provee la lógica necesaria para guardar evaluaciones y trabaja
 * con el repositorio para interactuar con la base de datos.
 */

@Service
public class EvaluationServiceImpl implements IEvaluationService {

    private final EvaluationRepository evaluationRepository;
    private final EvaluationMapper evaluationMapper;

    public EvaluationServiceImpl(EvaluationRepository evaluationRepository, EvaluationMapper evaluationMapper) {
        this.evaluationRepository = evaluationRepository;
        this.evaluationMapper = evaluationMapper;
    }

    /**
     * Implementación del método para guardar una evaluación.
     * Este método guarda una evaluación en la base de datos utilizando el repositorio de JPA.
     *
     * @param evaluation Objeto Evaluation que contiene la información de la evaluación a guardar.
     * @return La evaluación guardada con su respectivo ID generado.
     */
    @Override
    public Evaluation saveEvaluation(Evaluation evaluation) {
        // Guardar la evaluación en la base de datos
        return evaluationRepository.save(evaluation);
    }

    /**
     * Obtiene una evaluación específica identificada por su DNI.
     * Este método busca una evaluación en la base de datos utilizando el DNI proporcionado.
     * Si la evaluación con el DNI especificado existe, se retorna el objeto Evaluation correspondiente.
     * Si no se encuentra ninguna evaluación, se lanza una excepción RuntimeException con un mensaje
     * indicando que la evaluación no fue encontrada.
     *
     * @param dniStudent El DNI de la evaluación que se desea recuperar. Debe ser un valor no nulo.
     * @return El objeto Evaluation asociado al DNI proporcionado, si existe en la base de datos.
     * @throws RuntimeException Si no se encuentra ninguna evaluación con el DNI especificado.
     */

    @Override
    public List<Evaluation> getEvaluationsByDni(String dniStudent) {
        // Busca evaluaciones en la base de datos utilizando el DNI del estudiante
        List<Evaluation> evaluations = evaluationRepository.findByDniStudent(dniStudent);
        // Lanza una excepción si no se encuentran evaluaciones para el DNI proporcionado
        if (evaluations.isEmpty()) {
            throw new EvaluationNotFoundException("No se encontraron evaluaciones para el DNI: " +
                    dniStudent + ". Por cualquier consulta o reclamo, por favor diríjase a la Dirección del Establecimiento.");
        }
        // Devuelve la lista de evaluaciones encontradas
        return evaluations;
    }
}
