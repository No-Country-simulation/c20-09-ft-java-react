package com.school.service.interfaces;

import com.school.dto.AuthRegisterUserRequest;
import com.school.dto.AuthResponse;

public interface IProfileService {
    AuthResponse registerUser(AuthRegisterUserRequest request);

//    UserProfileDto getUser(Long userId); // Leer un perfil de usuario por ID
//
//    UserProfileDto updateUser(Long userId, UpdateUserRequest request); // Actualizar un perfil de usuario
//
//    void deleteUser(Long userId); // Eliminar un perfil de usuario
}
