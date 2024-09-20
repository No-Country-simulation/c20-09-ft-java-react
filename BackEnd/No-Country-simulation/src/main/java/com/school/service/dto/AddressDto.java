package com.school.service.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AddressDto {
    private String streetNameNumberDepartmentFloorAndNumber;
    private String city;
    private String state;
    private String zipCode;
}
