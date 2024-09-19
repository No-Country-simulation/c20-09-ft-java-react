package com.school.rest.controller;

import com.school.exception.ExpiredJwtException;
import com.school.exception.InvalidTokenException;
import com.school.rest.request.AuthLoginRequest;
import com.school.rest.request.RefreshTokenRequest;
import com.school.rest.response.LoginAuthResponse;
import com.school.service.implementation.UserEntityServiceImpl;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthenticationController {
    Logger logger = org.slf4j.LoggerFactory.getLogger(AuthenticationController.class);
    private final UserEntityServiceImpl userDetailService;

    public AuthenticationController(UserEntityServiceImpl userDetailService) {
        this.userDetailService = userDetailService;
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