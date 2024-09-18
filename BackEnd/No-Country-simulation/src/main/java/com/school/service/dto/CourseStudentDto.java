package com.school.service.dto;

import lombok.Getter;
import lombok.Setter;

import java.sql.Timestamp;

@Getter
@Setter
public class CourseStudentDto {
    private Long courseId;
    private Long studentId;
    private double nota;
    private String comments;
    private Timestamp fecha;
}
