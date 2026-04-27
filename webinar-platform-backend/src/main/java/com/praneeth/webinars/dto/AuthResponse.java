package com.praneeth.webinars.dto;

public record AuthResponse(
    boolean success,
    String message,
    String token,
    UserResponse user
) {
}
