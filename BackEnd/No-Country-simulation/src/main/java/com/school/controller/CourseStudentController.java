package com.school.controller;

import com.school.dto.CourseStudentRequest;
import com.school.dto.CourseStudentResponse;
import com.school.entities.CourseStudent;
import com.school.service.interfaces.ICourseStudentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@RestController
@RequestMapping("api/v1/course-student")
public class CourseStudentController {
    private final ICourseStudentService courseStudentService;

    @PostMapping("/crear")
    public ResponseEntity<?> crearRegistro(@RequestBody CourseStudentRequest registro){
        Optional<CourseStudentResponse> newRegistro = courseStudentService.createCourseStudent(registro);
        if(newRegistro.isEmpty()){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Registro incorrecto");
        }
        return ResponseEntity.of(newRegistro);
    }

    @GetMapping("/{studentId}")
    public ResponseEntity<?> getCoursesByStudent(@PathVariable("studentId") Long studentId){
        List<CourseStudentResponse> courses = courseStudentService.getCoursesByStudent(studentId);
        if(courses == null){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Estudiante incorrecto");
        }
        return ResponseEntity.ok(courses);
    }
}
