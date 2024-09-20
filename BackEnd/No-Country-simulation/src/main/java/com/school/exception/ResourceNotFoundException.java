package com.school.exception;

/**
 * Excepción personalizada que indica que un recurso solicitado no fue encontrado.
 * Esta clase extiende {@link RuntimeException} y se utiliza para señalar situaciones
 * en las que se intenta acceder a un recurso que no existe en la base de datos o en otra
 * parte del sistema.
 */
public class ResourceNotFoundException extends RuntimeException {
    /**
     * Constructor para crear una nueva instancia de {@code ResourceNotFoundException} con un mensaje específico.
     *
     * @param message El mensaje que describe el motivo de la excepción.
     */
    public ResourceNotFoundException(String message) {
        super(message);
    }
}
