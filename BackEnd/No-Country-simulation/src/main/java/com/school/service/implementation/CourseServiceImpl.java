package com.school.service.implementation;

import com.school.persistence.entities.Course;
import com.school.persistence.repository.CourseRepository;
import com.school.persistence.repository.SubjectRepository;
import com.school.persistence.repository.TeacherRepository;
import com.school.rest.request.CourseRequest;
import com.school.service.dto.CourseDto;
import com.school.service.interfaces.ICourseService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CourseServiceImpl implements ICourseService {

    private final CourseRepository courseRepository;
    private final TeacherRepository teacherRepository;
    private final SubjectRepository subjectRepository;

    @Override
    public Optional<CourseDto> createCourse(CourseRequest courseRequest) {

        return subjectRepository.findById(courseRequest.getSubjectId())
                .flatMap(
                    subject -> teacherRepository.findById(courseRequest.getTeacherId())
                    .map(teacher -> {
                        Course course = new Course();
                        course.setSubject(subject);
                        course.setTeacher(teacher);
                        return courseToDto(courseRepository.save(course));
                    })
                );
    }

    private CourseDto courseToDto(Course course){
        CourseDto courseDto = new CourseDto();
        courseDto.setId(course.getId());
        courseDto.setSubjectId(course.getSubject().getId());
        courseDto.setTeacherId(course.getTeacher().getId());
        return courseDto;
    }

}
