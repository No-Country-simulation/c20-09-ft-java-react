package com.school.persistence.repository;

import com.school.persistence.entities.CourseStudent;
import com.school.persistence.entities.Student;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CourseStudentRepository extends JpaRepository<CourseStudent, Long> {
    List<CourseStudent> findByStudent(Student student);
}
