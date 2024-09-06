package com.school.persistence.entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class MedicalInformation {

    private String bloodType;

    private char bloodTypePoles;

    private List<String> allergies;

    private String additionalConditions;
}
