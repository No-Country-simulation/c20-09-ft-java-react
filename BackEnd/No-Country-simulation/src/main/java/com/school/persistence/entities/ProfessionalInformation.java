package com.school.persistence.entities;

import jakarta.persistence.*;
import lombok.*;

import java.util.Map;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Embeddable
@ToString
public class ProfessionalInformation {

    private int profesorId;

    private String academicTitles;

    @ElementCollection(fetch = FetchType.EAGER)
    @MapKeyColumn(name = "subject_code")
    @Column(name = "subject_name")
    @CollectionTable(name = "subject_code_name_map", joinColumns = @JoinColumn(name = "professional_info_id"))
    private Map<String, String> subjectCodeNameMap;

    private String workingHours;

    private boolean tutorship;

    private boolean extracurricularClasses;

}