package com.school.service.implementation;

import com.school.entities.Evaluation;
import com.school.repository.EvaluationRepository;
import com.school.service.interfaces.IEvaluationService;
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

    public EvaluationServiceImpl(EvaluationRepository evaluationRepository) {
        this.evaluationRepository = evaluationRepository;
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
        // Llamada al repositorio para guardar la evaluación en la base de datos
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
        // Buscar evaluaciones por DNI del estudiante
        return evaluationRepository.findByDniStudent(dniStudent);
    }
}
