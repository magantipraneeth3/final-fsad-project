package com.praneeth.webinars.dto;

import com.praneeth.webinars.entity.Resource;
import java.time.LocalDateTime;

public record ResourceResponse(
    Long id,
    String title,
    String resource_type,
    String file_url,
    LocalDateTime created_at
) {
    public static ResourceResponse from(Resource resource) {
        return new ResourceResponse(
            resource.getId(),
            resource.getTitle(),
            resource.getResourceType(),
            resource.getFileUrl(),
            resource.getCreatedAt()
        );
    }
}
