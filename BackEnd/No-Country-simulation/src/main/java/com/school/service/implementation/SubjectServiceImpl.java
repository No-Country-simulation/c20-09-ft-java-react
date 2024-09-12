package com.school.service.implementation;

import com.school.dto.SubjectRequest;
import com.school.entities.Subject;
import com.school.repository.SubjectRepository;
import com.school.service.interfaces.ISubjectService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@RequiredArgsConstructor
@Service
public class SubjectServiceImpl implements ISubjectService {

    private final SubjectRepository subjectRepository;

    @Override
    public Optional<Subject> registerSubject(SubjectRequest newSubject) {
        if(subjectRepository.existsByName(newSubject.getName())){
            return Optional.empty();
        }
        Subject newSubjectBd = new Subject();
        newSubjectBd.setName(newSubject.getName());

        return Optional.of(subjectRepository.save(newSubjectBd));
    }
}
