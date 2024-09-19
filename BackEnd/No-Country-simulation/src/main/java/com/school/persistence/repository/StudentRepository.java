package com.school.persistence.repository;

import com.school.persistence.entities.Student;
import com.school.persistence.entities.UserEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {
    Student findByUser(UserEntity userEntity);

    boolean existsByDni(String dni);

    Optional<Student> findByDni(String dni);

    // Busca un estudiante junto con su información de padres utilizando JOIN FETCH para evitar el problema de "N+1 queries".
    // Esto permite cargar la entidad "Student" y sus padres en una sola consulta en base al DNI del estudiante.
    @Query("SELECT s FROM Student s JOIN FETCH s.parents p WHERE s.dni = :dni")
    Optional<Student> findByDniWithParent(@Param("dni") String dni);

    // Busca un estudiante cuyo padre tenga el DNI proporcionado.
    // Realiza una búsqueda de estudiantes que estén asociados con un padre específico utilizando una relación JOIN entre "Student" y "Parent".
    @Query("SELECT s FROM Student s JOIN s.parents p WHERE p.dni = :dni")
    Optional<Student> findByParentDni(@Param("dni") String parentDni);


    Page<Student> findByLastName(String lastName, Pageable pageable);

    @Query("SELECT s.dni FROM Student s WHERE s.user.id = :userId")
    String findDniByUserId(@Param("userId") Long userId);
}