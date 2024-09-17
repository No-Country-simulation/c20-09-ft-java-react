package com.school.utility.mapper;

import com.school.persistence.entities.Address;
import com.school.persistence.entities.Parent;
import com.school.service.dto.AddressDto;
import com.school.service.dto.ParentRegistrationDto;
import com.school.service.dto.UpdateParentDto;
import com.school.service.dto.ParentDto;
import org.springframework.stereotype.Component;

@Component
public class ParentMapper implements GenericMapper<Parent, ParentRegistrationDto, UpdateParentDto, ParentDto> {

    @Override
    public void createFromDto(ParentRegistrationDto dto, Parent entity) {
        if (entity != null) {
            entity.setName(dto.getName());
            entity.setLastName(dto.getLastName());
            entity.setDni(dto.getDni());
            entity.setPhoneNumber(dto.getPhoneNumber());
            entity.setEmail(dto.getEmail());
            entity.setEmergencyNumber(dto.getEmergencyPhone());
            entity.setEmergencyContactName(dto.getEmergencyContactName());
            entity.setRelationshipToChild(dto.getRelationshipToChild());
            entity.setOccupation(dto.getOccupation());
            entity.setAddress(dto.getAddress());
        }
    }

    @Override
    public void updateFromDto(UpdateParentDto dto, Parent entity) {
        if (entity != null) {
            entity.setName(dto.getName());
            entity.setLastName(dto.getLastName());
            entity.setDni(dto.getDni());
            entity.setPhoneNumber(dto.getPhoneNumber());
            entity.setEmail(dto.getEmail());
            entity.setEmergencyNumber(dto.getEmergencyNumber());
            entity.setEmergencyContactName(dto.getEmergencyContactName());
            entity.setAddress(dto.getAddress());
        }
    }

    @Override
    public ParentDto convertToDto(Parent parent) {
        if (parent == null) {
            return null;
        }

        return ParentDto.builder()
                .id(parent.getId())
                .name(parent.getName())
                .lastName(parent.getLastName())
                .dni(parent.getDni())
                .phoneNumber(parent.getPhoneNumber())
                .email(parent.getEmail())
                .emergencyNumber(parent.getEmergencyNumber())
                .emergencyContactName(parent.getEmergencyContactName())
                .relationshipToChild(parent.getRelationshipToChild())
                .occupation(parent.getOccupation())
                .address(convertToAddressDto(parent.getAddress()))
                .build();
    }

    private AddressDto convertToAddressDto(Address address) {
        if (address == null) {
            return null;
        }

        return AddressDto.builder()
                .streetNameNumberDepartmentFloorAndNumber(address.getStreetNameNumberDepartmentFloorAndNumber())
                .city(address.getCity())
                .state(address.getState())
                .zipCode(address.getZipCode())
                .build();
    }
}

