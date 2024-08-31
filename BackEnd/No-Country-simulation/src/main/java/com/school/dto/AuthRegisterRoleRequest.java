package com.school.dto;

import jakarta.validation.constraints.Size;

import java.util.List;

public record AuthRegisterRoleRequest (@Size(max = 1, message  = "Only one role can be assigned.") List<String> roleListName ) {
}
