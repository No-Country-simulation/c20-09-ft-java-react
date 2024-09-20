package com.school.service.interfaces;

import com.school.persistence.entities.Subject;
import com.school.rest.request.SubjectRequest;

import java.util.Optional;

public interface ISubjectService {
    Optional<Subject> createSubject(SubjectRequest newSubject);
}
