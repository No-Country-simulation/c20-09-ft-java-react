package com.school.rest.entityControllers;

import com.school.rest.response.*;
import com.school.service.dto.TeacherDto;
import com.school.service.dto.TeacherRegistrationDto;
import com.school.service.dto.UpdateTeacherDto;
import com.school.service.implementation.TeacherServiceImpl;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
                    @ApiResponse(
                            responseCode = "400", description = "Invalid input data",
                            content = @Content(
                                    schema = @Schema(implementation = ApiError.class)
                            )
                    ),
                    @ApiResponse(
                            responseCode = "500", description = "Internal server error",
                            content = @Content(
                                    schema = @Schema(implementation = ApiError.class)
                            )
                    )
            }
    )
    public ResponseEntity<AuthResponse> processTeacherRegistration(@Valid @RequestBody TeacherRegistrationDto teacherRegistrationDto) {
        return new ResponseEntity<>(teacherService.create(teacherRegistrationDto), HttpStatus.CREATED);
    }

    @GetMapping("/find/{id}")
    @Operation(
            summary = "Find a Teacher by ID",
            description = "Retrieves the details of a teacher by their ID.",
            responses = {
                    @ApiResponse(
                            responseCode = "200", description = "Teacher found",
                            content = @Content(
                                    schema = @Schema(implementation = TeacherDto.class)
                            )
                    ),
                    @ApiResponse(
                            responseCode = "404", description = "Teacher not found",
                            content = @Content(
                                    schema = @Schema(implementation = ApiError.class)
                            )
                    )
            }
    )
    public ResponseEntity<TeacherDto> findTeacherById(@PathVariable Long id) {
        return new ResponseEntity<>(teacherService.findById(id), HttpStatus.OK);
    }

    @GetMapping("/findAll/withoutPagination")
    @Operation(
            summary = "Find all Teachers without Pagination",
            description = "Retrieves a list of all teachers without pagination.",
            responses = {
                    @ApiResponse(
                            responseCode = "200", description = "List of teachers",
                            content = @Content(
                                    schema = @Schema(type = "array", implementation = TeacherDto.class)
                            )
                    )
            }
    )
    public ResponseEntity<List<TeacherDto>> findAllTeachersWithoutPagination() {
        List<TeacherDto> teachers = teacherService.findAll(); // Método en el servicio que devuelve una lista sin paginación
        return ResponseEntity.ok(teachers);
    }

    @GetMapping("/findByLastName")
    @Operation(
            summary = "Find Teachers by Last Name with Pagination",
            description = "Retrieves a paginated list of teachers filtered by last name.",
            responses = {
                    @ApiResponse(
                            responseCode = "200", description = "Paginated list of teachers by last name",
                            content = @Content(
                                    schema = @Schema(implementation = Page.class)
                            )
                    )
            }
    )
    public ResponseEntity<Page<TeacherDto>> findTeachersByLastName(@RequestParam String lastName, @RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size) {
        Page<TeacherDto> teachers = teacherService.findTeachersByLastName(lastName, page, size); // Método en el servicio que filtra por apellido y devuelve una página de profesores
        return ResponseEntity.ok(teachers);
    }

    @GetMapping("/findAll")
    @Operation(
            summary = "Find all Teachers with Pagination",
            description = "Retrieves a paginated list of all teachers.",
            responses = {
                    @ApiResponse(
                            responseCode = "200", description = "Paginated list of teachers",
                            content = @Content(
                                    schema = @Schema(implementation = Page.class)
                            )
                    )
            }
    )
    public ResponseEntity<Page<TeacherDto>> findAllTeachersPaginated(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size) {
        Page<TeacherDto> teachers = teacherService.findAllTeachers(page, size); // Método en el servicio que devuelve una página de profesores
        return ResponseEntity.ok(teachers);
    }

    @PutMapping("/update/{id}")
    @Operation(
            summary = "Update Teacher Details",
            description = "Updates the details of a teacher by their ID.",
            requestBody = @io.swagger.v3.oas.annotations.parameters.RequestBody(
                    description = "Teacher details to update",
                    required = true,
                    content = @Content(schema = @Schema(implementation = UpdateTeacherDto.class))
            ),
            responses = {
                    @ApiResponse(
                            responseCode = "200", description = "Teacher updated successfully",
                            content = @Content(
                                    schema = @Schema(implementation = UpdateResponse.class)
                            )
                    ),
                    @ApiResponse(
                            responseCode = "404", description = "Teacher not found",
                            content = @Content(
                                    mediaType = "application/json",
                                    schema = @Schema(implementation = ApiError.class)
                            )
                    )
            }
    )
    public ResponseEntity<UpdateResponse<TeacherDto>> updateTeacher(@PathVariable Long id, @Valid @RequestBody UpdateTeacherDto updateTeacherDto) {
        return ResponseEntity.ok(teacherService.update(id, updateTeacherDto));
    }

    @DeleteMapping("/delete/{id}")
    @Operation(
            summary = "Delete a Teacher by ID",
            description = "Deletes a teacher by their ID.",
            responses = {
                    @ApiResponse(
                            responseCode = "200", description = "Teacher deleted successfully",
                            content = @Content(
                                    schema = @Schema(implementation = DeleteResponse.class)
                            )
                    ),
                    @ApiResponse(
                            responseCode = "404", description = "Teacher not found",
                            content = @Content(
                                    schema = @Schema(implementation = ApiError.class)
                            )
                    )
            }
    )
    public ResponseEntity<DeleteResponse> deleteTeacher(@PathVariable Long id) {
        return ResponseEntity.ok(teacherService.delete(id));
    }

    @GetMapping("/verify/{dni}")
    @Operation(
            summary = "Verify Student by DNI",
            description = "Verifies the existence of a Student by their DNI.",
            responses = {
                    @ApiResponse(
                            responseCode = "200", description = "Student verification result",
                            content = @Content(
                                    schema = @Schema(implementation = StudentResponse.class)
                            )
                    ),
                    @ApiResponse(
                            responseCode = "404", description = "Student not found",
                            content = @Content(
                                    schema = @Schema(implementation = ApiError.class)
                            )
                    )
            }
    )
    public ResponseEntity<StudentResponse> verifyStudentByDni(@PathVariable String dni) {
        return ResponseEntity.ok(teacherService.verifyStudentByDni(dni));
    }
}
