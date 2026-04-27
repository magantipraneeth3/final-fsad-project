package com.praneeth.webinars.repository;

import com.praneeth.webinars.entity.Resource;
import java.util.List;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ResourceRepository extends JpaRepository<Resource, Long> {
    @EntityGraph(attributePaths = {"webinar", "uploadedBy"})
    List<Resource> findByWebinarIdOrderByCreatedAtDesc(Long webinarId);
}
