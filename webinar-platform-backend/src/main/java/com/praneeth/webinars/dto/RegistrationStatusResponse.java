package com.praneeth.webinars.dto;

public record RegistrationStatusResponse(
    boolean isRegistered,
    Long registrationId
) {
}
