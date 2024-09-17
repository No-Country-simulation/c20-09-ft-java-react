package com.school.service.implementation;

import com.school.persistence.entities.Teacher;
import com.school.persistence.entities.UserEntity;
import com.school.persistence.enums.RoleEnum;
import com.school.persistence.repository.TeacherRepository;
import com.school.persistence.repository.UserEntityRepository;
import com.school.rest.request.AuthRegisterRoleRequest;
import com.school.rest.request.AuthRegisterUserRequest;
import com.school.rest.response.AuthResponse;
import com.school.rest.response.DeleteResponse;
import com.school.rest.response.StudentResponse;
import com.school.rest.response.UpdateResponse;
import com.school.service.dto.TeacherDto;
import com.school.service.dto.TeacherRegistrationDto;
import com.school.service.dto.UpdateTeacherDto;
import com.school.service.interfaces.GenericService;
import com.school.utility.PasswordUtil;
import com.school.utility.mapper.TeacherMapper;
import jakarta.persistence.EntityNotFoundException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class TeacherServiceImpl implements GenericService<Teacher, TeacherRegistrationDto, UpdateTeacherDto, AuthResponse, TeacherDto, UpdateResponse<TeacherDto>, DeleteResponse> {

    private final PasswordUtil passwordUtil;
    private final UserEntityServiceImpl userEntityService;
    private final UserEntityRepository userEntityRepository;
    private final TeacherRepository teacherRepository;
    private final TeacherMapper teacherMapper;
    private final StudentServiceImpl studentService;
    private static final Logger logger = LoggerFactory.getLogger(TeacherServiceImpl.class);

    public TeacherServiceImpl(PasswordUtil passwordUtil, UserEntityServiceImpl userEntityService, UserEntityRepository userEntityRepository, TeacherRepository teacherRepository, TeacherMapper teacherMapper, StudentServiceImpl studentService) {
        this.passwordUtil = passwordUtil;
        this.userEntityService = userEntityService;
        this.userEntityRepository = userEntityRepository;
        this.teacherRepository = teacherRepository;
        this.teacherMapper = teacherMapper;
        this.studentService = studentService;
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

        // Registrar datos del Teacher con los datos del DTO
        teacherMapper.createFromDto(teacherRegistrationDto, teacher);

        // Guardar los datos del profesor en el repositorio
        teacherRepository.save(teacher);

        // Retornar respuesta de autenticación
        return new AuthResponse(teacher.getName(), rawPassword, "Teacher registered successfully", "TBD", true);
    }

    @Override
    @Transactional
    public UpdateResponse<TeacherDto> update(Long id, UpdateTeacherDto updateTeacherDto) {

        Teacher existingTeacher = teacherRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Teacher with ID " + id + " not found"));

        // Usar el mapper para actualizar la entidad con los valores del DTO
        teacherMapper.updateFromDto(updateTeacherDto, existingTeacher);

        // Devolver la respuesta con el DTO actualizado
        return new UpdateResponse<>("Teacher updated successfully", true, teacherMapper.convertToDto(teacherRepository.save(existingTeacher)));
    }

    @Override
    public TeacherDto findById(Long id) {
        Teacher teacher = teacherRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Teacher not found with ID: " + id));

        return teacherMapper.convertToDto(teacher);
    }

    public List<TeacherDto> findAll() {
        List<Teacher> teachers = teacherRepository.findAll();
        return teachers.stream()
                .map(teacherMapper::convertToDto)
                .collect(Collectors.toList());
    }

    public Page<TeacherDto> findTeachersByLastName(String lastName, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Teacher> teacherPage = teacherRepository.findByLastName(lastName, pageable);
        return teacherPage.map(teacherMapper::convertToDto);
    }

    public Page<TeacherDto> findAllTeachers(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Teacher> teacherPage = teacherRepository.findAll(pageable);
        return teacherPage.map(teacherMapper::convertToDto);
    }

    @Override
    @Transactional
    public DeleteResponse delete(Long id) {
        Teacher teacher = teacherRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Teacher with ID " + id + " not found"));

        // Marcar el registro de Teacher como eliminado
        teacher.setIsDeleted(true);
        teacherRepository.save(teacher);

        // Marcar el registro de UserEntity como eliminado
        UserEntity user = teacher.getUser();
        if (user != null) {
            user.setIsDeleted(true);
            userEntityRepository.save(user);
        }

        return new DeleteResponse("Teacher successfully deleted", true);
    }

    public StudentResponse verifyStudentByDni(String dni) {
        return studentService.verifyChildByDni(dni);
    }
}
