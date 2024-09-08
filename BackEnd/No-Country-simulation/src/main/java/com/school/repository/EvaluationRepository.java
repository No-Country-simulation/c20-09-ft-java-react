package com.school.repository;

import com.school.entities.Evaluation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Interfaz del repositorio de evaluaciones que extiende JpaRepository.
 * Esta interfaz permite realizar operaciones de base de datos relacionadas con la entidad Evaluation,
 * como guardar, actualizar, eliminar y consultar evaluaciones.
 */
@Repository
public interface EvaluationRepository extends JpaRepository<Evaluation, Long> {
    List<Evaluation> findByDniStudent(String dniStudent);
}
