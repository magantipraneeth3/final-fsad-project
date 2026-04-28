package com.praneeth.webinars.controller;

import com.praneeth.webinars.dto.RegistrationRequest;
import com.praneeth.webinars.dto.RegistrationStatusResponse;
import com.praneeth.webinars.entity.User;
import com.praneeth.webinars.service.RegistrationService;
import jakarta.validation.Valid;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/registrations")
@RequiredArgsConstructor
public class RegistrationController {

    private final RegistrationService registrationService;

    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    public ResponseEntity<?> register(@Valid @RequestBody RegistrationRequest request, @AuthenticationPrincipal User user) {
        registrationService.register(user, request.webinar_id());
        return ResponseEntity.ok(Map.of("success", true, "message", "Registration successful"));
    }

    @GetMapping("/mine")
    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    public ResponseEntity<?> myRegistrations(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(Map.of("success", true, "registrations", registrationService.getMyRegistrations(user)));
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> allRegistrations() {
        return ResponseEntity.ok(Map.of("success", true, "registrations", registrationService.getAllRegistrations()));
    }

    @GetMapping("/status/{webinarId}")
    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    public ResponseEntity<RegistrationStatusResponse> registrationStatus(
        @PathVariable Long webinarId,
        @AuthenticationPrincipal User user
    ) {
        RegistrationStatusResponse status = registrationService.getRegistrationStatus(user, webinarId);
        return ResponseEntity.ok(status);
    }

    @DeleteMapping("/{registrationId}")
    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    public ResponseEntity<?> unregister(@PathVariable Long registrationId, @AuthenticationPrincipal User user) {
        registrationService.unregister(user, registrationId);
        return ResponseEntity.ok(Map.of("success", true, "message", "Registration cancelled successfully"));
    }
}
