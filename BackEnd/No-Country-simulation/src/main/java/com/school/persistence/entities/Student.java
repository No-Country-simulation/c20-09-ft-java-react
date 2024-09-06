package com.school.persistence.entities;

import jakarta.persistence.*;
import lombok.*;

import java.util.HashSet;
import java.util.Set;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "students")
public class Student extends User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id", referencedColumnName = "id", nullable = false)
    private UserEntity user;

    @ManyToMany(mappedBy = "children")
    private Set<Parent> parents = new HashSet<>();

    @ManyToMany(mappedBy = "students")
    private Set<Teacher> teachers = new HashSet<>();

    private MedicalInformation medicalInformation;
}
