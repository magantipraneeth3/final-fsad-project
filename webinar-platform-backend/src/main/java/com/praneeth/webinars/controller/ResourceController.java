package com.praneeth.webinars.controller;

import com.praneeth.webinars.dto.ResourceRequest;
import com.praneeth.webinars.entity.User;
import com.praneeth.webinars.service.ResourceService;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/resources")
@RequiredArgsConstructor
public class ResourceController {

    private final ResourceService resourceService;

    @GetMapping("/webinar/{webinarId}")
    public ResponseEntity<?> getByWebinar(@PathVariable Long webinarId) {
        return ResponseEntity.ok(Map.of("success", true, "resources", resourceService.getByWebinar(webinarId)));
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> create(@RequestBody ResourceRequest request, @AuthenticationPrincipal User user) {
        return ResponseEntity.ok(Map.of(
            "success", true,
            "resource", resourceService.createResource(
                request.webinar_id(),
                request.title(),
                request.resource_type(),
                request.external_url(),
                user
            )
        ));
    }
}
