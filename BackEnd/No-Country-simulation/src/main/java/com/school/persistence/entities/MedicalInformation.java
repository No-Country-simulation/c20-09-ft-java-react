package com.school.persistence.entities;

import jakarta.validation.constraints.Size;
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

    /**
     * Fields that determine the blood type (Like A+ or O-),
     * allergies and any additional conditions (like surgeries)
     * **/

    @Size(max = 2, message = "Blood type should not have more than two characters")
    private String bloodType;

    @Size(max = 1, message = "Blood type should be either + or -")
    private char bloodTypePoles;

    private List<String> allergies;

    private String additionalConditions;
}
