package com.school.rest.response;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;

@JsonPropertyOrder({"dni", "firstName", "lastName"})
public record StudentResponse(String dni, String firstName, String lastName) {
}
