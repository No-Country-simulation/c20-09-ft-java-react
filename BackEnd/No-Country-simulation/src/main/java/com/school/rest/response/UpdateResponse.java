package com.school.rest.response;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;

@JsonPropertyOrder({"message", "status", "entity"})
public record UpdateResponse<T>(String message, boolean status, T entity) {
}
