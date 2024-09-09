package com.school.persistence.repository;

import com.school.persistence.entities.Teacher;
import com.school.persistence.entities.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TeacherRepository extends JpaRepository<Teacher, Long> {
    boolean existsByDni(String dni);

    Teacher findByUser(UserEntity userEntity);
}