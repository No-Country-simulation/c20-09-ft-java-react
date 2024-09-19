package com.school.rest.response;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;

@JsonPropertyOrder({"message", "success"})
public record DeleteResponse(String message, boolean success) {
}
