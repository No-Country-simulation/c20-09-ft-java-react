package com.school.rest.response;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;

@JsonPropertyOrder({"email", "mensaje", "token", "refreshToken", "status"})
public record LoginAuthResponse (String email, String mensaje, String token,  String refreshToken, boolean status) {
}
