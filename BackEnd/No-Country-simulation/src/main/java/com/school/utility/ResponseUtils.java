package com.school.utility;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

public class ResponseUtils {

    public static Map<String, Object> createResponse(String message) {
        Map<String, Object> response = new HashMap<>();
        response.put("status", "success");
        response.put("message", message);
        response.put("timestamp", LocalDateTime.now());
        return response;
    }

    public static Map<String, Object> createErrorResponse(String message, int code) {
        Map<String, Object> response = new HashMap<>();
        response.put("status", "error");
        response.put("message", message);
        response.put("code", code);
        response.put("timestamp", LocalDateTime.now());
        return response;
    }
}
