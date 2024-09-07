package com.school.service.dto;

import com.school.persistence.entities.Address;
import com.school.persistence.entities.MedicalInformation;
import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class TeacherRegistrationDto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message = "Name cannot be null")
    @Size(min = 2, max = 30, message = "Name must be between 2 and 30 characters")
    private String name;

    @NotNull(message = "Last name cannot be null")
    @Size(min = 2, max = 30, message = "Last name must be between 2 and 30 characters")
    @Column(name = "last_name")
    private String lastName;

    @Size(max = 8, message = "DNI number cannot be higher than 8 digits")
    @NotNull(message = "DNI cannot be null")
    private String dni;

    @Size(max = 11, message = "Phone number cannot have more than 11 digits")
    @NotNull(message = "Phone number cannot be null")
    private String phoneNumber;

    @Pattern(regexp = ".*@.*", message = "The field must contain '@'")
    @Email(message = "Email should be valid")
    @NotNull(message = "Email cannot be null")
    private String email;

    private Address address;

    @Past(message = "Date of birth must be in the past")
    private LocalDate dateOfBirth;

    private int emergencyNumber;

    private String emergencyContactName;

    private MedicalInformation medicalInformation;
}
