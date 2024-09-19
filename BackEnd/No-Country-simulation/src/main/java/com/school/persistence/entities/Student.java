package com.school.persistence.entities;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@ToString
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

    @Embedded
    private MedicalInformation medicalInformation;

    @Column(name = "enrollment_number")
    private String enrollmentNumber;

    @Column(name = "session")
    private String session;

    @Column(name = "year")
    private String year;

    private LocalDate dateOfBirth;

    @PrePersist
    public void generateEnrollmentNumber() {
        if (this.enrollmentNumber == null || this.enrollmentNumber.isEmpty()) {
            this.enrollmentNumber = UUID.randomUUID().toString();
        }
    }
}
