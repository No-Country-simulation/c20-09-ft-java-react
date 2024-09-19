package com.school.utility.mapper;

import com.school.persistence.entities.Address;
import com.school.persistence.entities.ProfessionalInformation;
import com.school.persistence.entities.Teacher;
import com.school.service.dto.*;
import org.springframework.stereotype.Component;

/**
 * Mapper component responsible for converting between Teacher entities and DTOs.
 */
@Component
public class TeacherMapper implements GenericMapper <Teacher, TeacherRegistrationDto, UpdateTeacherDto, TeacherDto> {

    @Override
    public void createFromDto(TeacherRegistrationDto dto, Teacher entity) {
        if (entity != null) {
            entity.setName(dto.getName());
            entity.setLastName(dto.getLastName());
            entity.setDni(dto.getDni());
            entity.setPhoneNumber(dto.getPhoneNumber());
            entity.setEmail(dto.getEmail());
            entity.setDateOfBirth(dto.getDateOfBirth());
            entity.setEmergencyNumber(dto.getEmergencyNumber());
            entity.setEmergencyContactName(dto.getEmergencyContactName());
            entity.setAddress(dto.getAddress());
            entity.setProfesionalInformation(dto.getProfessionalInformation());
        }
    }

    @Override
    public void updateFromDto(UpdateTeacherDto dto, Teacher entity) {
        if (entity != null) {
            entity.setName(dto.getName());
            entity.setLastName(dto.getLastName());
            entity.setDni(dto.getDni());
            entity.setEmail(dto.getEmail());
            entity.setAddress(dto.getAddress());
            entity.setEmergencyNumber(dto.getEmergencyNumber());
            entity.setEmergencyContactName(dto.getEmergencyContactName());
        }
    }

    @Override
    public TeacherDto convertToDto(Teacher teacher) {
        if (teacher == null) {
            return null;
        }

        return TeacherDto.builder()
                .id(teacher.getId())
                .name(teacher.getName())
                .lastName(teacher.getLastName())
                .dni(teacher.getDni())
                .phoneNumber(teacher.getPhoneNumber())
                .email(teacher.getEmail())
                .dateOfBirth(teacher.getDateOfBirth())
                .emergencyNumber(teacher.getEmergencyNumber())
                .emergencyContactName(teacher.getEmergencyContactName())
                .address(convertToAddressDto(teacher.getAddress()))
                .professionalInformation(convertToProfessionalInformationDto(teacher.getProfesionalInformation()))
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

    private ProfessionalInformationDto convertToProfessionalInformationDto(ProfessionalInformation professionalInformation) {
        if (professionalInformation == null) {
            return null;
        }

        return ProfessionalInformationDto.builder()
                .academicTitles(professionalInformation.getAcademicTitles())
                .subjectCodeNameMap(professionalInformation.getSubjectCodeNameMap())
                .workingHours(professionalInformation.getWorkingHours())
                .tutorship(professionalInformation.isTutorship())
                .extracurricularClasses(professionalInformation.isExtracurricularClasses())
                .build();
    }
}
