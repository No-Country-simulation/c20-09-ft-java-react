package com.school.exception.handler;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.web.access.AccessDeniedHandler;

import java.io.IOException;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.Map;

public class CustomAccessDeniedHandler implements AccessDeniedHandler {
    @Override
    public void handle(HttpServletRequest request, HttpServletResponse response, AccessDeniedException accessDeniedException) throws IOException, ServletException {
        response.setStatus(HttpServletResponse.SC_FORBIDDEN);
        response.setContentType("application/json");

        Map<String, Object> errorDetails = new HashMap<>();
        errorDetails.put("status", "error");
        errorDetails.put("message", "Access Denied: You do not have permission to access this resource.");
        errorDetails.put("code", HttpServletResponse.SC_FORBIDDEN);
        errorDetails.put("timestamp", LocalDateTime.now().atZone(ZoneOffset.UTC).format(DateTimeFormatter.ISO_INSTANT));

        ObjectMapper objectMapper = new ObjectMapper();
        String jsonErrorDetails = objectMapper.writeValueAsString(errorDetails);

        response.getWriter().write(jsonErrorDetails);
    }
}
