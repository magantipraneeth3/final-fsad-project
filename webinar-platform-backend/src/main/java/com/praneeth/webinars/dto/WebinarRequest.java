package com.praneeth.webinars.dto;

public record WebinarRequest(
    String title,
    String description,
    String speaker,
    String category,
    String webinar_date,
    String webinar_time,
    String duration,
    String status,
    String image_url,
    String live_url,
    String recording_url
) {
}
