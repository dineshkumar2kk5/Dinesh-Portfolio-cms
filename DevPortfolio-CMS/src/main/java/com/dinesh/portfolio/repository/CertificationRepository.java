package com.dinesh.portfolio.repository;

import com.dinesh.portfolio.model.Certification;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CertificationRepository extends MongoRepository<Certification, String> {

    List<Certification> findAllByOrderByDisplayOrderAsc();

    List<Certification> findByNameContainingIgnoreCase(String keyword);
}
