package com.school.repository;

import com.school.entities.RoleEntity;
import com.school.enums.RoleEnum;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RoleEntityRepository extends JpaRepository<RoleEntity, Long> {
    List<RoleEntity> findRoleEntitiesByRoleEnumIn(List<String> roleNameList);

    Optional<RoleEntity> findByRoleEnum(RoleEnum roleEnum);
}
