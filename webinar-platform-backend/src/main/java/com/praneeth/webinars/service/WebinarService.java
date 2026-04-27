package com.praneeth.webinars.service;

import com.praneeth.webinars.dto.ResourceResponse;
import com.praneeth.webinars.dto.WebinarRequest;
import com.praneeth.webinars.dto.WebinarResponse;
import com.praneeth.webinars.entity.User;
import com.praneeth.webinars.entity.Webinar;
import com.praneeth.webinars.exception.ApiException;
import com.praneeth.webinars.repository.RegistrationRepository;
import com.praneeth.webinars.repository.ResourceRepository;
import com.praneeth.webinars.repository.WebinarRepository;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class WebinarService {

    private final WebinarRepository webinarRepository;
    private final RegistrationRepository registrationRepository;
    private final ResourceRepository resourceRepository;

    public List<WebinarResponse> getAllWebinars() {
        return webinarRepository.findAll().stream()
            .map(webinar -> WebinarResponse.from(webinar, registrationRepository.countByWebinarId(webinar.getId())))
            .toList();
    }

    public WebinarResponse getWebinarById(Long id) {
        Webinar webinar = webinarRepository.findById(id)
            .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "Webinar not found"));

        List<ResourceResponse> resources = resourceRepository.findByWebinarIdOrderByCreatedAtDesc(id).stream()
            .map(ResourceResponse::from)
            .toList();

        return WebinarResponse.from(webinar, registrationRepository.countByWebinarId(id), resources);
    }

    public WebinarResponse createWebinar(WebinarRequest request, User currentUser) {
        Webinar webinar = new Webinar();
        applyRequest(webinar, request);
        webinar.setCreatedBy(currentUser);
        return WebinarResponse.from(webinarRepository.save(webinar), 0L);
    }

    public WebinarResponse updateWebinar(Long id, WebinarRequest request) {
        Webinar webinar = webinarRepository.findById(id)
            .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "Webinar not found"));

        applyRequest(webinar, request);
        return WebinarResponse.from(webinarRepository.save(webinar), registrationRepository.countByWebinarId(id));
    }

    public void deleteWebinar(Long id) {
        Webinar webinar = webinarRepository.findById(id)
            .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "Webinar not found"));
        webinarRepository.delete(webinar);
    }

    private void applyRequest(Webinar webinar, WebinarRequest request) {
        webinar.setTitle(request.title());
        webinar.setDescription(request.description());
        webinar.setSpeaker(request.speaker());
        webinar.setCategory(request.category());
        webinar.setWebinarDate(LocalDate.parse(request.webinar_date()));
        webinar.setWebinarTime(LocalTime.parse(request.webinar_time()));
        webinar.setDuration(request.duration() == null ? "60 mins" : request.duration());
        webinar.setStatus(request.status() == null ? "UPCOMING" : request.status());
        webinar.setImageUrl(request.image_url());
        webinar.setLiveUrl(request.live_url());
        webinar.setRecordingUrl(request.recording_url());
    }
}
