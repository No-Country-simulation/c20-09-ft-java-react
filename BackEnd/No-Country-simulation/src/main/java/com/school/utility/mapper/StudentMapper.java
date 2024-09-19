package com.school.utility.mapper;

import com.school.persistence.entities.Address;
import com.school.persistence.entities.MedicalInformation;
import com.school.persistence.entities.Student;
import com.school.service.dto.*;
import org.springframework.stereotype.Component;

@Component
public class StudentMapper implements GenericMapper <Student, StudentRegistrationDto, UpdateStudentDto, StudentDto>  {

    @Override
    public StudentDto convertToDto(Student student) {
        if (student == null) {
            return null;
        }

        MedicalInformation medicalInfo = student.getMedicalInformation();
        MedicalInformationDto medicalInformationDto = medicalInfo != null ?
                MedicalInformationDto.builder()
                        .bloodType(medicalInfo.getBloodType())
                        .allergies(medicalInfo.getAllergies())
                        .additionalConditions(medicalInfo.getAdditionalConditions())
                        .build() : null;

        return StudentDto.builder()
                .id(student.getId())
                .name(student.getName())
                .lastName(student.getLastName())
                .dni(student.getDni())
                .year(student.getYear())
                .phoneNumber(student.getPhoneNumber())
                .email(student.getEmail())
                .dateOfBirth(student.getDateOfBirth())
                .emergencyNumber(student.getEmergencyNumber())
                .emergencyContactName(student.getEmergencyContactName())
                .address(convertToAddressDto(student.getAddress()))
                .session(student.getSession())
                .medicalInformation(medicalInformationDto)
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

    @Override
    public void createFromDto(StudentRegistrationDto dto, Student entity) {
        if (entity != null) {
            entity.setName(dto.getName());
            entity.setLastName(dto.getLastName());
            entity.setDni(dto.getDni());
            entity.setPhoneNumber(dto.getPhoneNumber());
            entity.setEmail(dto.getEmail());
            entity.setYear(dto.getYear());
            entity.setDateOfBirth(dto.getDateOfBirth());
            entity.setEmergencyNumber(dto.getEmergencyNumber());
            entity.setEmergencyContactName(dto.getEmergencyContactName());
            entity.setAddress(dto.getAddress());
            entity.setSession(dto.getSession());
            if (dto.getMedicalInformation() != null) {
                MedicalInformation medicalInfo = new MedicalInformation();
                medicalInfo.setBloodType(dto.getMedicalInformation().getBloodType());
                medicalInfo.setAllergies(dto.getMedicalInformation().getAllergies());
                medicalInfo.setAdditionalConditions(dto.getMedicalInformation().getAdditionalConditions());
                entity.setMedicalInformation(medicalInfo);
            }
        }
    }

    @Override
    public void updateFromDto(UpdateStudentDto dto, Student entity) {
        if (entity != null) {
            entity.setName(dto.getName());
            entity.setLastName(dto.getLastName());
            entity.setDni(dto.getDni());
            entity.setEmail(dto.getEmail());
            entity.setAddress(dto.getAddress());
            entity.setPhoneNumber(dto.getPhoneNumber());
            entity.setEmergencyNumber(dto.getEmergencyNumber());
            entity.setEmergencyContactName(dto.getEmergencyContactName());
            entity.setSession(dto.getSession());
        }
    }
}
