package com.school.service.implementation;

import com.school.persistence.entities.Parent;
import com.school.persistence.entities.Student;
import com.school.persistence.entities.UserEntity;
import com.school.persistence.enums.RoleEnum;
import com.school.persistence.repository.ParentRepository;
import com.school.persistence.repository.StudentRepository;
import com.school.persistence.repository.UserEntityRepository;
import com.school.rest.request.AuthRegisterRoleRequest;
import com.school.rest.request.AuthRegisterUserRequest;
import com.school.rest.response.AuthResponse;
import com.school.rest.response.DeleteResponse;
import com.school.rest.response.StudentResponse;
import com.school.rest.response.UpdateResponse;
import com.school.service.dto.ParentDto;
import com.school.service.dto.ParentRegistrationDto;
import com.school.service.dto.UpdateParentDto;
import com.school.service.interfaces.GenericService;
import com.school.utility.PasswordUtil;
import com.school.utility.mapper.ParentMapper;
import jakarta.persistence.EntityNotFoundException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.Collections;
import java.util.Set;

@Service
public class ParentServiceImpl implements GenericService<Parent, ParentRegistrationDto, UpdateParentDto, AuthResponse, ParentDto, UpdateResponse<ParentDto>, DeleteResponse> {

    private final UserEntityRepository userEntityRepository;
    private final ParentRepository parentRepository;
    private final PasswordUtil passwordUtil;
    private final UserEntityServiceImpl userEntityService;
    private final StudentRepository studentRepository;
    private static final Logger logger = LoggerFactory.getLogger(ParentServiceImpl.class);
    private final ParentMapper parentMapper;
    private final StudentServiceImpl studentService;

    @Autowired
    public ParentServiceImpl(UserEntityRepository userEntityRepository, ParentRepository parentRepository, PasswordUtil passwordUtil, UserEntityServiceImpl userEntityService, StudentRepository studentRepository, ParentMapper parentMapper, StudentServiceImpl studentService) {
        this.userEntityRepository = userEntityRepository;
        this.parentRepository = parentRepository;
        this.passwordUtil = passwordUtil;
        this.userEntityService = userEntityService;
        this.studentRepository = studentRepository;
        this.parentMapper = parentMapper;
        this.studentService = studentService;
    }

    @Transactional
    @Override
    public AuthResponse create(ParentRegistrationDto parentRegistrationDto) {
        // Verificar si el DNI ya está registrado
        if (parentRepository.existsByDni(parentRegistrationDto.getDni())) {
            throw new IllegalArgumentException("DNI already registered: " + parentRegistrationDto.getDni());
        }

        logger.info("Parent registration initiated: {}", parentRegistrationDto.toString());

        // Generar una contraseña basada en el DNI del padre
        String rawPassword = passwordUtil.generatePassword(parentRegistrationDto.getDni());

        // Construir el AuthRegisterUserRequest con los datos necesarios
        AuthRegisterUserRequest requestUser = AuthRegisterUserRequest.builder()
                .email(parentRegistrationDto.getEmail())
                .username(parentRegistrationDto.getName())
                .profileType("PARENT")
                .roleRequest(AuthRegisterRoleRequest.builder()
                        .roleListName(Collections.singletonList(RoleEnum.PARENT.name()))
                        .build())
                .build();

        // Registrar Parent y obtener el ID
        Long idUser = userEntityService.registerUser(requestUser, rawPassword);

        // Buscar el Parent asociado al usuario registrado
        Parent parent = parentRepository.findByUser(userEntityRepository.findById(idUser)
                .orElseThrow(() -> new IllegalArgumentException("User not found with ID: " + idUser)));

        // Registrar datos del Parent con los datos del DTO
        parentMapper.createFromDto(parentRegistrationDto, parent);

        // Asociar los hijos ya creados al padre si se proporciona la lista de hijos
        if (parentRegistrationDto.getChildren() != null) {
            for (ParentRegistrationDto.ChildDto childDto : parentRegistrationDto.getChildren()) {
                // Buscar el hijo existente en la base de datos usando el DNI
                Student child = studentRepository.findByDni(childDto.getChildDNI())
                        .orElseThrow(() -> new IllegalArgumentException("Child not found with DNI: " + childDto.getChildDNI()));

                // Asociar el hijo con el padre
                parent.getChildren().add(child);
            }
        }

        // Actualizar el padre con la lista de hijos asociados
        parentRepository.save(parent);

        // Retornar respuesta de autenticación
        return new AuthResponse(parent.getName(), rawPassword, "Parent registered successfully", "TBD", true);
    }

    @Transactional
    @Override
    public UpdateResponse<ParentDto> update(Long id, UpdateParentDto updateParentDto) {

        // Buscar el padre existente por ID, lanzando una excepción si no se encuentra
        Parent existingParent = parentRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Parent with ID " + id + " not found"));

        // Usar el mapper para actualizar la entidad con los valores del DTO
        parentMapper.updateFromDto(updateParentDto, existingParent);

        // Guardar el padre actualizado
        Parent updatedParent = parentRepository.save(existingParent);
        // Retornar la respuesta con el DTO actualizado
        return new UpdateResponse<>("Parent updated successfully", true, parentMapper.convertToDto(updatedParent));
    }

    @Override
    public ParentDto findById(Long id) {
        Parent parent = parentRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Parent not found with ID: " + id));

        return parentMapper.convertToDto(parent);
    }

    @Override
    @Transactional
    public DeleteResponse delete(Long id) {
        Parent parent = parentRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Parent with ID " + id + " not found"));

        // Marcar el registro de Parent como eliminado
        parent.setIsDeleted(true);
        parentRepository.save(parent);

        // Marcar el registro de UserEntity como eliminado
        UserEntity user = parent.getUser();
        if (user != null) {
            user.setIsDeleted(true);
            userEntityRepository.save(user);
        }

        return new DeleteResponse("Parent successfully deleted", true);
    }

    public StudentResponse verifyStudentByParentDni(String dni) {
        // Buscar el padre por DNI
        Parent parent = parentRepository.findByDniWithChildren(dni)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,
                        "Parent not found with DNI: " + dni));

        // Obtener los hijos del padre
        Set<Student> children = parent.getChildren();

        if (children == null || children.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,
                    "No children found for the parent with DNI: " + dni);
        }

        Student student = children.iterator().next();

        // Devolver la información del hijo como DTO
        return new StudentResponse(student.getDni(), student.getName(), student.getLastName(), student.getYear(), student.getSession(), parent.getName(), parent.getLastName());
    }

    public StudentResponse getStudentAndParentByDni(String dni) {
        return studentService.getStudentAndParentByDni(dni);
    }
}