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

    private String name;

    private String lastName;

    @Column(unique = true)
    private String dni;

    private String email;

    private String phoneNumber;

    @Embedded
    private Address address;

    private String emergencyNumber;

    private String emergencyContactName;
}