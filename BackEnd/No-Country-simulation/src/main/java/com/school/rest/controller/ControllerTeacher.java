package com.school.rest.controller;

import com.school.rest.response.StudentResponse;

import com.school.service.implementation.TeacherServiceImpl;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/teacher")
public class ControllerTeacher {

    private final TeacherServiceImpl teacherService;

    public ControllerTeacher(TeacherServiceImpl teacherService) {
        this.teacherService = teacherService;
    }

    @GetMapping("/verifyStudent/{dni}")
    public ResponseEntity<StudentResponse> verifyStudentByDni(@PathVariable String dni) {
        StudentResponse response = teacherService.verifyStudentByDni(dni);
        return ResponseEntity.ok(response);
    }
}
