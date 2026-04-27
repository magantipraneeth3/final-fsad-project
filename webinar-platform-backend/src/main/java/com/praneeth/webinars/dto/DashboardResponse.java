package com.praneeth.webinars.dto;

import java.util.List;
import java.util.Map;

public record DashboardResponse(
    boolean success,
    Map<String, Object> summary,
    List<?> registrations,
    List<?> resources,
    List<?> recentWebinars
) {
}
