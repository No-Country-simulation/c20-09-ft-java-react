package com.school.service.interfaces;

import com.school.entities.PermissionEntity;
import com.school.entities.RoleEntity;
import com.school.enums.PermissionEnum;
import com.school.enums.RoleEnum;

import java.util.Set;

public interface IRoleService {

    RoleEntity createRoleWithPermissions(RoleEnum roleEnum);

    Set<PermissionEntity> assignPermissionsToRole(RoleEnum roleEnum);

    PermissionEntity findOrCreatePermission(PermissionEnum permissionEnum);

    Set<RoleEntity> getAllRoles();
}
