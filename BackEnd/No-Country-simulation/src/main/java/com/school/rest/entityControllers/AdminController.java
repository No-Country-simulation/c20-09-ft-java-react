package com.school.rest.entityControllers;

import com.school.rest.response.AuthResponse;
import com.school.service.dto.AdminRegistrationDto;
import com.school.service.dto.TeacherRegistrationDto;
import com.school.service.implementation.AdminServiceImpl;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.parameters.RequestBody;
@RestController
@RequestMapping("/admin")
public class AdminController {

    private final AdminServiceImpl adminService;
    private static final Logger logger = LoggerFactory.getLogger(StudentController.class);

    public AdminController(AdminServiceImpl adminService) {
        this.adminService = adminService;
    }

    @PostMapping("/register")
    @Tag(name = "Entities registration", description = "Operations that deal with the registration/save of entities")
    @Operation(
            summary = "Register a new Admin",
            description = "Registers a new admin in the system by providing necessary details in the request body. " +
                    "Returns an authentication response if the registration is successful.",
            tags = {"Entities registration"},
            requestBody = @RequestBody(
                    description = "Admin details",
                    required = true,
                    content = @Content(schema = @Schema(implementation = TeacherRegistrationDto.class))
            ),
            responses = {
                    @ApiResponse(responseCode = "201", description = "Teacher registered successfully"),
                    @ApiResponse(responseCode = "400", description = "Invalid input data"),
                    @ApiResponse(responseCode = "500", description = "Internal server error")
            }
    )
    public ResponseEntity<?> processAdminRegistration(@Valid @RequestBody AdminRegistrationDto adminRegistrationDto){
        logger.info("Admin registration request received: {}", adminRegistrationDto.toString());
        // Llamar al método del servicio para manejar la lógica de registro
        AuthResponse registeredUser = adminService.create(adminRegistrationDto);

        // Devolver un estado CREATED si el registro es exitoso
        return new ResponseEntity<>(registeredUser, HttpStatus.CREATED);
    }
}
