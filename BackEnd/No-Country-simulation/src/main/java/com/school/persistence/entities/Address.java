package com.school.persistence.entities;

import jakarta.persistence.Embeddable;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Embeddable
@ToString
@Builder
public class Address {

    private String country;

    private String state;

    private String city;

    private String zipCode;

    private String streetNameNumberDepartmentFloorAndNumber;

}
