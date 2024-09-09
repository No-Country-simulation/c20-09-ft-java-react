package com.school.persistence.repository;

import com.school.persistence.entities.Student;
import com.school.persistence.entities.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {
    Student findByUser(UserEntity userEntity);

    boolean existsByDni(String dni);

    Optional<Student> findByDni(String dni);
}