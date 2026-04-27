package com.praneeth.webinars.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.praneeth.webinars.entity.Webinar;
import java.util.List;

@JsonInclude(JsonInclude.Include.NON_NULL)
public record WebinarResponse(
    Long id,
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
    String recording_url,
    long attendees,
    List<ResourceResponse> resources
) {
    public static WebinarResponse from(Webinar webinar, long attendees, List<ResourceResponse> resources) {
        return new WebinarResponse(
            webinar.getId(),
            webinar.getTitle(),
            webinar.getDescription(),
            webinar.getSpeaker(),
            webinar.getCategory(),
            webinar.getWebinarDate() == null ? null : webinar.getWebinarDate().toString(),
            webinar.getWebinarTime() == null ? null : webinar.getWebinarTime().toString(),
            webinar.getDuration(),
            webinar.getStatus(),
            webinar.getImageUrl(),
            webinar.getLiveUrl(),
            webinar.getRecordingUrl(),
            attendees,
            resources
        );
    }

    public static WebinarResponse from(Webinar webinar, long attendees) {
        return from(webinar, attendees, null);
    }
}
