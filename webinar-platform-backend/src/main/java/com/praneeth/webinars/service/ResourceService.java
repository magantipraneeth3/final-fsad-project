package com.praneeth.webinars.service;

import com.praneeth.webinars.dto.ResourceResponse;
import com.praneeth.webinars.entity.Resource;
import com.praneeth.webinars.entity.User;
import com.praneeth.webinars.entity.Webinar;
import com.praneeth.webinars.exception.ApiException;
import com.praneeth.webinars.repository.ResourceRepository;
import com.praneeth.webinars.repository.WebinarRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ResourceService {

    private final ResourceRepository resourceRepository;
    private final WebinarRepository webinarRepository;

    public ResourceResponse createResource(Long webinarId, String title, String resourceType, String fileUrl, User user) {
        Webinar webinar = webinarRepository.findById(webinarId)
            .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "Webinar not found"));

        Resource resource = new Resource();
        resource.setWebinar(webinar);
        resource.setTitle(title);
        resource.setResourceType(resourceType == null ? "FILE" : resourceType);
        resource.setFileUrl(fileUrl);
        resource.setUploadedBy(user);

        return ResourceResponse.from(resourceRepository.save(resource));
    }

    public List<ResourceResponse> getByWebinar(Long webinarId) {
        return resourceRepository.findByWebinarIdOrderByCreatedAtDesc(webinarId).stream()
            .map(ResourceResponse::from)
            .toList();
    }
}
