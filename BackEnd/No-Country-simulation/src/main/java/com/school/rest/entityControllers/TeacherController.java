package com.school.rest.entityControllers;

import com.school.persistence.entities.Teacher;
import com.school.service.dto.TeacherRegistrationDto;
import com.school.service.implementation.TeacherServiceImpl;
import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/teacher")
public class TeacherController {

    private final TeacherServiceImpl teacherService;

    public TeacherController(TeacherServiceImpl teacherService) {
        this.teacherService = teacherService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> processTeacherRegistration(@Valid @RequestBody TeacherRegistrationDto teacherRegistrationDto){

        try {
            // Call the service method to handle registration logic
            teacherService.teacherRegistration(teacherRegistrationDto);

            // Return a CREATED status if the registration is successful
            return ResponseEntity.status(HttpStatus.CREATED).body("Teacher registered successfully");

        } catch (Exception e) {
            // Handle potential errors in service logic
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred during registration.");
        }
    }

    @GetMapping("/find{id}")
    public ResponseEntity<?> findTeacherById(@PathVariable long id) {

        try {
            // Find teacher by ID using the service
            Optional<Teacher> optionalTeacher = teacherService.findTeacherById(id);

            // If teacher is found, return it with OK status
            return ResponseEntity.ok(optionalTeacher);

        } catch (EntityNotFoundException e) {
            // Handle case where teacher is not found
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Teacher not found with ID: " + id);
        } catch (Exception e) {
            // Handle other potential errors
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred while fetching the teacher.");
        }
    }

    @PutMapping("/update{id}")
    public ResponseEntity<?> updateStudent(@PathVariable Long id) {

        try {
            // Update teacher information
            Optional<Teacher> optionalStudent = teacherService.updateTeacherById(id);

            // Return updated teacher details
            return ResponseEntity.ok(optionalStudent);

        } catch (EntityNotFoundException e) {
            // Handle case where teacher is not found
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Teacher not found with ID: " + id);
        } catch (Exception e) {
            // Handle other potential errors
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred while updating the teacher.");
        }
    }

    @DeleteMapping("/delete{id}")
    public ResponseEntity<?> deleteTeacher(@PathVariable Long id) {

        try {
            // Delete teacher by ID
            teacherService.deleteTeacher(id);

            // Return NO_CONTENT status to indicate successful deletion
            return ResponseEntity.noContent().build();

        } catch (EntityNotFoundException e) {
            // Handle case where teacher is not found
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Teacher not found with ID: " + id);
        } catch (Exception e) {
            // Handle other potential errors
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred while deleting the teacher.");
        }
    }
}
