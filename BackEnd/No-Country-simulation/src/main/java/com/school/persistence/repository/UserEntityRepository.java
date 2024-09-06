package com.school.persistence.repository;

import com.school.persistence.entities.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserEntityRepository extends JpaRepository<UserEntity, Long> {
    Optional<UserEntity> findUserEntityByEmail(String email);

    boolean existsByEmail(String email);

    Optional<UserEntity> findByResetPasswordToken(String resetPasswordToken);
}
