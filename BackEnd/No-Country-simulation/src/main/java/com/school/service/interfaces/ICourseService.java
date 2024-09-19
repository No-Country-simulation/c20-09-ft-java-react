package com.school.service.interfaces;

import com.school.rest.request.CourseRequest;
import com.school.service.dto.CourseDto;

import java.util.Optional;

public interface ICourseService {
    Optional<CourseDto> createCourse(CourseRequest newCourse);
}
