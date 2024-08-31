package com.school.utility;

import org.springframework.stereotype.Component;

import java.security.SecureRandom;

@Component
public class PasswordUtil {

    private static final String UPPERCASE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    private static final String LOWERCASE = "abcdefghijklmnopqrstuvwxyz";
    private static final String SPECIAL_CHARACTERS = "!@#$%&*_";
    private static final int PREFIX_LENGTH = 3; // Longitud del prefijo

    private final SecureRandom random = new SecureRandom();

    // Método para generar una contraseña
    public String generatePassword(String dni) {
        // Generar un prefijo específico con una letra mayúscula, una letra minúscula y un carácter especial
        String prefix = generateSpecificPrefix();

        // Crear la contraseña combinando el prefijo y el DNI
        return prefix + dni;
    }

    // Método para generar un prefijo específico con una letra mayúscula, una letra minúscula y un carácter especial
    private String generateSpecificPrefix() {
        // Elegir un carácter de cada tipo (mayúscula, minúscula, especial)
        char uppercase = UPPERCASE.charAt(random.nextInt(UPPERCASE.length()));
        char lowercase = LOWERCASE.charAt(random.nextInt(LOWERCASE.length()));
        char special = SPECIAL_CHARACTERS.charAt(random.nextInt(SPECIAL_CHARACTERS.length()));

        // Retornar el prefijo en el orden deseado
        return "" + uppercase + lowercase + special;
    }
}
