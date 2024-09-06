package com.school.rest.controller;

import com.school.utility.ResponseUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/status")
public class StatusServerController {

    @GetMapping
    public ResponseEntity<Map<String, Object>> status() {
        return new ResponseEntity<>(ResponseUtils.createResponse("Server is running!"), HttpStatus.OK);
    }

    @GetMapping("/auth-teacher")
    public ResponseEntity<Map<String, Object>> statusAuth1() {
        return new ResponseEntity<>(ResponseUtils.createResponse("Server is running authority Teacher!"), HttpStatus.OK);
    }

    @GetMapping("/auth-student")
    public ResponseEntity<Map<String, Object>> statusAuth2() {
        return new ResponseEntity<>(ResponseUtils.createResponse("Server is running authority Student!"), HttpStatus.OK);
    }

    @GetMapping("/auth-parent")
    public ResponseEntity<Map<String, Object>> statusAuth3() {
        return new ResponseEntity<>(ResponseUtils.createResponse("Server is running authority Parent!"), HttpStatus.OK);
    }
}
