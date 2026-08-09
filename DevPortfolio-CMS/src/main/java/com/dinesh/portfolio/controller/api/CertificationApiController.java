package com.dinesh.portfolio.controller.api;

import com.dinesh.portfolio.model.Certification;
import com.dinesh.portfolio.service.CertificationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/certifications")
@CrossOrigin(originPatterns = "*")
public class CertificationApiController {

    private final CertificationService certificationService;

    public CertificationApiController(CertificationService certificationService) {
        this.certificationService = certificationService;
    }

    @GetMapping
    public ResponseEntity<List<Certification>> getAllCertifications() {
        return ResponseEntity.ok(certificationService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Certification> getCertificationById(@PathVariable String id) {
        return certificationService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
