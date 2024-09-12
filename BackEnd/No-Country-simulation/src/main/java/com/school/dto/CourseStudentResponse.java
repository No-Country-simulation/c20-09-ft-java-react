package com.school.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CourseStudentResponse {
    private Long id;
    private Long courseId;
    private Long studentId;
    private double nota;
}
