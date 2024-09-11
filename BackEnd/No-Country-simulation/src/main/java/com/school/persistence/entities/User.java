package com.school.persistence.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Embedded;
import jakarta.persistence.MappedSuperclass;
import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@MappedSuperclass
public abstract class User {

    @Size(min = 2, max = 50, message = "Name must be between 2 and 30 characters")
    private String name;

    @Size(min = 2, max = 50, message = "Last name must be between 2 and 30 characters")
    private String lastName;

    @Column(unique = true)
    private String dni;

    @Email(message = "Invalid email format")
    private String email;

    @Pattern(regexp = "\\d{10,}", message = "Phone number must be at least 10 digits")
    private String phoneNumber;

    @Embedded
    private Address address;

    private String emergencyNumber;

    private String emergencyContactName;
}