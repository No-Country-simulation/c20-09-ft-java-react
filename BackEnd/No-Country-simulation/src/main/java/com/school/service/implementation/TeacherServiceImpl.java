package com.school.service.implementation;

import com.school.persistence.entities.Teacher;
import com.school.persistence.enums.RoleEnum;
import com.school.persistence.repository.TeacherRepository;
import com.school.persistence.repository.UserEntityRepository;
import com.school.rest.request.AuthRegisterRoleRequest;
import com.school.rest.request.AuthRegisterUserRequest;
import com.school.rest.response.AuthResponse;
import com.school.service.dto.TeacherRegistrationDto;
import com.school.service.dto.UpdateTeacherDto;
import com.school.service.interfaces.GenericService;
import com.school.utility.PasswordUtil;
import jakarta.persistence.EntityNotFoundException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.Optional;

@Service
public class TeacherServiceImpl implements GenericService<Teacher, TeacherRegistrationDto, UpdateTeacherDto, AuthResponse> {

    private final PasswordUtil passwordUtil;
    private final UserEntityServiceImpl userEntityService;
    private final UserEntityRepository userEntityRepository;
    private final TeacherRepository teacherRepository;
    private static final Logger logger = LoggerFactory.getLogger(TeacherServiceImpl.class);

    public TeacherServiceImpl(PasswordUtil passwordUtil, UserEntityServiceImpl userEntityService, UserEntityRepository userEntityRepository, TeacherRepository teacherRepository) {
        this.passwordUtil = passwordUtil;
        this.userEntityService = userEntityService;
        this.userEntityRepository = userEntityRepository;
        this.teacherRepository = teacherRepository;
    }

    @Transactional
    @Override
    public AuthResponse create(TeacherRegistrationDto teacherRegistrationDto) {

        // Verificar si el DNI ya está registrado
        if (teacherRepository.existsByDni(teacherRegistrationDto.getDni())) {
            throw new IllegalArgumentException("DNI already registered: " + teacherRegistrationDto.getDni());
        }

        logger.info("Teacher registered successfully: {}", teacherRegistrationDto.toString());

        // Generar una contraseña basada en el DNI del profesor
        String rawPassword = passwordUtil.generatePassword(teacherRegistrationDto.getDni());

        // Construir el AuthRegisterUserRequest con los datos necesarios
        AuthRegisterUserRequest requestUser = AuthRegisterUserRequest.builder()
                .email(teacherRegistrationDto.getEmail())
                .username(teacherRegistrationDto.getName())
                .profileType("TEACHER")  // Establecer el perfil como 'TEACHER'
                .roleRequest(AuthRegisterRoleRequest.builder()
                        .roleListName(Collections.singletonList(RoleEnum.TEACHER.name()))
                        .build())
                .build();

        // Registrar usuario y obtener el ID
        Long idUser = userEntityService.registerUser(requestUser, rawPassword);

        // Buscar el Teacher asociado al usuario registrado
        Teacher teacher = teacherRepository.findByUser(userEntityRepository.findById(idUser)
                .orElseThrow(() -> new IllegalArgumentException("User not found with ID: " + idUser)));

        // Asignar los datos del DTO al objeto Teacher
        teacher.setName(teacherRegistrationDto.getName());
        teacher.setDateOfBirth(teacherRegistrationDto.getDateOfBirth());
        teacher.setLastName(teacherRegistrationDto.getLastName());
        teacher.setDni(teacherRegistrationDto.getDni());
        teacher.setPhoneNumber(teacherRegistrationDto.getPhoneNumber());
        teacher.setEmail(teacherRegistrationDto.getEmail());
        teacher.setEmergencyNumber(teacherRegistrationDto.getEmergencyNumber());
        teacher.setEmergencyContactName(teacherRegistrationDto.getEmergencyContactName());
        teacher.setProfesionalInformation(teacherRegistrationDto.getProfessionalInformation());
        teacher.setAddress(teacherRegistrationDto.getAddress());

        // Guardar los datos del profesor en el repositorio
        teacherRepository.save(teacher);

        // Retornar respuesta de autenticación
        return new AuthResponse(teacher.getName(), rawPassword, "Teacher registered successfully", "TBD", true);
    }

    @Override
    @Transactional
    public Teacher update(Long id, UpdateTeacherDto updateTeacherDto) {

        // Buscar el profesor existente por ID, lanzando una excepción si no se encuentra
        Teacher existingTeacher = teacherRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Teacher with ID " + id + " not found"));

        // Actualizar los campos del profesor con la información proporcionada en updateTeacherDto
        existingTeacher.setName(updateTeacherDto.getName());
        existingTeacher.setLastName(updateTeacherDto.getLastName());
        existingTeacher.setDni(updateTeacherDto.getDni());
        existingTeacher.setPhoneNumber(updateTeacherDto.getPhoneNumber());
        existingTeacher.setEmail(updateTeacherDto.getEmail());
        existingTeacher.setEmergencyNumber(updateTeacherDto.getEmergencyNumber());
        existingTeacher.setEmergencyContactName(updateTeacherDto.getEmergencyContactName());
        existingTeacher.setProfesionalInformation(updateTeacherDto.getProfesionalInformation());

        // Guardar el profesor actualizado en la base de datos
        return teacherRepository.save(existingTeacher);
    }

    @Override
    public Optional<Teacher> findById(Long id) {
        return teacherRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        if (!teacherRepository.existsById(id)) {
            throw new EntityNotFoundException("Teacher with ID " + id + " not found");
        }
        teacherRepository.deleteById(id);
    }
}
