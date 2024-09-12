package com.school.service.interfaces;

import com.school.dto.CourseStudentRequest;
import com.school.dto.CourseStudentResponse;

import java.util.List;
import java.util.Optional;

public interface ICourseStudentService {
    Optional<CourseStudentResponse> createCourseStudent(CourseStudentRequest registro);
    List<CourseStudentResponse> getCoursesByStudent(Long studentId);
}
