package com.school.service.interfaces;

import com.school.dto.AuthRegisterUserRequest;

public interface IUserService {
    Long registerUser(AuthRegisterUserRequest registerUserRequest, String password);
}
