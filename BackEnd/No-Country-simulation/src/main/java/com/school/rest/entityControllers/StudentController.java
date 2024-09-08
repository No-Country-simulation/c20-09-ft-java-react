package com.school.rest.entityControllers;

import com.school.persistence.entities.Student;
import com.school.service.dto.StudentRegistrationDto;
import com.school.service.implementation.StudentServiceImpl;
import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/student")
public class StudentController {

    private final StudentServiceImpl studentService;

    public StudentController(StudentServiceImpl studentService) {
        this.studentService = studentService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> processStudentRegistration(@Valid @RequestBody StudentRegistrationDto studentRegistrationDto){

        try {
            // Call the service method to handle registration logic
            studentService.studentRegistration(studentRegistrationDto);

            // Return a CREATED status if the registration is successful
            return ResponseEntity.status(HttpStatus.CREATED).body("Student registered successfully");

        } catch (Exception e) {
            // Handle potential errors in service logic
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred during registration.");
        }
    }

    @GetMapping("/find{id}")
    public ResponseEntity<?> findStudentById(@PathVariable long id) {

        try {
            // Find student by ID using the service
            Optional<Student> optionalStudent = studentService.findStudentById(id);

            // If student is found, return it with OK status
            return ResponseEntity.ok(optionalStudent);

        } catch (EntityNotFoundException e) {
            // Handle case where student is not found
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Student not found with ID: " + id);
        } catch (Exception e) {
            // Handle other potential errors
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred while fetching the student.");
        }
    }

    @PutMapping("/update{id}")
    public ResponseEntity<?> updateStudent(@PathVariable Long id) {

        try {
            // Update student information
            Optional<Student> optionalStudent = studentService.updateStudentById(id);

            // Return updated student details
            return ResponseEntity.ok(optionalStudent);

        } catch (EntityNotFoundException e) {
            // Handle case where student is not found
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Student not found with ID: " + id);
        } catch (Exception e) {
            // Handle other potential errors
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred while updating the student.");
        }
    }

    @DeleteMapping("/delete{id}")
    public ResponseEntity<?> deleteStudent(@PathVariable Long id) {

        try {
            // Delete student by ID
            studentService.deleteStudent(id);

            // Return NO_CONTENT status to indicate successful deletion
            return ResponseEntity.noContent().build();

        } catch (EntityNotFoundException e) {
            // Handle case where student is not found
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Student not found with ID: " + id);
        } catch (Exception e) {
            // Handle other potential errors
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred while deleting the student.");
        }
    }

}
