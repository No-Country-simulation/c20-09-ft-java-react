package com.school.confing.filter;

import com.auth0.jwt.interfaces.Claim;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.school.exception.ExpiredJwtException;
import com.school.utility.JwtUtils;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Collection;

public class JwtTokenValidator extends OncePerRequestFilter {

    private final JwtUtils jwtUtils;
    public JwtTokenValidator(JwtUtils jwtUtils) {
        this.jwtUtils = jwtUtils;
    }

    @Override
    protected void doFilterInternal(@NonNull HttpServletRequest request, @NonNull HttpServletResponse response, @NonNull FilterChain filterChain) throws ServletException, IOException {
        // Buscar el token JWT en la cabecera Authorization del request
        String token = request.getHeader("Authorization");

        // Si el token no es nulo y empieza con "Bearer ", vamos a quitar ese prefijo
        if (token != null && token.startsWith("Bearer ")) {
            token = token.substring(7);
        }

        // Si tenemos un token, vamos a hacer algunas cosas con él
        if (token != null) {
            // Vamos a validar el token con nuestras utilidades JWT
            DecodedJWT decodedJWT = null;
            try {
                decodedJWT = jwtUtils.validateToken(token);
            } catch (ExpiredJwtException e) {
                logger.error("Token has expired: " + e.getMessage());
            }

            // Si el token es válido, extraemos el username y las autoridades
            if (decodedJWT != null) {
                // Extraemos el username del token
                String username = jwtUtils.extractSubjectFromToken(decodedJWT);
                // Y también las autoridades, que las necesitamos como una cadena
                Claim claim = jwtUtils.getUsernameClaim(decodedJWT, "authorities");
                String stringAuthorities = claim != null ? claim.asString() : null;

                // Convertir esa cadena de autoridades en una colección de GrantedAuthority
                Collection<? extends GrantedAuthority> authorities = AuthorityUtils.commaSeparatedStringToAuthorityList(stringAuthorities);

                // Creamos un nuevo contexto de seguridad y un token de autenticación con el username y las autoridades
                SecurityContext context = SecurityContextHolder.createEmptyContext();
                Authentication authenticationToken = new UsernamePasswordAuthenticationToken(username, null, authorities);

                // Establecer token de autenticación en el contexto
                context.setAuthentication(authenticationToken);
                // Establecer contexto en el SecurityContextHolder
                SecurityContextHolder.setContext(context);
            }
        }
        // LLamamos al siguiente filtro en la cadena
        filterChain.doFilter(request, response);
    }
}