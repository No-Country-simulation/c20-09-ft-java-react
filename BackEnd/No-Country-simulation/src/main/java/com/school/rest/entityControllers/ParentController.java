package com.school.rest.entityControllers;

import com.school.persistence.entities.Parent;
import com.school.rest.response.AuthResponse;
import com.school.rest.response.Response;
import com.school.service.dto.ParentRegistrationDto;
import com.school.service.dto.UpdateParentDto;
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
        // Llamar al método del servicio para manejar la lógica de registro de padres
        AuthResponse registeredUser = parentService.create(parentRegistrationDto);

        // Devolver un estado CREATED si el registro es exitoso con la respuesta de autenticación
        return new ResponseEntity<>(registeredUser, HttpStatus.CREATED);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Response<Parent>> updateParent(@PathVariable Long id, @Valid @RequestBody UpdateParentDto updateParentDto) {
        // Llamar al método del servicio para actualizar el padre
        Parent updatedParent = parentService.update(id, updateParentDto);

        // Crear y devolver la respuesta con el mensaje de éxito y el objeto actualizado
        return ResponseEntity.ok(new Response<>("Parent updated successfully", updatedParent));
    }

    @GetMapping("/find{id}")
    public ResponseEntity<?> findParentById(@PathVariable long id) {
        try {
            // Find parent by ID using the service
            Optional<Parent> optionalParent = parentService.findById(id);

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

    @DeleteMapping("/delete{id}")
    public ResponseEntity<?> deleteParent(@PathVariable Long id) {

        try {
            // Delete parent by ID
            parentService.delete(id);

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
