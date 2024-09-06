package com.school.rest.request;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;

public record RegisterRequest(@NotBlank String email,
                              @NotBlank String password,
                              @Valid AuthRegisterRoleRequest roleRequest,
                              @NotBlank String profileType) {
}
