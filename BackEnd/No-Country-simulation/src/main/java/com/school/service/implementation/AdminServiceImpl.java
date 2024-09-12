package com.school.service.implementation;

import com.school.persistence.entities.Admin;
import com.school.persistence.enums.RoleEnum;
import com.school.persistence.repository.AdminRepository;
import com.school.persistence.repository.UserEntityRepository;
import com.school.rest.request.AuthRegisterRoleRequest;
import com.school.rest.request.AuthRegisterUserRequest;
import com.school.rest.response.AuthResponse;
import com.school.service.dto.AdminRegistrationDto;
import com.school.utility.PasswordUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;

@Service
public class AdminServiceImpl {

    private final AdminRepository adminRepository;
    private final UserEntityRepository userEntityRepository;
    private final UserEntityServiceImpl userEntityService;
    private final PasswordUtil passwordUtil;
    private static final Logger logger = LoggerFactory.getLogger(AdminServiceImpl.class);

    @Autowired
    public AdminServiceImpl(AdminRepository adminRepository, UserEntityRepository userEntityRepository, UserEntityServiceImpl userEntityService, PasswordUtil passwordUtil) {
        this.adminRepository = adminRepository;
        this.userEntityRepository = userEntityRepository;
        this.userEntityService = userEntityService;
        this.passwordUtil = passwordUtil;
    }

    @Transactional
    public AuthResponse create(AdminRegistrationDto adminRegistrationDto) {
        logger.info("Admin registration request received: {}", adminRegistrationDto.toString());

        if (adminRepository.existsByDni(adminRegistrationDto.getDni())) {
            throw new IllegalArgumentException("DNI already registered: " + adminRegistrationDto.getDni());
        }

        logger.info("Admin registered successfully: {}", adminRegistrationDto);

        // Construir el AuthRegisterUserRequest con los datos necesarios
        AuthRegisterUserRequest requestUser = AuthRegisterUserRequest.builder()
                .email(adminRegistrationDto.getEmail())
                .username(adminRegistrationDto.getName())
                .profileType("ADMIN")  // Establecer el perfil como 'ADMIN'
                .roleRequest(AuthRegisterRoleRequest.builder()
                        .roleListName(Collections.singletonList(RoleEnum.ADMIN.name()))
                        .build())
                .build();
        // No se porque no puedo llamar al metodo build

        //Registrar usuario y obtener ID
        Long idUser = userEntityService.registerUser(requestUser, "549T#nfR%");

        //Buscar el Parent asociado al usuario registrado
        Admin admin = adminRepository.findByUser(userEntityRepository.findById(idUser)
                .orElseThrow(() -> new IllegalArgumentException("User not found with ID: " + idUser)));

        admin.setName(adminRegistrationDto.getName());
        admin.setLastName(adminRegistrationDto.getLastName());
        logger.info("Student registered successfully: {}", adminRegistrationDto.getDni());
        admin.setDni(adminRegistrationDto.getDni());
        logger.info("Student registered successfully: {}", adminRegistrationDto.getDni());

        adminRepository.save(admin);

        return new AuthResponse(admin.getName() ,null,"Student registered successfully",  "TBD", true);
    }
}
