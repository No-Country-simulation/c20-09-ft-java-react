package com.school.rest.controller;

import com.school.persistence.entities.Course;
import com.school.rest.request.CourseRequest;
import com.school.service.dto.CourseDto;
import com.school.service.interfaces.ICourseService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("api/v1/course")
@RequiredArgsConstructor
public class CourseController {
    private final ICourseService courseService;

    @PostMapping("/create")
    public ResponseEntity<?> createCourse(@RequestBody CourseRequest courseRequest){
        Optional<CourseDto> course = courseService.createCourse(courseRequest);
        if(course.isEmpty()){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("error creating course");
        }
        return ResponseEntity.ok(course);
    }
}
