package com.school.service.dto;

import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AdminRegistrationDto {

    @NotBlank(message = "Name cannot be null")
    @Size(min = 2, max = 50, message = "Name must be between 2 and 30 characters")
    private String name;

    @Pattern(regexp = "\\d{8}", message = "DNI must be exactly 8 digits")
    @NotBlank(message = "DNI cannot be null")
    private String dni;

    @Email(message = "Email should be valid")
    @NotBlank(message = "Email cannot be null")
    private String email;
}
