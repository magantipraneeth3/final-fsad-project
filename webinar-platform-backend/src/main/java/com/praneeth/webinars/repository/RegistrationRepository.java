package com.praneeth.webinars.repository;

import com.praneeth.webinars.entity.Registration;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RegistrationRepository extends JpaRepository<Registration, Long> {
    boolean existsByUserIdAndWebinarId(Long userId, Long webinarId);

    Optional<Registration> findByIdAndUserId(Long id, Long userId);

    Optional<Registration> findByUserIdAndWebinarId(Long userId, Long webinarId);

    @EntityGraph(attributePaths = {"user", "webinar"})
    List<Registration> findByUserIdOrderByWebinarWebinarDateAscWebinarWebinarTimeAsc(Long userId);

    @Override
    @EntityGraph(attributePaths = {"user", "webinar"})
    List<Registration> findAll();

    long countByWebinarId(Long webinarId);
}
