package com.praneeth.webinars.repository;

import com.praneeth.webinars.entity.Webinar;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface WebinarRepository extends JpaRepository<Webinar, Long> {
    @Override
    @EntityGraph(attributePaths = "createdBy")
    List<Webinar> findAll();

    @EntityGraph(attributePaths = "createdBy")
    Optional<Webinar> findWithCreatedByById(Long id);
}
