package com.praneeth.webinars.controller;

import com.praneeth.webinars.dto.RegistrationRequest;
import com.praneeth.webinars.entity.User;
import com.praneeth.webinars.service.RegistrationService;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
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
    public ResponseEntity<?> register(@RequestBody RegistrationRequest request, @AuthenticationPrincipal User user) {
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
}
