package com.school.security;

import com.school.entities.RoleEntity;
import com.school.enums.RoleEnum;
import com.school.service.implementation.RolePermissionServiceImpl;
import com.school.service.interfaces.IRoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class RoleSetup {

    private final IRoleService rolePermissionService;

    @Autowired
    public RoleSetup(RolePermissionServiceImpl rolePermissionService) {
        this.rolePermissionService = rolePermissionService;
    }

    public void setupRoles() {
        // Crear el rol de TEACHER con sus permisos
        RoleEntity teacherRole = rolePermissionService.createRoleWithPermissions(RoleEnum.TEACHER);

        // Crear el rol de PARENT con sus permisos
        RoleEntity parentRole = rolePermissionService.createRoleWithPermissions(RoleEnum.PARENT);

        // Crear el rol de STUDENT con sus permisos
        RoleEntity studentRole = rolePermissionService.createRoleWithPermissions(RoleEnum.STUDENT);
    }
}