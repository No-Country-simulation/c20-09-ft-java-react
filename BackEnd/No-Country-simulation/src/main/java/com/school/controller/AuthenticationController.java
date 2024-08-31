package com.school.controller;

import com.school.dto.*;
import com.school.exception.ExpiredJwtException;
import com.school.exception.InvalidTokenException;
import com.school.service.implementation.ParentServiceImpl;
import com.school.service.implementation.StudentServiceImpl;
import com.school.service.implementation.TeacherServiceImpl;
import com.school.service.implementation.UserEntitylServiceImpl;
import com.school.service.interfaces.IProfileService;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/auth")
public class AuthenticationController {
    Logger logger = org.slf4j.LoggerFactory.getLogger(AuthenticationController.class);
    private final UserEntitylServiceImpl userDetailService;
    private final Map<String, IProfileService> profileServiceMap;

    public AuthenticationController(UserEntitylServiceImpl userDetailService, StudentServiceImpl studentService, ParentServiceImpl parentService, TeacherServiceImpl teacherService) {
        this.userDetailService = userDetailService;
        this.profileServiceMap = Map.of(
                "STUDENT", studentService,
                "PARENT", parentService,
                "TEACHER", teacherService
        );
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody AuthRegisterUserRequest registerUserRequest) {
        logger.info("Registering user with profileType: {}", registerUserRequest.profileType());
        String profileType = registerUserRequest.profileType().toUpperCase();
        logger.info("Profile type: {}", profileType);
        IProfileService profileService = profileServiceMap.get(profileType);
        logger.info("Profile service: {}", profileService);

        if (profileService == null) {
            return new ResponseEntity<>("Profile type not supported", HttpStatus.BAD_REQUEST);
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
}

