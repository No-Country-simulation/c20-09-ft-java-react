package com.school.rest.response;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;

@JsonPropertyOrder({"name", "dni", "mensaje", "token", "refreshToken", "status"})
public record LoginAuthResponse (String name, String dni, String mensaje, String token,  String refreshToken, boolean status) {
}
