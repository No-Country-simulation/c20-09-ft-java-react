package com.school.service.implementation;

import com.school.persistence.entities.PermissionEntity;
import com.school.persistence.entities.RoleEntity;
import com.school.persistence.enums.PermissionEnum;
import com.school.persistence.enums.RoleEnum;
import com.school.persistence.repository.PermissionRepository;
import com.school.persistence.repository.RoleEntityRepository;
import com.school.service.interfaces.IRoleService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.Set;

@Service
public class RolePermissionServiceImpl implements IRoleService {

    private final RoleEntityRepository roleEntityRepository;
    private final PermissionRepository permissionRepository;

    public RolePermissionServiceImpl(RoleEntityRepository roleEntityRepository, PermissionRepository permissionRepository) {
        this.roleEntityRepository = roleEntityRepository;
        this.permissionRepository = permissionRepository;
    }

    @Transactional
    @Override
    public RoleEntity createRoleWithPermissions(RoleEnum roleEnum) {
        // Comprobar si el rol ya existe
        RoleEntity existingRole = roleEntityRepository.findByRoleEnum(roleEnum).orElse(null);
        if (existingRole != null) {
            return existingRole; // Retornar el rol existente si ya está en la base de datos
        }

        // Crear el conjunto de permisos según el rol
        Set<PermissionEntity> permissions = assignPermissionsToRole(roleEnum);

        // Crear el rol y asignarle los permisos
        RoleEntity roleEntity = RoleEntity.builder()
                .roleEnum(roleEnum)
                .permissionList(permissions)
                .build();

        // Guardar el rol en la base de datos
        return roleEntityRepository.save(roleEntity);
    }

    @Transactional
    @Override
    public Set<PermissionEntity> assignPermissionsToRole(RoleEnum roleEnum) {
        Set<PermissionEntity> permissions = new HashSet<>();

        switch (roleEnum) {
            case TEACHER, PARENT:
                permissions.add(findOrCreatePermission(PermissionEnum.READ_PRIVILEGES));
                permissions.add(findOrCreatePermission(PermissionEnum.WRITE_PRIVILEGES));

                break;

            case STUDENT:
                permissions.add(findOrCreatePermission(PermissionEnum.READ_PRIVILEGES));
                break;

            case ADMIN:
                permissions.add(findOrCreatePermission(PermissionEnum.READ_PRIVILEGES));
                permissions.add(findOrCreatePermission(PermissionEnum.WRITE_PRIVILEGES));
                permissions.add(findOrCreatePermission(PermissionEnum.DELETE_PRIVILEGES));
                permissions.add(findOrCreatePermission(PermissionEnum.UPDATE_PRIVILEGES));
                break;
            default:
                throw new IllegalArgumentException("Unknown role: " + roleEnum.name());
        }

        return permissions;
    }

    @Transactional
    @Override
    public PermissionEntity findOrCreatePermission(PermissionEnum permissionEnum) {
        return permissionRepository.findByName(permissionEnum.name())
                .orElseGet(() -> permissionRepository.save(PermissionEntity.builder()
                        .name(permissionEnum.name())
                        .build()));
    }

    @Override
    public Set<RoleEntity> getAllRoles() {
        return new HashSet<>(roleEntityRepository.findAll());
    }
}
