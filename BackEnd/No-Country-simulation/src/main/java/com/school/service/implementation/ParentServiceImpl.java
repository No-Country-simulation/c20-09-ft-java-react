package com.school.service.implementation;

import com.school.dto.AuthRegisterUserRequest;
import com.school.dto.AuthResponse;
import com.school.entities.Parent;
import com.school.repository.ParentRepository;
import com.school.repository.UserEntityRepository;
import com.school.service.interfaces.IProfileService;
import com.school.utility.PasswordUtil;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@Service
public class ParentServiceImpl implements IProfileService {
    private final UserEntityRepository userEntityRepository;
    private final ParentRepository parentRepository;
    private final PasswordUtil passwordUtil;
    private final UserEntitylServiceImpl userEntitylService;
    private static final Logger logger = LoggerFactory.getLogger(ParentServiceImpl.class);

    public ParentServiceImpl(UserEntityRepository userEntityRepository, ParentRepository parentRepository, PasswordUtil passwordUtil, UserEntitylServiceImpl userEntitylService) {
        this.userEntityRepository = userEntityRepository;
        this.parentRepository = parentRepository;
        this.passwordUtil = passwordUtil;
        this.userEntitylService = userEntitylService;
    }

    @Override
    public AuthResponse registerUser(AuthRegisterUserRequest request) {
        logger.info("Parent registered successfully: {}", request.toString());

        // Generar contraseña
        String rawPassword = passwordUtil.generatePassword(request.dni());

        // Registrar usuario y obtener ID
        Long idUser = userEntitylService.registerUser(request, rawPassword);

        // Buscar el Parent asociado al usuario registrado
        Parent parent = parentRepository.findByUser(userEntityRepository.findById(idUser)
                .orElseThrow(() -> new IllegalArgumentException("User not found with ID: " + idUser)));

        //TODO: Implement this method Parent
        // Establecer teléfono de emergencia (Ejemplo de como setear un campo restantes)
        parent.setEmergencyPhone("1165437777");

        // Guardar cambios del Parent
        parentRepository.save(parent);

        // Retornar respuesta de autenticación
        return new AuthResponse( request.email(),rawPassword,"Parent registered successfully",  "TBD", true);
    }
}
