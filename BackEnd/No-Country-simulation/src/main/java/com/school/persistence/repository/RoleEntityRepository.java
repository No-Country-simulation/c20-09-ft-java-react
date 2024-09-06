package com.school.persistence.repository;

import com.school.persistence.entities.RoleEntity;
import com.school.persistence.enums.RoleEnum;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RoleEntityRepository extends JpaRepository<RoleEntity, Long> {
    List<RoleEntity> findRoleEntitiesByRoleEnumIn(List<String> roleNameList);

    Optional<RoleEntity> findByRoleEnum(RoleEnum roleEnum);
}
