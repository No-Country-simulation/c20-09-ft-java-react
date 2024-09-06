package com.school.service.implementation;

import com.school.rest.request.AuthRegisterUserRequest;
import com.school.rest.response.AuthResponse;
import com.school.service.interfaces.IProfileService;
import com.school.utility.PasswordUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@Service
public class TeacherServiceImpl implements IProfileService {
    private final PasswordUtil passwordUtil;
    private final UserEntitylServiceImpl userEntitylService;
    private static final Logger logger = LoggerFactory.getLogger(TeacherServiceImpl.class);

    public TeacherServiceImpl(PasswordUtil passwordUtil, UserEntitylServiceImpl userEntitylService) {
        this.passwordUtil = passwordUtil;
        this.userEntitylService = userEntitylService;
    }

    @Override
    public AuthResponse registerUser(AuthRegisterUserRequest request) {
        logger.info("Parent registered successfully: {}", request.toString());

        String rawPassword = passwordUtil.generatePassword(request.dni());

        //TODO: Implement this method Teacher ver servicio ParentServiceImpl para referencia
        userEntitylService.registerUser(request, rawPassword);

        return new AuthResponse( request.email(),rawPassword,"Teacher registered successfully",  "TBD", true);
    }

}
