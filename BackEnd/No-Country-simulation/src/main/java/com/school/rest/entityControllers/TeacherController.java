package com.school.rest.entityControllers;

import com.school.persistence.entities.Teacher;
import com.school.rest.response.AuthResponse;
import com.school.rest.response.Response;
import com.school.service.dto.StudentRegistrationDto;
import com.school.service.dto.TeacherRegistrationDto;
import com.school.service.dto.UpdateTeacherDto;
import com.school.service.implementation.TeacherServiceImpl;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/admin/teacher")
@Secured("ROLE_ADMIN")
@Tag(name = "Entities registration", description = "Operations to register/save entities")
public class TeacherController {

    private final TeacherServiceImpl teacherService;

    public TeacherController(TeacherServiceImpl teacherService) {
        this.teacherService = teacherService;
    }

    @PostMapping("/register")
    @Operation(
            summary = "Register a new Teacher",
            description = "Registers a new teacher in the system by providing necessary details in the request body. " +
                    "Returns an authentication response if the registration is successful.",
            tags = {"Entities registration"},
            requestBody = @io.swagger.v3.oas.annotations.parameters.RequestBody(
                    description = "User details",
                    required = true,
                    content = @Content(schema = @Schema(implementation = TeacherRegistrationDto.class))
            ),
            responses = {
                    @ApiResponse(
                            responseCode = "201", description = "Teacher registered successfully",
                            content = @Content(
                                    schema = @Schema(implementation = AuthResponse.class)
                            )
                    ),
                    @ApiResponse(responseCode = "400", description = "Invalid input data"),
                    @ApiResponse(responseCode = "500", description = "Internal server error")
            }
    )
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
