package com.school.service.implementation;

import com.school.persistence.entities.CourseStudent;
import com.school.persistence.repository.CourseRepository;
import com.school.persistence.repository.CourseStudentRepository;
import com.school.persistence.repository.StudentRepository;
import com.school.rest.request.CourseStudentRequest;
import com.school.service.dto.CourseStudentDto;
import com.school.service.interfaces.ICourseStudentService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CourseStudentService implements ICourseStudentService {

    private final CourseStudentRepository courseStudentRepository;
    private final StudentRepository studentRepository;
    private final CourseRepository courseRepository;

    @Override
    public Optional<CourseStudentDto> createCourseStudent(CourseStudentRequest registro) {

        return courseRepository.findById(registro.getCourseId()).
                flatMap(course -> studentRepository.findById(registro.getStudentId())
                        .map(student -> {
                            CourseStudent courseStudentBd = new CourseStudent();
                            courseStudentBd.setStudent(student);
                            courseStudentBd.setCourse(course);
                            courseStudentBd.setNota(registro.getNota());
                            courseStudentBd.setComments(registro.getComments());
                            courseStudentBd.setFecha(getTimestamp());
                            return courseStudentToDto(courseStudentRepository.save(courseStudentBd));
                        })
                );
    }


    @Override
    public List<CourseStudentDto> getCourseStudentByStudent(Long studentId) {
        return studentRepository.findById(studentId)
                .map(student -> courseStudentRepository.findByStudent(student)
                        .stream()
                        .map(courseStudent -> courseStudentToDto(courseStudent))
                        .collect(Collectors.toList())
        ).orElse(Collections.emptyList());
    }

    private CourseStudentDto courseStudentToDto(CourseStudent courseStudent){
        CourseStudentDto courseStudentDto = new CourseStudentDto();
        courseStudentDto.setCourseId(courseStudent.getCourse().getId());
        courseStudentDto.setStudentId(courseStudent.getStudent().getId());
        courseStudentDto.setNota(courseStudent.getNota());
        courseStudentDto.setComments(courseStudent.getComments());
        courseStudentDto.setFecha(courseStudent.getFecha());
        return courseStudentDto;
    }

    private Timestamp getTimestamp(){
        long currentTime = System.currentTimeMillis();
        return new Timestamp(currentTime);
    }
}
