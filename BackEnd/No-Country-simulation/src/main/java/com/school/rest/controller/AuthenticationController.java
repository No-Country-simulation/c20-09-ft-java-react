package com.school.rest.controller;

import com.school.persistence.entities.RoleEntity;
import com.school.exception.ExpiredJwtException;
import com.school.exception.InvalidTokenException;
import com.school.rest.request.AuthLoginRequest;
import com.school.rest.request.AuthRegisterUserRequest;
import com.school.rest.request.RefreshTokenRequest;
import com.school.rest.response.AuthResponse;
import com.school.rest.response.LoginAuthResponse;
import com.school.service.implementation.ParentServiceImpl;
import com.school.service.implementation.StudentServiceImpl;
import com.school.service.implementation.TeacherServiceImpl;
import com.school.service.implementation.UserEntitylServiceImpl;
import com.school.service.interfaces.IProfileService;
import com.school.service.interfaces.IRoleService;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Set;

@RestController
@RequestMapping("/auth")
public class AuthenticationController {
    Logger logger = org.slf4j.LoggerFactory.getLogger(AuthenticationController.class);
    private final UserEntitylServiceImpl userDetailService;
    private final Map<String, IProfileService> profileServiceMap;
    private final IRoleService roleService;

    public AuthenticationController(UserEntitylServiceImpl userDetailService, StudentServiceImpl studentService, ParentServiceImpl parentService, TeacherServiceImpl teacherService, IRoleService roleService) {
        this.userDetailService = userDetailService;
        this.roleService = roleService;
        this.profileServiceMap = Map.of(
                "STUDENT", studentService,
                "PARENT", parentService,
                "TEACHER", teacherService
        );
    }

@PostMapping("/register")
public ResponseEntity<?> register(@RequestBody @Valid AuthRegisterUserRequest registerUserRequest) {
    logger.info("Registrando usuario con profileType: {}", registerUserRequest.profileType());
    String profileType = registerUserRequest.profileType().toUpperCase();
    logger.info("Tipo de perfil: {}", profileType);
    IProfileService profileService = profileServiceMap.get(profileType);
    logger.info("Servicio de perfil: {}", profileService);

    if (profileService == null) {
        return new ResponseEntity<>("Tipo de perfil no soportado", HttpStatus.BAD_REQUEST);
    }

    AuthResponse registeredUser = profileService.registerUser(registerUserRequest);
    return new ResponseEntity<>(registeredUser, HttpStatus.CREATED);
}

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody @Valid AuthLoginRequest userRequest) {
        LoginAuthResponse authResponse = userDetailService.loginUser(userRequest);
        return new ResponseEntity<>(authResponse, HttpStatus.OK);
    }

    @PostMapping("/refresh-token")
    public ResponseEntity<?> refreshToken(@RequestBody @Valid RefreshTokenRequest request) throws InvalidTokenException, ExpiredJwtException {
        LoginAuthResponse authResponse = userDetailService.refreshToken(request.refreshToken());
        return ResponseEntity.ok(authResponse);
    }

    @GetMapping("/roles")
    public ResponseEntity<Set<RoleEntity>> getAllRoles() {
        Set<RoleEntity> roles = roleService.getAllRoles();
        return ResponseEntity.ok(roles);
    }
}

