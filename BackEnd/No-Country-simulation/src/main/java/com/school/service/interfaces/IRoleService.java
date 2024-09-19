package com.school.service.interfaces;

import com.school.persistence.entities.PermissionEntity;
import com.school.persistence.entities.RoleEntity;
import com.school.persistence.enums.PermissionEnum;
import com.school.persistence.enums.RoleEnum;

import java.util.Set;

public interface IRoleService {

    RoleEntity createRoleWithPermissions(RoleEnum roleEnum);

    Set<PermissionEntity> assignPermissionsToRole(RoleEnum roleEnum);

    PermissionEntity findOrCreatePermission(PermissionEnum permissionEnum);

    Set<RoleEntity> getAllRoles();
}
