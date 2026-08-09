package com.dinesh.portfolio.service;

import com.dinesh.portfolio.model.Resume;
import com.dinesh.portfolio.repository.ResumeRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;

@Service
public class ResumeService {

    private final ResumeRepository resumeRepository;
    private final FileStorageService fileStorageService;

    public ResumeService(ResumeRepository resumeRepository, FileStorageService fileStorageService) {
        this.resumeRepository = resumeRepository;
        this.fileStorageService = fileStorageService;
    }

    public Optional<Resume> getLatestResume() {
        return resumeRepository.findFirstByOrderByUploadedAtDesc();
    }

    public Resume uploadResume(MultipartFile file) throws IOException {
        String fileUrl = fileStorageService.storeFile(file);
        String originalFileName = file.getOriginalFilename() != null ? file.getOriginalFilename() : "Resume.pdf";
        String contentType = file.getContentType() != null ? file.getContentType() : "application/pdf";

        Resume resume = new Resume(originalFileName, fileUrl, contentType);
        return resumeRepository.save(resume);
    }

    public Resume saveDriveLink(String driveUrl) {
        Resume resume = new Resume("Google Drive Resume Link", driveUrl, "drive_link");
        return resumeRepository.save(resume);
    }
}
