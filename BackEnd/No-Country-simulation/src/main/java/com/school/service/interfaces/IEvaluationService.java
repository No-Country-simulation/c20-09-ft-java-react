package com.school.service.interfaces;

import com.school.persistence.entities.Evaluation;
import java.util.List;

public interface IEvaluationService {

    /**
     * Método para guardar una evaluación en el sistema.
     *
     * @param evaluation Objeto Evaluation que contiene la información de la evaluación a guardar.
     * @return La evaluación guardada con su respectivo ID generado.
     */
    Evaluation saveEvaluation(Evaluation evaluation);   // Método para guardar evaluación
    List<Evaluation> getEvaluationsByDni(String dni);   // Método para obtener evaluación por DNI
}
