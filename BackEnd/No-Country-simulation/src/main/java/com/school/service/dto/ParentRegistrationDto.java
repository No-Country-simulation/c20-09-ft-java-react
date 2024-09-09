package com.school.service.dto;

import com.school.persistence.entities.Address;
import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
public class ParentRegistrationDto {

    @NotNull(message = "Name cannot be null")
    @Size(min = 2, max = 50, message = "Name must be between 2 and 30 characters")
    private String name;

    @NotNull(message = "Last name cannot be null")
    @Size(min = 2, max = 50, message = "Last name must be between 2 and 30 characters")
    private String lastName;

    @Size(max = 8, message = "DNI number cannot be higher than 8 digits")
    @NotNull(message = "DNI cannot be null")
    private String dni;

    @Size(max = 11, message = "Phone number cannot have more than 11 digits")
    @NotNull(message = "Phone number cannot be null")
    private String phoneNumber;

    @Email(message = "Email should be valid")
    @NotNull(message = "Email cannot be null")
    private String email;

    private Address address;

    @Past(message = "Date of birth must be in the past")
    private LocalDate dateOfBirth;

    @NotNull(message = "Occupation cannot be null")
    private String occupation;

    @NotNull(message = "Relationship with the child cannot be null")
    private String relationshipToChild;

    private String emergencyContactName;

    @NotNull(message = "Emergency phone number cannot be null")
    private String emergencyPhone;

    private List<ChildDto> children;

    @Getter
    @Setter
    public static class ChildDto {
        @Size(max = 8, message = "Child DNI number cannot be higher than 8 digits")
        @NotNull(message = "Child DNI cannot be null")
        private String childDNI;

        @NotNull(message = "Child name cannot be null")
        private String childName;
    }

}