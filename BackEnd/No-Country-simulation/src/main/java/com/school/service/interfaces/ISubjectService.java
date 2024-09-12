package com.school.service.interfaces;

import com.school.dto.SubjectRequest;
import com.school.entities.Subject;

import java.util.Optional;

public interface ISubjectService {
    Optional<Subject> registerSubject(SubjectRequest newSubject);
}
