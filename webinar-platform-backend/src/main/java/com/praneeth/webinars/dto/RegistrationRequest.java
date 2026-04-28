package com.praneeth.webinars.dto;

import jakarta.validation.constraints.NotNull;

public record RegistrationRequest(@NotNull Long webinar_id) {
}
