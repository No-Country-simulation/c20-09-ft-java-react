package com.school.service.dto;

import jakarta.persistence.Column;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;

@Data
@Builder
public class StudentDto {
    private Long id;
    private AddressDto address;
    private String session;
    private String name;
    private String lastName;
    private String dni;
    private String phoneNumber;
    private String year;
    private String email;
    private LocalDate dateOfBirth;
    private String emergencyNumber;
    private String emergencyContactName;
    private MedicalInformationDto medicalInformation;
}
