package com.school.repository;

import com.school.entities.CourseStudent;
import com.school.entities.Student;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CourseStudentRepository extends JpaRepository<CourseStudent, Long> {
    List<CourseStudent> findByStudent(Student student);
}
