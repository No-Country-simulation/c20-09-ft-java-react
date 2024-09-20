package com.school.service.implementation;

import com.school.persistence.entities.Subject;
import com.school.persistence.repository.SubjectRepository;
import com.school.rest.request.SubjectRequest;
import com.school.service.interfaces.ISubjectService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class SubjectServiceImpl implements ISubjectService {

    private final SubjectRepository subjectRepository;

    @Override
    public Optional<Subject> createSubject(SubjectRequest newSubject) {
        if(subjectRepository.existsByName(newSubject.getName())){
            return Optional.empty();
        }
        Subject newSubjectBd = new Subject();
        newSubjectBd.setName(newSubject.getName());

        return Optional.of(subjectRepository.save(newSubjectBd));
    }
}
