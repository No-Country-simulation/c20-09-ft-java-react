package com.school.rest.controller;

import com.school.persistence.entities.Subject;
import com.school.rest.request.SubjectRequest;
import com.school.service.interfaces.ISubjectService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequestMapping("api/v1/subject")
@RequiredArgsConstructor
public class SubjectController {
    private final ISubjectService subjectService;

    @PostMapping("/create")
    public ResponseEntity<?> createSubjecte(@RequestBody SubjectRequest subjectRequest){
        Optional<Subject> subject = subjectService.createSubject(subjectRequest);
        if(subject.isEmpty()){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error creating subject");
        }
        return ResponseEntity.ok(subject);
    }
}
