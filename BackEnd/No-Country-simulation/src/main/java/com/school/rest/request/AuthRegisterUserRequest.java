package com.school.rest.request;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AuthRegisterUserRequest {

    @NotBlank
    private String email;

    @NotBlank
    private String dni;

    private String username;

    @Valid
    private AuthRegisterRoleRequest roleRequest;

    @NotBlank
    private String profileType;
}
