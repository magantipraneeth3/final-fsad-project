package com.praneeth.webinars.dto;

public record ResourceRequest(
    Long webinar_id,
    String title,
    String resource_type,
    String external_url
) {
}
