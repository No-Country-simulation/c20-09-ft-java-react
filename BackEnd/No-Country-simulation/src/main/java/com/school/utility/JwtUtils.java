package com.school.utility;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.Claim;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.school.exception.ExpiredJwtException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

@Component
public class JwtUtils {
    private static final Logger logger = LoggerFactory.getLogger(JwtUtils.class);
    //Clave secreta utilizada para generar el token JWT
    @Value("${jwt.secret.key}")
    private String jwtSecretKey;
    // Identificador del emisor del token JWT
    @Value("${jwt.issuer}")
    private String jwtIssuer;

    @Value("${spring.application.name}")
    private String appName;

    public String createToken(Authentication authentication) {
        // Se crea un algoritmo HMAC256 utilizando la clave secreta JWT
        Algorithm algorithm = Algorithm.HMAC256(jwtSecretKey);

        // Se obtienen las autoridades del usuario autenticado y se convierten en una cadena separada por comas
        String authorities = authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining(","));

        // Se crea un nuevo token JWT
        return JWT.create()
                // Se establece el emisor del token
                .withIssuer(jwtIssuer)
                // Se establece el sujeto del token con el nombre del usuario autenticado
                .withSubject(authentication.getName())
                // Se añade un claim con las autoridades del usuario
                .withClaim("authorities", authorities)
                // Se añade un claim con el nombre de la aplicación
                .withClaim("app_name", appName)
                // Se establece la fecha de emisión del token como la fecha actual
                .withIssuedAt(new Date())
                // Se establece la fecha de expiración del token como 24 horas después de la fecha actual
                .withExpiresAt(new Date(System.currentTimeMillis() + 86400000))
                // Se genera un identificador único para el token
                .withJWTId(UUID.randomUUID().toString())
                // Se establece la fecha en la que el token comienza a ser válido como la fecha actual (válido inmediatamente)
                //Puede establecerse una fecha futura para que el token no sea válido hasta esa fecha Ej: .withNotBefore(new Date(System.currentTimeMillis() + 5 * 60 * 1000)) solo agrega 5 minutos después de creado
                .withNotBefore(new Date(System.currentTimeMillis()))
                // Se firma el token con el algoritmo HMAC256
                .sign(algorithm);
    }

    public DecodedJWT validateToken(String token) throws ExpiredJwtException {
        try {
            // Se crea un algoritmo HMAC256 utilizando la clave secreta JWT
            Algorithm algorithm = Algorithm.HMAC256(jwtSecretKey);

            // Sé verífica la firma del token y se decodifica
            return JWT.require(algorithm)
                    .withIssuer(jwtIssuer)
                    .build()
                    .verify(token);
        } catch (JWTVerificationException e) {
            logger.error("Token is invalid: " + e.getMessage());
            throw new ExpiredJwtException("The provided token is invalid");
        }
    }

    // Este método extrae el sujeto (subject) de un token JWT decodificado.
    // En el contexto de JWT, el sujeto (subject) generalmente se refiere al identificador del usuario (En este caso el username, podría ser el email).
    public String extractSubjectFromToken(DecodedJWT decodedJWT) {
        if (decodedJWT == null) {
            logger.error("Cannot extract subject from token because the token is invalid or not authorized");
            return null;
        }
        return decodedJWT.getSubject();
    }

    // Este método obtiene un claim específico de un token JWT decodificado.
    // Un claim es una declaración que el emisor hace sobre el sujeto del token.
    // En este caso, el nombre del claim se pasa como argumento al método.
    public Claim getUsernameClaim(DecodedJWT decodedJWT, String claimName) {
        if (decodedJWT == null) {
            logger.error("Cannot get username claim because the token is invalid or not authorized");
            return null;
        }
        return decodedJWT.getClaim(claimName);
    }

    // Este método obtiene todos los claims de un token JWT decodificado.
    // Un claim es una declaración que el emisor hace sobre el sujeto del token.
    // El método devuelve un mapa donde las claves son los nombres de los claims y los valores son los claims en sí.
    public Map<String, Claim> getAllClaims(DecodedJWT decodedJWT) {
        if (decodedJWT == null) {
            logger.error("Cannot get all claims because the token is invalid or not authorized");
            return null;
        }
        return decodedJWT.getClaims();
    }

    public String createRefreshToken(UsernamePasswordAuthenticationToken authentication) {
        Algorithm algorithm = Algorithm.HMAC256(jwtSecretKey);
        return JWT.create()
                .withIssuer(jwtIssuer)
                .withSubject(authentication.getName())
                .withIssuedAt(new Date())
                .withExpiresAt(new Date(System.currentTimeMillis() + 1209600000)) // 14 días
                .withJWTId(UUID.randomUUID().toString())
                .withNotBefore(new Date(System.currentTimeMillis()))
                .sign(algorithm);
    }

    public DecodedJWT validateRefreshToken(String oldRefreshToken) throws ExpiredJwtException {
        try {
            Algorithm algorithm = Algorithm.HMAC256(jwtSecretKey);
            return JWT.require(algorithm)
                    .withIssuer(jwtIssuer)
                    .build()
                    .verify(oldRefreshToken);
        } catch (JWTVerificationException e) {
            logger.error("Refresh token is invalid: " + e.getMessage());
            throw new ExpiredJwtException("The provided refresh token is invalid");
        }
    }
}