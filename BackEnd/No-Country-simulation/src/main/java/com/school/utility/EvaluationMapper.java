package com.school.utility;

import com.school.persistence.entities.Evaluation;
import com.school.service.dto.EvaluationDTO;
import org.springframework.stereotype.Component;

/**
 * Mapper para convertir EvaluationDTO a Evaluation y viceversa.
 */
@Component
public class EvaluationMapper {
    /**
     * Convierte un EvaluationDTO a una entidad Evaluation.
     *
     * @param evaluationDTO El DTO de evaluación.
     * @return La entidad Evaluation.
     */
    public Evaluation toEntity(EvaluationDTO evaluationDTO) {
        return new Evaluation(
                null, // El ID se genera automáticamente
                evaluationDTO.studentName(),
                evaluationDTO.studentLastname(),
                evaluationDTO.dniStudent(),
                evaluationDTO.year(),
                evaluationDTO.trimester(),
                evaluationDTO.subject(),
                evaluationDTO.feedback()
        );
    }
}
