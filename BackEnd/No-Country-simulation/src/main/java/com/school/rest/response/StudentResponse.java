package com.school.rest.response;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;

@JsonPropertyOrder({"dni", "firstName", "lastName", "year", "session", "parentName", "parentLastName"})
public record StudentResponse(String dni, String firstName, String lastName, String year, String session, String parentName, String parentLastName) {
}
