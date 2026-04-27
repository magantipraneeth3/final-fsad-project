package com.praneeth.webinars.dto;

import com.praneeth.webinars.entity.Registration;
import java.time.LocalDateTime;

public record RegistrationResponse(
    Long id,
    Long webinar_id,
    Long user_id,
    String user_name,
    String email,
    String title,
    String speaker,
    String webinar_title,
    String webinar_date,
    String webinar_time,
    String status,
    LocalDateTime created_at
) {
    public static RegistrationResponse from(Registration registration) {
        return new RegistrationResponse(
            registration.getId(),
            registration.getWebinar().getId(),
            registration.getUser().getId(),
            registration.getUser().getName(),
            registration.getUser().getEmail(),
            registration.getWebinar().getTitle(),
            registration.getWebinar().getSpeaker(),
            registration.getWebinar().getTitle(),
            registration.getWebinar().getWebinarDate().toString(),
            registration.getWebinar().getWebinarTime().toString(),
            registration.getWebinar().getStatus(),
            registration.getCreatedAt()
        );
    }
}
