package com.school.rest.request;

import jakarta.validation.constraints.Size;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Builder
public class AuthRegisterRoleRequest {

    @Size(max = 1, message = "Only one role can be assigned.")
    private List<String> roleListName;
}
