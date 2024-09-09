package com.school.service.dto;

import com.school.persistence.entities.Address;
import com.school.persistence.entities.MedicalInformation;
import com.school.persistence.entities.ProfessionalInformation;
import jakarta.validation.constraints.*;
import lombok.*;

import java.time.LocalDate;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class UpdateTeacherDto {

    @NotNull(message = "Name cannot be null")
    @Size(min = 2, max = 30, message = "Name must be between 2 and 30 characters")
    private String name;

    @NotNull(message = "Last name cannot be null")
    @Size(min = 2, max = 30, message = "Last name must be between 2 and 30 characters")
    private String lastName;

    @Size(max = 8, message = "DNI number cannot be higher than 8 digits")
    private String dni;

    @Size(max = 11, message = "Phone number cannot have more than 11 digits")
    private String phoneNumber;

    @Pattern(regexp = ".*@.*", message = "The field must contain '@'")
    @Email(message = "Email should be valid")
    private String email;

    private Address address;

    @Past(message = "Date of birth must be in the past")
    private LocalDate dateOfBirth;

    @Size(max = 15, message = "Emergency number cannot have more than 15 digits")
    private String emergencyNumber;

    @Size(max = 50, message = "Emergency contact name cannot exceed 50 characters")
    private String emergencyContactName;

    private MedicalInformation medicalInformation;
    private ProfessionalInformation profesionalInformation;
}

