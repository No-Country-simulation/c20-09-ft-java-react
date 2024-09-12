package com.school.dto;

import lombok.Getter;

@Getter
public class CourseStudentRequest {
    private Long courseId;
    private Long studentId;
    private double nota;
}
