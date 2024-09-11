package com.school.service.implementation;

import com.school.persistence.entities.Student;
import com.school.persistence.enums.RoleEnum;
import com.school.persistence.repository.StudentRepository;
import com.school.persistence.repository.UserEntityRepository;
import com.school.rest.request.AuthRegisterRoleRequest;
import com.school.rest.request.AuthRegisterUserRequest;
import com.school.rest.response.AuthResponse;
import com.school.rest.response.StudentResponse;
import com.school.service.dto.StudentRegistrationDto;
import com.school.service.dto.UpdateStudentDto;
import com.school.service.interfaces.GenericService;
import com.school.utility.PasswordUtil;
import jakarta.persistence.EntityNotFoundException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.Collections;
import java.util.Optional;

@Service
public class StudentServiceImpl implements GenericService<Student, StudentRegistrationDto, UpdateStudentDto, AuthResponse> {

    private final PasswordUtil passwordUtil;
    private final UserEntityServiceImpl userEntityService;
    private final UserEntityRepository userEntityRepository;
    private final StudentRepository studentRepository;
    private static final Logger logger = LoggerFactory.getLogger(StudentServiceImpl.class);

    @Autowired
    public StudentServiceImpl(PasswordUtil passwordUtil,
                              UserEntityServiceImpl userEntityService,
                              UserEntityRepository userEntityRepository,
                              StudentRepository studentRepository) {

        this.passwordUtil = passwordUtil;
        this.userEntityService = userEntityService;
        this.userEntityRepository = userEntityRepository;
        this.studentRepository = studentRepository;
    }

    @Transactional
    @Override
    public AuthResponse create(StudentRegistrationDto studentRegistrationDto) {
        logger.info("Student registration request received: {}", studentRegistrationDto.toString());
        logger.info("Checking if DNI is already registered: {}", studentRegistrationDto.getDni());

        if (studentRepository.existsByDni(studentRegistrationDto.getDni())) {
            throw new IllegalArgumentException("DNI already registered: " + studentRegistrationDto.getDni());
        }

        logger.info("Student registered successfully: {}", studentRegistrationDto.toString());

        String rawPassword = passwordUtil.generatePassword(studentRegistrationDto.getDni());

        // Construir el AuthRegisterUserRequest con los datos necesarios
        AuthRegisterUserRequest requestUser = AuthRegisterUserRequest.builder()
                .email(studentRegistrationDto.getEmail())
                .username(studentRegistrationDto.getName())
                .profileType("STUDENT")  // Establecer el perfil como 'STUDENT'
                .roleRequest(AuthRegisterRoleRequest.builder()
                        .roleListName(Collections.singletonList(RoleEnum.STUDENT.name()))
                        .build())
                .build();

        //Registrar usuario y obtener ID
        Long idUser = userEntityService.registerUser(requestUser, rawPassword);

        //Buscar el Parent asociado al usuario registrado
        Student student = studentRepository.findByUser(userEntityRepository.findById(idUser)
                .orElseThrow(() -> new IllegalArgumentException("User not found with ID: " + idUser)));

        student.setName(studentRegistrationDto.getName());
        student.setLastName(studentRegistrationDto.getLastName());
        logger.info("Student registered successfully: {}", studentRegistrationDto.getDni());
        student.setDni(studentRegistrationDto.getDni());
        logger.info("Student registered successfully: {}", studentRegistrationDto.getDni());
        student.setPhoneNumber(studentRegistrationDto.getPhoneNumber());
        student.setEmail(studentRegistrationDto.getEmail());
        student.setAddress(studentRegistrationDto.getAddress());
        student.setSession(studentRegistrationDto.getSession());
        student.setDateOfBirth(studentRegistrationDto.getDateOfBirth());
        student.setEmergencyNumber(studentRegistrationDto.getEmergencyNumber());
        student.setEmergencyContactName(studentRegistrationDto.getEmergencyContactName());
        student.setMedicalInformation(studentRegistrationDto.getMedicalInformation());

        studentRepository.save(student);

        return new AuthResponse(student.getName() ,rawPassword,"Student registered successfully",  "TBD", true);
    }

    @Transactional
    @Override
    public Student update(Long id, UpdateStudentDto updateStudentDto) {

        Student existingStudent = studentRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Student with ID " + id + " not found"));

        existingStudent.setName(updateStudentDto.getName());
        existingStudent.setLastName(updateStudentDto.getLastName());
        existingStudent.setDni(updateStudentDto.getDni());
        existingStudent.setPhoneNumber(updateStudentDto.getPhoneNumber());
        existingStudent.setEmail(updateStudentDto.getEmail());
        existingStudent.setAddress(updateStudentDto.getAddress());
        existingStudent.setDateOfBirth(updateStudentDto.getDateOfBirth());
        existingStudent.setEmergencyNumber(updateStudentDto.getEmergencyNumber());
        existingStudent.setEmergencyContactName(updateStudentDto.getEmergencyContactName());
        existingStudent.setSession(updateStudentDto.getSession());

        return studentRepository.save(existingStudent);
    }

    @Override
    public Optional<Student> findById(Long id)  {
        return studentRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        if (!studentRepository.existsById(id)) {
            throw new EntityNotFoundException("Student with ID " + id + " not found");
        }
        studentRepository.deleteById(id);
    }

    public StudentResponse verifyChildByDni(String dni) {
        // Buscar el hijo por DNI
        Student student = studentRepository.findByDni(dni)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,
                        "Child not found with DNI: " + dni));

        // Devolver la información del hijo como DTO
        return new StudentResponse(student.getDni(), student.getName(), student.getLastName());
    }

    public Optional<Student> findStudentByDni(String dni) {
        return studentRepository.findByDni(dni);
    }
}