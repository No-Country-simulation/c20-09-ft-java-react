package com.school.rest.response;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;

@JsonPropertyOrder({"name", "mensaje", "token", "refreshToken", "status"})
public record LoginAuthResponse (String name, String mensaje, String token,  String refreshToken, boolean status) {
}
