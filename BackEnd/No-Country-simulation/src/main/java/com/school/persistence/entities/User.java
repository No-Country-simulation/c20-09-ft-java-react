package com.school.persistence.entities;

import jakarta.persistence.Column;
import jakarta.persistence.MappedSuperclass;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@MappedSuperclass
public abstract class User {

    private String name;

    @Column(name = "last_name")
    private String lastName;

    private String dni;

    private String phone;

    private String email;

    private Address address;

    private LocalDate dateOfBirth;

    private int emergencyNumber;

    private String emergencyContactName;
}