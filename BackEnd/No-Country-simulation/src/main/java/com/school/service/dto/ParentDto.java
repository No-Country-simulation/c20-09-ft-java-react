package com.school.service.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ParentDto {
    private Long id;
    private String name;
    private String lastName;
    private String dni;
    private String phoneNumber;
    private String email;
    private String emergencyNumber;
    private String emergencyContactName;
    private String relationshipToChild;
    private String occupation;
    private AddressDto address;
}
