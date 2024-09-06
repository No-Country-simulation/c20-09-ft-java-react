package com.school.rest.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record PasswordResetRequest(
        @NotBlank(message = "Token must not be blank")
        String token,

        @NotBlank(message = "Password must not be blank")
        @Size(min = 11, max = 15, message = "Password must be between 11 and 15 characters")
        @Pattern(regexp = ".*[A-Z].*", message = "Password must contain at least one uppercase letter")
        @Pattern(regexp = ".*[a-z].*", message = "Password must contain at least one lowercase letter")
        @Pattern(regexp = ".*[!@#$%&*_].*", message = "Password must contain at least one special character from !@#$%&*_")
        String password
) {
}
