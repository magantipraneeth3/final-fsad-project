package com.praneeth.webinars.service;

import com.praneeth.webinars.dto.DashboardResponse;
import com.praneeth.webinars.dto.RegistrationResponse;
import com.praneeth.webinars.dto.ResourceResponse;
import com.praneeth.webinars.dto.WebinarResponse;
import com.praneeth.webinars.entity.User;
import com.praneeth.webinars.repository.RegistrationRepository;
import com.praneeth.webinars.repository.ResourceRepository;
import com.praneeth.webinars.repository.WebinarRepository;
import java.util.HashMap;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DashboardService {

    private final WebinarRepository webinarRepository;
    private final RegistrationRepository registrationRepository;
    private final ResourceRepository resourceRepository;
    private final RegistrationService registrationService;
    private final ResourceService resourceService;
    private final WebinarService webinarService;

    public DashboardResponse getAdminDashboard() {
        HashMap<String, Object> summary = new HashMap<>();
        summary.put("activeWebinars", webinarRepository.count());
        summary.put("totalRegistrations", registrationRepository.count());
        summary.put("resourceCount", resourceRepository.count());

        List<WebinarResponse> recentWebinars = webinarService.getAllWebinars().stream().limit(5).toList();
        return new DashboardResponse(true, summary, registrationService.getAllRegistrations(), null, recentWebinars);
    }

    public DashboardResponse getUserDashboard(User user) {
        HashMap<String, Object> summary = new HashMap<>();
        List<RegistrationResponse> registrations = registrationService.getMyRegistrations(user);
        List<ResourceResponse> resources = registrations.stream()
            .flatMap(item -> resourceService.getByWebinar(item.webinar_id()).stream())
            .distinct()
            .toList();
        summary.put("registrationCount", registrations.size());
        summary.put("resourceCount", resources.size());
        return new DashboardResponse(true, summary, registrations, resources, null);
    }
}
