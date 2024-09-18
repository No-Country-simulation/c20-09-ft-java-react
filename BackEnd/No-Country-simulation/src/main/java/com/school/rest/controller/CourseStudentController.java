package com.school.rest.controller;

import com.school.rest.request.CourseStudentRequest;
import com.school.service.dto.CourseStudentDto;
import com.school.service.implementation.CourseStudentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/v1/course-student")
@RequiredArgsConstructor
public class CourseStudentController {
    private final CourseStudentService courseStudentService;

    @PostMapping("/create")
    public ResponseEntity<?> createCourseStudent(@RequestBody CourseStudentRequest courseStudentRequest){
        Optional<CourseStudentDto> courseStudent  = courseStudentService.createCourseStudent(courseStudentRequest);
        if(courseStudent.isEmpty()){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error creating course student");
        }
        return ResponseEntity.ok(courseStudent);
    }

    @GetMapping("/{studentId}")
    public ResponseEntity<?> getCourseStudentByStudent(@PathVariable("studentId") Long studentId ){
        List<CourseStudentDto> courses = courseStudentService.getCourseStudentByStudent(studentId);
        if(courses.isEmpty()){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Incorrect student id");
        }
        return ResponseEntity.ok(courses);
    }
}
