package com.school.service.implementation;

import com.school.persistence.entities.Student;
import com.school.persistence.entities.UserEntity;
import com.school.persistence.enums.RoleEnum;
import com.school.persistence.repository.StudentRepository;
import com.school.persistence.repository.UserEntityRepository;
import com.school.rest.request.AuthRegisterRoleRequest;
import com.school.rest.request.AuthRegisterUserRequest;
import com.school.rest.response.AuthResponse;
import com.school.rest.response.DeleteResponse;
import com.school.rest.response.StudentResponse;
import com.school.rest.response.UpdateResponse;
import com.school.service.dto.*;
import com.school.service.interfaces.GenericService;
import com.school.utility.PasswordUtil;
import com.school.utility.mapper.StudentMapper;
import jakarta.persistence.EntityNotFoundException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class StudentServiceImpl implements GenericService
        <Student, StudentRegistrationDto, UpdateStudentDto, AuthResponse, StudentDto, UpdateResponse<StudentDto>, DeleteResponse> {

    private final PasswordUtil passwordUtil;
    private final UserEntityServiceImpl userEntityService;
    private final UserEntityRepository userEntityRepository;
    private final StudentRepository studentRepository;
    private final StudentMapper studentMapper;
    private static final Logger logger = LoggerFactory.getLogger(StudentServiceImpl.class);

    @Autowired
    public StudentServiceImpl(PasswordUtil passwordUtil,
                              UserEntityServiceImpl userEntityService,
                              UserEntityRepository userEntityRepository,
                              StudentRepository studentRepository, StudentMapper studentMapper) {

        this.passwordUtil = passwordUtil;
        this.userEntityService = userEntityService;
        this.userEntityRepository = userEntityRepository;
        this.studentRepository = studentRepository;
        this.studentMapper = studentMapper;
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

        //Buscar el Student asociado al usuario registrado
        Student student = studentRepository.findByUser(userEntityRepository.findById(idUser)
                .orElseThrow(() -> new IllegalArgumentException("User not found with ID: " + idUser)));

        // Registrar datos del Student con los datos del DTO
        studentMapper.createFromDto(studentRegistrationDto, student);

        studentRepository.save(student);

        return new AuthResponse(student.getName() ,rawPassword,"Student registered successfully",  "TBD", true);
    }

    @Override
    @Transactional
    public UpdateResponse<StudentDto> update(Long id, UpdateStudentDto updateStudentDto) {

        Student existingStudent = studentRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Student with ID " + id + " not found"));

        // Usar el mapper para actualizar la entidad con los valores del DTO
        studentMapper.updateFromDto(updateStudentDto, existingStudent);

        // Devolver la respuesta con el DTO actualizado
        return new UpdateResponse<>("Student updated successfully", true, studentMapper.convertToDto(studentRepository.save(existingStudent)));
    }

    @Override
    public StudentDto findById(Long id) {
        Student student = studentRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Student not found with ID: " + id));

        return studentMapper.convertToDto(student);
    }

    public List<StudentDto> findAll() {
        List<Student> teachers = studentRepository.findAll();
        return teachers.stream()
                .map(studentMapper::convertToDto)
                .collect(Collectors.toList());
    }

    public Page<StudentDto> findStudentsByLastName(String lastName, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Student> studentPage = studentRepository.findByLastName(lastName, pageable);
        return studentPage.map(studentMapper::convertToDto);
    }

    @Override
    @Transactional
    public DeleteResponse delete(Long id) {
        Student student = studentRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Teacher with ID " + id + " not found"));

        // Marcar el registro de Student como eliminado
        student.setIsDeleted(true);
        studentRepository.save(student);

        // Marcar el registro de UserEntity como eliminado
        UserEntity user = student.getUser();
        if (user != null) {
            user.setIsDeleted(true);
            userEntityRepository.save(user);
        }

        return new DeleteResponse("Teacher successfully deleted", true);
    }

    public StudentResponse verifyChildByDni(String dni) {
        // Buscar el hijo por DNI
        Student student = studentRepository.findByDni(dni)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,
                        "Child not found with DNI: " + dni));

        // Devolver la información del hijo como DTO
        return new StudentResponse(student.getDni(), student.getName(), student.getLastName(), student.getYear(), student.getSession());
    }

    public Optional<Student> findStudentByDni(String dni) {
        return studentRepository.findByDni(dni);
    }
}