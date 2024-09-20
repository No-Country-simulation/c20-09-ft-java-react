package com.school.persistence.repository;

import com.school.persistence.entities.Admin;
import com.school.persistence.entities.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AdminRepository extends JpaRepository<Admin, Long> {
    Admin findByUser(UserEntity userEntity);

    boolean existsByDni(String dni);
}