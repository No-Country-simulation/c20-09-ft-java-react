package com.school.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record AuthLoginRequest(
        @NotNull(message = "Email is required")
        @NotBlank(message = "Email must not be blank")
        @Email(message = "Please provide a valid email address")
        @Size(max = 255, message = "Email must not exceed 255 characters")
        String email,

        @NotNull(message = "Password is required")
        @NotBlank(message = "Password must not be blank")
        @Size(min = 8, message = "Password must be at least 5 characters long")
        String password) {
}