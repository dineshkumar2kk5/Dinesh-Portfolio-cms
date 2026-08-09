package com.dinesh.portfolio.service;

import com.dinesh.portfolio.model.Certification;
import com.dinesh.portfolio.repository.CertificationRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class CertificationService {

    private final CertificationRepository repository;

    public CertificationService(CertificationRepository repository) {
        this.repository = repository;
    }

    public List<Certification> findAll() {
        return repository.findAllByOrderByDisplayOrderAsc();
    }

    public Optional<Certification> findById(String id) {
        return repository.findById(id);
    }

    public Certification save(Certification cert) {
        cert.setUpdatedAt(LocalDateTime.now());
        if (cert.getCreatedAt() == null) {
            cert.setCreatedAt(LocalDateTime.now());
        }
        return repository.save(cert);
    }

    public void deleteById(String id) {
        repository.deleteById(id);
    }

    public long count() {
        return repository.count();
    }
}
