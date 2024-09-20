package com.school.rest.entityControllers;

import com.school.persistence.entities.Parent;
import com.school.rest.response.*;
import com.school.service.dto.*;
import com.school.service.implementation.ParentServiceImpl;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/admin/parent")
@Secured("ROLE_ADMIN")
@Tag(name = "Entities registration", description = "Operations to register/save entities")
public class ParentController {

    private final ParentServiceImpl parentService;

    public ParentController(ParentServiceImpl parentService) {
        this.parentService = parentService;
    }

    @PostMapping("/register")
    @Operation(
            summary = "Register a new Parent",
            description = "Registers a new parent in the system by providing necessary details in the request body. " +
                    "Returns an authentication response if the registration is successful.",
            tags = {"Entities registration"},
            requestBody = @io.swagger.v3.oas.annotations.parameters.RequestBody(
                    description = "User details",
                    required = true,
                    content = @Content(schema = @Schema(implementation = ParentRegistrationDto.class))
            ),
            responses = {
                    @ApiResponse(
                            responseCode = "201", description = "Parent registered successfully",
                            content = @Content(
                                    schema = @Schema(implementation = AuthResponse.class)
                            )
                    ),
                    @ApiResponse(responseCode = "400", description = "Invalid input data"),
                    @ApiResponse(responseCode = "500", description = "Internal server error")
            }
    )
    public ResponseEntity<AuthResponse> processParentRegistration(@Valid @RequestBody ParentRegistrationDto parentRegistrationDto) {
        return new ResponseEntity<>(parentService.create(parentRegistrationDto), HttpStatus.CREATED);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<UpdateResponse<ParentDto>> updateStudentDto(@PathVariable Long id, @Valid @RequestBody UpdateParentDto updateParentDto) {
        return ResponseEntity.ok(parentService.update(id, updateParentDto));
    }

    @GetMapping("/find{id}")
    public ResponseEntity<ParentDto> findParentById(@PathVariable long id) {
        return new ResponseEntity<>(parentService.findById(id), HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<DeleteResponse> deleteParent(@PathVariable Long id) {
        return ResponseEntity.ok(parentService.delete(id));
    }

    @GetMapping("/verify/{dni}")
    public ResponseEntity<StudentResponse> getStudentAndParentByDni(@PathVariable String dni) {
        return ResponseEntity.ok(parentService.getStudentAndParentByDni(dni));
    }
}
