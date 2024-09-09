package com.school.persistence.repository;

import com.school.persistence.entities.Parent;
import com.school.persistence.entities.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ParentRepository  extends JpaRepository<Parent, Long> {
    Parent findByUser(UserEntity user);

    boolean existsByDni(String dni);
}
