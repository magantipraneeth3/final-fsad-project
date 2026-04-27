package com.praneeth.webinars.controller;

import com.praneeth.webinars.entity.User;
import com.praneeth.webinars.service.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/dashboard")
@RequiredArgsConstructor
public class DashboardController {

    private final DashboardService dashboardService;

    @GetMapping("/admin")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> adminDashboard() {
        return ResponseEntity.ok(dashboardService.getAdminDashboard());
    }

    @GetMapping("/user")
    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    public ResponseEntity<?> userDashboard(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(dashboardService.getUserDashboard(user));
    }
}
