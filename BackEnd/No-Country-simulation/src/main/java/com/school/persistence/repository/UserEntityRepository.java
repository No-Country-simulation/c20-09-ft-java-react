package com.school.persistence.repository;

import com.school.persistence.entities.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserEntityRepository extends JpaRepository<UserEntity, Long> {
    // Encuentra un usuario por email si no ha sido eliminado
    Optional<UserEntity> findUserEntityByEmailAndIsDeletedFalse(String email);

    boolean existsByEmail(String email);

    Optional<UserEntity> findByResetPasswordToken(String resetPasswordToken);
}
