package com.school.dto;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;

@JsonPropertyOrder({"email", "password", "message", "refreshToken", "status"})
public record AuthResponse(String email, String password, String message,  String refreshToken, boolean status) {
}
