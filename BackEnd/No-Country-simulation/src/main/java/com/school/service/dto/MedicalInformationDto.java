package com.school.service.dto;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class MedicalInformationDto {

    private String bloodType;
    private List<String> allergies;
    private String additionalConditions;
}
