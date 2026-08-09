package com.dinesh.portfolio.repository;

import com.dinesh.portfolio.model.Resume;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ResumeRepository extends MongoRepository<Resume, String> {
    Optional<Resume> findFirstByOrderByUploadedAtDesc();
}
