package com.school.rest.entityControllers;

import com.school.persistence.entities.Student;
import com.school.rest.request.ChildDniRequest;
import com.school.rest.response.AuthResponse;
import com.school.rest.response.Response;
import com.school.rest.response.StudentResponse;
import com.school.service.dto.StudentRegistrationDto;
import com.school.service.dto.UpdateStudentDto;
import com.school.service.implementation.StudentServiceImpl;
import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/admin/student")
@Secured("ROLE_ADMIN")
public class StudentController {

    private final StudentServiceImpl studentService;
    private static final Logger logger = LoggerFactory.getLogger(StudentController.class);
    public StudentController(StudentServiceImpl studentService) {
        this.studentService = studentService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> processStudentRegistration(@Valid @RequestBody StudentRegistrationDto studentRegistrationDto){
        logger.info("Student registration request received: {}", studentRegistrationDto.toString());
        // Llamar al método del servicio para manejar la lógica de registro
        AuthResponse registeredUser = studentService.create(studentRegistrationDto);

        // Devolver un estado CREATED si el registro es exitoso
        return new ResponseEntity<>(registeredUser, HttpStatus.CREATED);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Response<Student>> updateEntity(@PathVariable Long id, @Valid @RequestBody UpdateStudentDto updateStudentDto) {
        // Llamar al método del servicio para actualizar el estudiante
        Student updatedStudent = studentService.update(id, updateStudentDto);

        // Crear y devolver la respuesta con el mensaje de éxito y el objeto actualizado
        return ResponseEntity.ok(new Response<>("Student updated successfully", updatedStudent));
    }

    @GetMapping("/find{id}")
    public ResponseEntity<?> findStudentById(@PathVariable long id) {

        try {
            // Find student by ID using the service
            Optional<Student> optionalStudent = studentService.findById(id);

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

    @DeleteMapping("/delete{id}")
    public ResponseEntity<?> deleteStudent(@PathVariable Long id) {

        try {
            // Delete student by ID
            studentService.delete(id);

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

   @PostMapping("/verifyChild")
public ResponseEntity<StudentResponse> verifyChildByDni(@RequestBody @Valid ChildDniRequest childDniRequest) {
    // Llamar al servicio para verificar el hijo por DNI
    StudentResponse studentResponse = studentService.verifyChildByDni(childDniRequest.childDNI());

    return ResponseEntity.ok(studentResponse);
}
}
