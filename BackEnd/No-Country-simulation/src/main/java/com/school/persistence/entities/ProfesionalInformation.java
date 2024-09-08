package com.school.persistence.entities;

import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProfesionalInformation {

    private int profesorId;

    private String academicTitles;

    private List<String> subjectName;

    private List<Integer> subjectCode;

    private String workingHours;

    private boolean tutorship;

    private boolean extracurricularClasses;

}