package com.school.rest.entityControllers;

import com.school.persistence.entities.Teacher;
import com.school.rest.response.AuthResponse;
import com.school.rest.response.Response;
import com.school.service.dto.TeacherRegistrationDto;
import com.school.service.dto.UpdateTeacherDto;
import com.school.service.implementation.TeacherServiceImpl;
import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/admin/teacher")
public class TeacherController {

    private final TeacherServiceImpl teacherService;

    public TeacherController(TeacherServiceImpl teacherService) {
        this.teacherService = teacherService;
    }

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> processTeacherRegistration(@Valid @RequestBody TeacherRegistrationDto teacherRegistrationDto) {
        // Llamar al método del servicio para manejar la lógica de registro de profesores
        AuthResponse registeredUser = teacherService.create(teacherRegistrationDto);

        // Devolver un estado CREATED si el registro es exitoso con la respuesta de autenticación
        return new ResponseEntity<>(registeredUser, HttpStatus.CREATED);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Response<Teacher>> updateTeacher(@PathVariable Long id, @Valid @RequestBody UpdateTeacherDto updateTeacherDto) {
        // Llamar al método del servicio para actualizar el profesor
        Teacher updatedTeacher = teacherService.update(id, updateTeacherDto);

        // Crear y devolver la respuesta con el mensaje de éxito y el objeto actualizado
        return ResponseEntity.ok(new Response<>("Teacher updated successfully", updatedTeacher));
    }

    @GetMapping("/find{id}")
    public ResponseEntity<?> findTeacherById(@PathVariable long id) {

        try {
            // Find teacher by ID using the service
            Optional<Teacher> optionalTeacher = teacherService.findById(id);

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

    @DeleteMapping("/delete{id}")
    public ResponseEntity<?> deleteTeacher(@PathVariable Long id) {

        try {
            // Delete teacher by ID
            teacherService.delete(id);

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
