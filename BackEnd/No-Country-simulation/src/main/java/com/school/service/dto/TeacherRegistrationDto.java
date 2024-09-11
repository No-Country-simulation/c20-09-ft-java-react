package com.school.service.dto;

import com.school.persistence.entities.Address;
import com.school.persistence.entities.ProfessionalInformation;
import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class TeacherRegistrationDto {

    @NotBlank(message = "Name cannot be null")
    @Size(min = 2, max = 50, message = "Name must be between 2 and 30 characters")
    private String name;

    @NotBlank(message = "Last name cannot be null")
    @Size(min = 2, max = 50, message = "Last name must be between 2 and 30 characters")
    private String lastName;

    @Pattern(regexp = "\\d{8}", message = "DNI must be exactly 8 digits")
    @NotBlank(message = "DNI cannot be null")
    private String dni;

    @Pattern(regexp = "\\d{10}", message = "Phone number cannot have more than 10 digits")
    @NotBlank(message = "Phone number cannot be null")
    private String phoneNumber;

    @Email(message = "Email should be valid")
    @NotBlank(message = "Email cannot be null")
    private String email;

    private Address address;

    @Past(message = "Date of birth must be in the past")
    private LocalDate dateOfBirth;

    private String emergencyNumber;

    private String emergencyContactName;

    private ProfessionalInformation professionalInformation;
}
