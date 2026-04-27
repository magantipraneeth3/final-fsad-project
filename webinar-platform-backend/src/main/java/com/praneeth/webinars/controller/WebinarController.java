package com.praneeth.webinars.controller;

import com.praneeth.webinars.dto.WebinarRequest;
import com.praneeth.webinars.entity.User;
import com.praneeth.webinars.service.WebinarService;
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
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/webinars")
@RequiredArgsConstructor
public class WebinarController {

    private final WebinarService webinarService;

    @GetMapping
    public ResponseEntity<?> getAll() {
        return ResponseEntity.ok(Map.of("success", true, "webinars", webinarService.getAllWebinars()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable Long id) {
        return ResponseEntity.ok(Map.of("success", true, "webinar", webinarService.getWebinarById(id)));
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> create(@Valid @RequestBody WebinarRequest request, @AuthenticationPrincipal User user) {
        return ResponseEntity.ok(Map.of("success", true, "webinar", webinarService.createWebinar(request, user)));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody WebinarRequest request) {
        return ResponseEntity.ok(Map.of("success", true, "webinar", webinarService.updateWebinar(id, request)));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        webinarService.deleteWebinar(id);
        return ResponseEntity.ok(Map.of("success", true, "message", "Webinar deleted successfully"));
    }
}
