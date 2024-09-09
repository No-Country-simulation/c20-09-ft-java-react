package com.school.persistence.entities;

import jakarta.persistence.ElementCollection;
import jakarta.persistence.Embeddable;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Embeddable
@ToString
public class MedicalInformation {

    /**
     * Fields that determine the blood type (Like A+ or O-),
     * allergies and any additional conditions (like surgeries)
     * **/

    @Size(max = 2, message = "Blood type should not have more than two characters")
    private String bloodType;

    @Size(max = 1, message = "Blood type poles should be either + or -")
    private String bloodTypePoles;

    @ElementCollection
    private List<String> allergies;

    private String additionalConditions;
}