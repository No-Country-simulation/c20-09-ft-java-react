package com.school.service.interfaces;

import com.school.exception.ExpiredJwtException;
import com.school.exception.InvalidTokenException;
import com.school.rest.request.AuthLoginRequest;
import com.school.rest.request.AuthRegisterUserRequest;
import com.school.persistence.entities.UserEntity;
import com.school.exception.EmailServiceException;
import com.school.rest.response.LoginAuthResponse;
import org.springframework.transaction.annotation.Transactional;

public interface IUserService {
    Long registerUser(AuthRegisterUserRequest registerUserRequest, String password);

    void updatePasswordToken(String token, String email) throws EmailServiceException;

    UserEntity get(String resetPasswordToken) throws EmailServiceException;

    void updatePassword(UserEntity user, String password);

    @Transactional
    LoginAuthResponse loginUser(AuthLoginRequest userRequest);

    @Transactional
    LoginAuthResponse refreshToken(String oldRefreshToken) throws InvalidTokenException, ExpiredJwtException;

    UserEntity findUserByEmail(String email);
}
