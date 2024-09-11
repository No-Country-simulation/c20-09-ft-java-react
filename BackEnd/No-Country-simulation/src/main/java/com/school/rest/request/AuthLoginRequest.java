package com.school.rest.request;

import jakarta.validation.constraints.*;

public record AuthLoginRequest(
        @NotNull(message = "Email is required")
        @NotBlank(message = "Email must not be blank")
        @Email(message = "Please provide a valid email address")
        @Size(max = 100, message = "Email must not exceed 100 characters")
        String email,

        @NotBlank(message = "Password must not be blank")
        @Size(min = 11, max = 12, message = "Password must be between 11 and 12 characters")
        @Pattern(regexp = ".*[A-Z].*", message = "Password must contain at least one uppercase letter")
        @Pattern(regexp = ".*[a-z].*", message = "Password must contain at least one lowercase letter")
        @Pattern(regexp = ".*[!@#$%&*_].*", message = "Password must contain at least one special character from !@#$%&*_")
        String password) {
}