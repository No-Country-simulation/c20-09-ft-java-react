package com.school.service.dto;

import lombok.Builder;
import lombok.Data;

import java.util.Map;

@Builder
@Data
public class ProfessionalInformationDto {
    private String academicTitles;
    private Map<String, String> subjectCodeNameMap;
    private String workingHours;
    private boolean tutorship;
    private boolean extracurricularClasses;
}
