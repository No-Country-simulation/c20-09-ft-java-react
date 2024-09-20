package com.school.rest.response;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;

@JsonPropertyOrder({"name", "password", "message", "refreshToken", "status"})
public record AuthResponse(String name, String password, String message,  String refreshToken, boolean status) {
}
