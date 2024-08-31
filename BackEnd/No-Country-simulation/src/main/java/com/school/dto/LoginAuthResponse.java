package com.school.dto;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;

@JsonPropertyOrder({"email", "mensaje", "token", "refreshToken", "status"})
public record LoginAuthResponse (String email, String mensaje, String token,  String refreshToken, boolean status) {
}
