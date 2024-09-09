package com.school.exception.handler;

import com.school.exception.EvaluationNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

/**
 * Manejador global de excepciones para las evaluaciones.
 */
@RestControllerAdvice
public class EvaluationExceptionHandler {
    /**
     * Manejador para excepciones cuando no se encuentran evaluaciones.
     *
     * @param ex La excepción lanzada.
     * @return Un ResponseEntity con un mensaje de error y el estado HTTP correspondiente.
     */
    @ExceptionHandler(EvaluationNotFoundException.class)
    public ResponseEntity<String> handleEvaluationNotFound(EvaluationNotFoundException ex) {
        // Crea una respuesta HTTP con el mensaje de error de la excepción y el estado 404 (NO ENCONTRADO)
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.NOT_FOUND);
    }
}
