package com.school.exception.handler;

import com.school.exception.ResourceNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import com.school.exception.ErrorResponse;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.stream.Collectors;

import jakarta.persistence.EntityNotFoundException;

@RestControllerAdvice
public class NotificationExceptionHandler {
    /**
     * Maneja la excepción cuando no se encuentra una entidad en la base de datos.
     * Devuelve una respuesta con el código de estado 404 (NOT FOUND)
     * y un mensaje que detalla la entidad no encontrada.
     *
     * @param ex La excepción lanzada cuando no se encuentra una entidad.
     * @return ResponseEntity con el mensaje de error y código de estado 404.
     */
    @ExceptionHandler(EntityNotFoundException.class)
    public ResponseEntity<String> handleEntityNotFound(EntityNotFoundException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Error: " + ex.getMessage());
    }

    /**
     * Maneja la excepción lanzada cuando un argumento ilegal o inválido es pasado al servicio.
     * Se captura la excepción que puede generarse, por ejemplo, en la validación de un DNI.
     * Devuelve una respuesta con el código de estado 400 (BAD REQUEST) indicando que la solicitud es inválida.
     *
     * @param ex La excepción lanzada cuando se proporciona un argumento ilegal o inválido.
     * @return ResponseEntity con el mensaje de error y código de estado 400.
     */
    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<ErrorResponse> handleIllegalArgumentException(IllegalArgumentException ex) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ErrorResponse("Bad Request", ex.getMessage()));
    }

    /**
     * Maneja la excepción cuando un usuario no tiene permiso para acceder a un recurso.
     * Devuelve una respuesta con el código de estado 403 (FORBIDDEN) e información sobre el error.
     *
     * @param ex La excepción lanzada cuando se deniega el acceso a un recurso.
     * @return ResponseEntity con la información del error y código de estado 403.
     */
    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<Map<String, Object>> handleAccessDeniedException(AccessDeniedException ex) {
        Map<String, Object> errorResponse = Map.of(
                "Status", "Error",
                "Message", "No tiene permiso para acceder a las notificaciones de este estudiante.",
                "Code", HttpStatus.FORBIDDEN.value(),
                "timestamp", LocalDateTime.now()
        );
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(errorResponse);
    }

    /**
     * Maneja la excepción cuando se produce un error relacionado con un recurso que no se encuentra.
     * Devuelve una respuesta con el código de estado 404 (NOT FOUND) e información sobre el recurso no encontrado.
     *
     * @param ex La excepción lanzada cuando un recurso no se encuentra.
     * @return ResponseEntity con el mensaje de error y código de estado 404.
     */
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleResourceNotFoundException(ResourceNotFoundException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ErrorResponse("Resource Not Found", ex.getMessage()));
    }

    /**
     * Maneja la excepción cuando la solicitud contiene datos inválidos o no cumple con las restricciones de validación.
     * Devuelve una respuesta con el código de estado 400 (BAD REQUEST) e información sobre los errores de validación.
     *
     * @param ex La excepción lanzada cuando los datos proporcionados no cumplen con las restricciones de validación.
     * @return ResponseEntity con el mensaje de error y código de estado 400.
     */
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> handleValidationExceptions(MethodArgumentNotValidException ex) {
        String errorMessage = ex.getBindingResult().getAllErrors().stream()
                .map(error -> {
                    String fieldName = ((FieldError) error).getField();
                    String defaultMessage = error.getDefaultMessage();
                    return fieldName + ": " + defaultMessage;
                })
                .collect(Collectors.joining(", "));

        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(new ErrorResponse("Validation Error", errorMessage));
    }
}
