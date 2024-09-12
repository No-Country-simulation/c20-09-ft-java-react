package com.school.service.implementation;

import com.school.dto.CourseStudentRequest;
import com.school.dto.CourseStudentResponse;

import com.school.entities.CourseStudent;
import com.school.repository.CourseRepository;
import com.school.repository.CourseStudentRepository;
import com.school.repository.StudentRepository;
import com.school.service.interfaces.ICourseStudentService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CourseStudentImpl implements ICourseStudentService {

    private final StudentRepository studentRepository;
    private final CourseRepository courseRepository;
    private final CourseStudentRepository courseStudentRepository;



    @Override
    public Optional<CourseStudentResponse> createCourseStudent(CourseStudentRequest registro) {

        return studentRepository.findById(registro.getStudentId())
                .flatMap(student -> courseRepository.findById(registro.getCourseId())
                        .map(course -> {
                            CourseStudent newRegistro = new CourseStudent();
                            newRegistro.setStudent(student);
                            newRegistro.setCourse(course);
                            newRegistro.setNote(registro.getNota());
                            courseStudentRepository.save(newRegistro);

                            return courseStudentToResponse(newRegistro);
                        }));
    }

    @Override
    public List<CourseStudentResponse> getCoursesByStudent(Long studentId) {
        return studentRepository.findById(studentId)
                .map(courseStudentRepository::findByStudent)
                .map(this::courseStudentsToResponse)
                .orElse(Collections.emptyList());
    }

    private CourseStudentResponse courseStudentToResponse(CourseStudent courseStudent) {
        CourseStudentResponse response = new CourseStudentResponse();
        response.setId(courseStudent.getId());
        response.setCourseId(courseStudent.getCourse().getId());
        response.setStudentId(courseStudent.getStudent().getId());
        response.setNota(courseStudent.getNote());
        return response;
    }

    private List<CourseStudentResponse> courseStudentsToResponse(List<CourseStudent> courseStudentsDB) {
        return courseStudentsDB.stream()
                .map(this::courseStudentToResponse)
                .collect(Collectors.toList());
    }





}
