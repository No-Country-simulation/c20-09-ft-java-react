package com.school.rest.entityControllers;

import com.school.rest.response.AuthResponse;
import com.school.service.dto.AdminRegistrationDto;
import com.school.service.implementation.AdminServiceImpl;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/admin")
public class AdminController {

    private final AdminServiceImpl adminService;
    private static final Logger logger = LoggerFactory.getLogger(StudentController.class);

    public AdminController(AdminServiceImpl adminService) {
        this.adminService = adminService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> processAdminRegistration(@Valid @RequestBody AdminRegistrationDto adminRegistrationDto){
        logger.info("Admin registration request received: {}", adminRegistrationDto.toString());
        // Llamar al método del servicio para manejar la lógica de registro
        AuthResponse registeredUser = adminService.create(adminRegistrationDto);

        // Devolver un estado CREATED si el registro es exitoso
        return new ResponseEntity<>(registeredUser, HttpStatus.CREATED);
    }
}
