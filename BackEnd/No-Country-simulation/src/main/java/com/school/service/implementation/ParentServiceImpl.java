package com.school.service.implementation;

import com.school.persistence.entities.Parent;
import com.school.persistence.entities.Student;
import com.school.persistence.enums.RoleEnum;
import com.school.persistence.repository.ParentRepository;
import com.school.persistence.repository.StudentRepository;
import com.school.persistence.repository.UserEntityRepository;
import com.school.rest.request.AuthRegisterRoleRequest;
import com.school.rest.request.AuthRegisterUserRequest;
import com.school.rest.response.AuthResponse;
import com.school.service.dto.ParentRegistrationDto;
import com.school.service.dto.UpdateParentDto;
import com.school.service.interfaces.GenericService;
import com.school.utility.PasswordUtil;
import jakarta.persistence.EntityNotFoundException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.Optional;

@Service
public class ParentServiceImpl implements GenericService<Parent, ParentRegistrationDto, UpdateParentDto, AuthResponse> {

    private final UserEntityRepository userEntityRepository;
    private final ParentRepository parentRepository;
    private final PasswordUtil passwordUtil;
    private final UserEntityServiceImpl userEntityService;
    private final StudentRepository studentRepository;
    private static final Logger logger = LoggerFactory.getLogger(ParentServiceImpl.class);

    @Autowired
    public ParentServiceImpl(UserEntityRepository userEntityRepository, ParentRepository parentRepository,
                             PasswordUtil passwordUtil, UserEntityServiceImpl userEntityService, StudentRepository studentRepository) {
        this.userEntityRepository = userEntityRepository;
        this.parentRepository = parentRepository;
        this.passwordUtil = passwordUtil;
        this.userEntityService = userEntityService;
        this.studentRepository = studentRepository;
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

        // Registrar usuario y obtener el ID
        Long idUser = userEntityService.registerUser(requestUser, rawPassword);

        // Buscar el Parent asociado al usuario registrado
        Parent parent = parentRepository.findByUser(userEntityRepository.findById(idUser)
                .orElseThrow(() -> new IllegalArgumentException("User not found with ID: " + idUser)));

        parent.setName(parentRegistrationDto.getName());
        parent.setLastName(parentRegistrationDto.getLastName());
        parent.setDni(parentRegistrationDto.getDni());
        parent.setPhoneNumber(parentRegistrationDto.getPhoneNumber());
        parent.setEmail(parentRegistrationDto.getEmail());
        parent.setEmergencyNumber(parentRegistrationDto.getEmergencyPhone());
        parent.setEmergencyContactName(parentRegistrationDto.getEmergencyContactName());
        parent.setRelationshipToChild(parentRegistrationDto.getRelationshipToChild());
        parent.setOccupation(parentRegistrationDto.getOccupation());
        parent.setAddress(parentRegistrationDto.getAddress());

        // Guardar el padre en el repositorio
        parentRepository.save(parent);

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
    public Parent update(Long id, UpdateParentDto updateParentDto) {

        // Buscar el padre existente por ID, lanzando una excepción si no se encuentra
        Parent existingParent = parentRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Parent with ID " + id + " not found"));

        // Actualizar los campos del padre con la información proporcionada en updateParentDto
        existingParent.setName(updateParentDto.getName());
        existingParent.setLastName(updateParentDto.getLastName());
        existingParent.setDni(updateParentDto.getDni());
        existingParent.setPhoneNumber(updateParentDto.getPhoneNumber());
        existingParent.setEmail(updateParentDto.getEmail());
        existingParent.setEmergencyNumber(updateParentDto.getEmergencyNumber());
        existingParent.setEmergencyContactName(updateParentDto.getEmergencyContactName());

        // Guardar el padre actualizado en la base de datos
        return parentRepository.save(existingParent);
    }

    @Override
    public Optional<Parent> findById(Long id) {
        return parentRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        if (!parentRepository.existsById(id)) {
            throw new EntityNotFoundException("Parent with ID " + id + " not found");
        }
        parentRepository.deleteById(id);
    }
}