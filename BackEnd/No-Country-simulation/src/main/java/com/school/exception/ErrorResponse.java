package com.school.exception;

import lombok.Getter;
import lombok.Setter;
import lombok.AllArgsConstructor;

/**
 * Representa una respuesta de error que se envía al cliente cuando ocurre una excepción.
 * Esta clase se utiliza para proporcionar información estructurada sobre el error.
 */
@Getter
@Setter
@AllArgsConstructor
public class ErrorResponse {
    /**
     * El tipo de error o el nombre de la excepción que ocurrió.
     * Ejemplo: "Bad Request", "Not Found", etc.
     */
    private String error;

    /**
     * Un mensaje descriptivo que proporciona detalles adicionales sobre el error.
     * Este mensaje es útil para que el cliente entienda la causa del error.
     */
    private String message;
}
