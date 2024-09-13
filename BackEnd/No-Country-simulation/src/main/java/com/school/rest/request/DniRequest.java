package com.school.rest.request;

import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

@Data
@NoArgsConstructor
public class DniRequest {
    @NotBlank(message = "El DNI no puede estar en blanco")
    @Pattern(regexp = "\\d+", message = "El DNI debe ser un número válido")
    private String dni;
}
