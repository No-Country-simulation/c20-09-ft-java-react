package com.school.persistence.repository;

import com.school.persistence.entities.Parent;
import com.school.persistence.entities.UserEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ParentRepository  extends JpaRepository<Parent, Long> {
    Parent findByUser(UserEntity user);

    boolean existsByDni(String dni);

    @Query("SELECT p FROM Parent p LEFT JOIN FETCH p.children WHERE p.dni = :dni")
    Optional<Parent> findByDniWithChildren(@Param("dni") String dni);

    Page<Parent> findByLastName(String lastName, Pageable pageable);
}
