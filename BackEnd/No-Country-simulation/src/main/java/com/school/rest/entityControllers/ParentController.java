package com.school.rest.entityControllers;

import com.school.persistence.entities.Parent;
import com.school.service.dto.ParentRegistrationDto;
import com.school.service.implementation.ParentServiceImpl;
import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/parent")
public class ParentController {

    private final ParentServiceImpl parentService;

    public ParentController(ParentServiceImpl parentService) {
        this.parentService = parentService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> processParentRegistration(@Valid @RequestBody ParentRegistrationDto parentRegistrationDto){

        try {
            // Call the service method to handle registration logic
            parentService.parentRegistration(parentRegistrationDto);

            // Return a CREATED status if the registration is successful
            return ResponseEntity.status(HttpStatus.CREATED).body("Parent registered successfully");

        } catch (Exception e) {
            // Handle potential errors in service logic
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred during registration.");
        }
    }

    @GetMapping("/find{id}")
    public ResponseEntity<?> findParentById(@PathVariable long id) {

        try {
            // Find parent by ID using the service
            Optional<Parent> optionalParent = parentService.findParentById(id);

            // If parent is found, return it with OK status
            return ResponseEntity.ok(optionalParent);

        } catch (EntityNotFoundException e) {
            // Handle case where parent is not found
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Parent not found with ID: " + id);
        } catch (Exception e) {
            // Handle other potential errors
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred while fetching the parent.");
        }
    }

    @PutMapping("/update{id}")
    public ResponseEntity<?> updateParent(@PathVariable Long id) {

        try {
            // Update parent information
            Optional<Parent> optionalParent = parentService.updateParentById(id);

            // Return updated parent details
            return ResponseEntity.ok(optionalParent);

        } catch (EntityNotFoundException e) {
            // Handle case where parent is not found
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Parent not found with ID: " + id);
        } catch (Exception e) {
            // Handle other potential errors
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred while updating the parent.");
        }
    }

    @DeleteMapping("/delete{id}")
    public ResponseEntity<?> deleteParent(@PathVariable Long id) {

        try {
            // Delete parent by ID
            parentService.deleteParent(id);

            // Return NO_CONTENT status to indicate successful deletion
            return ResponseEntity.noContent().build();

        } catch (EntityNotFoundException e) {
            // Handle case where parent is not found
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Parent not found with ID: " + id);
        } catch (Exception e) {
            // Handle other potential errors
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred while deleting the parent.");
        }
    }
}
