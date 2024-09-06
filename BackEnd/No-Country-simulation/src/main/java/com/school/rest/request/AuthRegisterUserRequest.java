package com.school.rest.request;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;

public record AuthRegisterUserRequest(@NotBlank String email,
                                      @NotBlank String dni,
                                      @Valid AuthRegisterRoleRequest roleRequest,
                                      @NotBlank String profileType) {
}