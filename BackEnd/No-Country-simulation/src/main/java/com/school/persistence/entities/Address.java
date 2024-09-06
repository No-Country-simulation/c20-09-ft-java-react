package com.school.persistence.entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Address {

    private String country;

    private String state;

    private String city;

    private int zipCode;

    private String streetName;

    private String streetNumber;

    private String departmentFloorAndNumber;
}
