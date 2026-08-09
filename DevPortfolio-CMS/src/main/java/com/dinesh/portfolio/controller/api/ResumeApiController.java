package com.dinesh.portfolio.controller.api;

import com.dinesh.portfolio.model.Resume;
import com.dinesh.portfolio.service.ResumeService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/resume")
@CrossOrigin(originPatterns = "*")
public class ResumeApiController {

    private final ResumeService resumeService;

    public ResumeApiController(ResumeService resumeService) {
        this.resumeService = resumeService;
    }

    @GetMapping
    public ResponseEntity<Map<String, String>> getLatestResume() {
        Optional<Resume> resumeOpt = resumeService.getLatestResume();
        Map<String, String> response = new HashMap<>();

        if (resumeOpt.isPresent()) {
            Resume resume = resumeOpt.get();
            response.put("fileName", resume.getFileName());
            response.put("fileUrl", resume.getFileUrl());
            response.put("uploadedAt", resume.getUploadedAt().toString());
            return ResponseEntity.ok(response);
        } else {
            response.put("fileUrl", "");
            response.put("fileName", "");
            return ResponseEntity.ok(response);
        }
    }
}
