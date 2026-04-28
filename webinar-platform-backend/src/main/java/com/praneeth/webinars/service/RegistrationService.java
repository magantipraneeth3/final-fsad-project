package com.praneeth.webinars.service;

import com.praneeth.webinars.dto.RegistrationResponse;
import com.praneeth.webinars.dto.RegistrationStatusResponse;
import com.praneeth.webinars.entity.Registration;
import com.praneeth.webinars.entity.User;
import com.praneeth.webinars.entity.Webinar;
import com.praneeth.webinars.exception.ApiException;
import com.praneeth.webinars.repository.RegistrationRepository;
import com.praneeth.webinars.repository.WebinarRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RegistrationService {

    private final RegistrationRepository registrationRepository;
    private final WebinarRepository webinarRepository;

    public void register(User user, Long webinarId) {
        Webinar webinar = webinarRepository.findById(webinarId)
            .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "Webinar not found"));

        if (registrationRepository.existsByUserIdAndWebinarId(user.getId(), webinarId)) {
            throw new ApiException(HttpStatus.CONFLICT, "You are already registered for this webinar");
        }

        Registration registration = new Registration();
        registration.setUser(user);
        registration.setWebinar(webinar);
        registrationRepository.save(registration);
    }

    public void unregister(User user, Long registrationId) {
        Registration registration = registrationRepository.findByIdAndUserId(registrationId, user.getId())
            .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "Registration not found"));

        registrationRepository.delete(registration);
    }

    public RegistrationStatusResponse getRegistrationStatus(User user, Long webinarId) {
        return registrationRepository.findByUserIdAndWebinarId(user.getId(), webinarId)
            .map((registration) -> new RegistrationStatusResponse(true, registration.getId()))
            .orElseGet(() -> new RegistrationStatusResponse(false, null));
    }

    public List<RegistrationResponse> getMyRegistrations(User user) {
        return registrationRepository.findByUserIdOrderByWebinarWebinarDateAscWebinarWebinarTimeAsc(user.getId()).stream()
            .map(RegistrationResponse::from)
            .toList();
    }

    public List<RegistrationResponse> getAllRegistrations() {
        return registrationRepository.findAll().stream()
            .map(RegistrationResponse::from)
            .toList();
    }
}
