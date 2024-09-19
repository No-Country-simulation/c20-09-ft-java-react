package com.school.rest.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CourseStudentRequest {
    private Long courseId;
    private Long studentId;
    private double nota;
    private String comments;
}
