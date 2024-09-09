package com.school.rest.request;

import jakarta.validation.constraints.NotBlank;

public record ChildDniRequest(
        @NotBlank(message = "DNI cannot be empty")
        String childDNI) {
}
