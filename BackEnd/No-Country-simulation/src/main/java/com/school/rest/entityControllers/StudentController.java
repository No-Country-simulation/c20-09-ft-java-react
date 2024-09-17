package com.school.rest.entityControllers;

import com.school.persistence.entities.Student;
import com.school.rest.request.ChildDniRequest;
import com.school.rest.response.*;
import com.school.service.dto.*;
import com.school.service.implementation.StudentServiceImpl;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
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

    @Tag(name = "Entities registration", description = "Operations to register/save entities")
    @PostMapping("/register")
    @Operation(
            summary = "Register a new Student",
            description = "Registers a new student in the system by providing necessary details in the request body. " +
                    "Returns an authentication response if the registration is successful.",
            tags = {"Entities registration"},
            requestBody = @io.swagger.v3.oas.annotations.parameters.RequestBody(
                    description = "User details",
                    required = true,
                    content = @Content(schema = @Schema(implementation = StudentRegistrationDto.class))
            ),
            responses = {
                    @ApiResponse(
                            responseCode = "201", description = "Student registered successfully",
                            content = @Content(
                                    schema = @Schema(implementation = ApiError.class)
                            )
                    ),
                    @ApiResponse(responseCode = "400", description = "Invalid input data"),
                    @ApiResponse(responseCode = "500", description = "Internal server error")
            }
    )
    public ResponseEntity<?> processStudentRegistration(@Valid @RequestBody StudentRegistrationDto studentRegistrationDto){
        logger.info("Student registration request received: {}", studentRegistrationDto.toString());
        // Llamar al método del servicio para manejar la lógica de registro
        AuthResponse registeredUser = studentService.create(studentRegistrationDto);

        // Devolver un estado CREATED si el registro es exitoso
        return new ResponseEntity<>(registeredUser, HttpStatus.CREATED);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<UpdateResponse<StudentDto>> updateStudentDto(@PathVariable Long id, @Valid @RequestBody UpdateStudentDto updateStudentDto) {
        return ResponseEntity.ok(studentService.update(id, updateStudentDto));
    }

    @GetMapping("/find{id}")
    public ResponseEntity<StudentDto> findStudentDtoById(@PathVariable Long id) {
        return new ResponseEntity<>(studentService.findById(id), HttpStatus.OK);
    }

    @DeleteMapping("/delete{id}")
    public ResponseEntity<DeleteResponse> deleteStudent(@PathVariable Long id) {
        return ResponseEntity.ok(studentService.delete(id));
    }

    @Secured({"ROLE_TEACHER", "ROLE_ADMIN", "ROLE_PARENT", "ROLE_STUDENT"})
    @PostMapping("/verifyChild")
    public ResponseEntity<StudentResponse> verifyChildByDni(@RequestBody @Valid ChildDniRequest childDniRequest) {
        // Llamar al servicio para verificar el hijo por DNI
        StudentResponse studentResponse = studentService.verifyChildByDni(childDniRequest.childDNI());

        return ResponseEntity.ok(studentResponse);
    }
}
