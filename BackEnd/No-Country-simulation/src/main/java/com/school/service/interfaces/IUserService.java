package com.school.service.interfaces;

import com.school.rest.request.AuthRegisterUserRequest;
import com.school.persistence.entities.UserEntity;
import com.school.exception.EmailServiceException;

public interface IUserService {
    Long registerUser(AuthRegisterUserRequest registerUserRequest, String password);

    void updatePasswordToken(String token, String email) throws EmailServiceException;

    UserEntity get(String resetPasswordToken) throws EmailServiceException;

    void updatePassword(UserEntity user, String password);
}
