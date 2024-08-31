package com.school.repository;

import com.school.entities.Parent;
import com.school.entities.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ParentRepository  extends JpaRepository<Parent, Long> {
    Parent findByUser(UserEntity user);
}
