package com.school.service.dto;

import com.school.persistence.entities.Address;
import com.school.persistence.entities.MedicalInformation;
import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class StudentRegistrationDto {

    @Size(min = 2, max = 50, message = "Name must be between 2 and 30 characters")
    private String name;

    @Size(min = 2, max = 50, message = "Last name must be between 2 and 30 characters")
    private String lastName;

    @Pattern(regexp = "\\d{8}", message = "DNI must be exactly 8 digits")
    @NotBlank(message = "DNI cannot be null")
    private String dni;

    @Pattern(regexp = "\\d{10}", message = "Phone number cannot have more than 10 digits")
    private String phoneNumber;

    @NotBlank(message = "Email cannot be null")
    @Email(message = "Invalid email format")
    private String email;

    private Address address;

    @Past(message = "Date of birth must be in the past")
    private LocalDate dateOfBirth;

    @Pattern(regexp = "\\d{10}", message = "Phone number cannot have more than 10 digits")
    private String emergencyNumber;

    private String emergencyContactName;

    private MedicalInformation medicalInformation;

    private String session;

    private String year;
}
