package com.school.controller;

import com.school.dto.SubjectRequest;
import com.school.entities.Subject;
import com.school.service.interfaces.ISubjectService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RequiredArgsConstructor
@RestController
@RequestMapping("api/v1/subject")
public class SubjectController {

    private final ISubjectService subjectService;

    @PostMapping("/new")
    public ResponseEntity<?> createSubject(@RequestBody SubjectRequest subjectRequest){
        Optional<Subject> subject = subjectService.registerSubject(subjectRequest);
        if(subject.isEmpty()){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Subject already exists");
        }
        return ResponseEntity.ok(subject);
    }

}
