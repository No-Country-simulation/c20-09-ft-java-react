package com.school.service.interfaces;

import com.school.rest.request.CourseStudentRequest;
import com.school.service.dto.CourseStudentDto;

import java.util.List;
import java.util.Optional;

public interface ICourseStudentService {
    Optional<CourseStudentDto> createCourseStudent(CourseStudentRequest courseStudentRequest);
    List<CourseStudentDto> getCourseStudentByStudent(Long studentId);
}
