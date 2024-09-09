package com.school.exception;

/**
 * Excepción lanzada cuando no se encuentran evaluaciones para un DNI específico.
 */
public class EvaluationNotFoundException extends RuntimeException{
    /**
     * Constructor de la excepción.
     *
     * @param message El mensaje de error que describe el problema.
     */
    public EvaluationNotFoundException(String message) {
        // Pasa el mensaje de error a la clase base Exception para que se pueda acceder al mensaje en la excepción
        super(message);
    }
}
