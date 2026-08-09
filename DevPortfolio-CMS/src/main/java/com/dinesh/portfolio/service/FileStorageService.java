package com.dinesh.portfolio.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.*;
import java.util.Set;
import java.util.UUID;

/**
 * Handles multipart file uploads for project images and blog covers.
 * Stores files in a configurable local directory and returns
 * the relative URL path for serving via Spring's static resources.
 */
@Service
public class FileStorageService {

    private final Path uploadPath;

    private static final Set<String> ALLOWED_TYPES = Set.of(
            "image/jpeg", "image/png", "image/gif", "image/webp", "image/svg+xml"
    );

    public FileStorageService(@Value("${app.upload.dir:uploads}") String uploadDir) {
        this.uploadPath = Paths.get(uploadDir).toAbsolutePath().normalize();
        try {
            Files.createDirectories(this.uploadPath);
        } catch (IOException e) {
            throw new RuntimeException("Could not create upload directory: " + uploadDir, e);
        }
    }

    /**
     * Stores the uploaded file and returns its accessible URL path.
     *
     * @param file the multipart file from the form
     * @return relative URL path like "/uploads/abc123-image.png"
     */
    public String storeFile(MultipartFile file) {
        if (file == null || file.isEmpty()) {
            return null;
        }

        // Validate file type
        String contentType = file.getContentType();
        if (contentType == null || !ALLOWED_TYPES.contains(contentType)) {
            throw new RuntimeException("Invalid file type. Allowed: JPEG, PNG, GIF, WebP, SVG");
        }

        // Generate unique filename
        String originalName = file.getOriginalFilename();
        String extension = "";
        if (originalName != null && originalName.contains(".")) {
            extension = originalName.substring(originalName.lastIndexOf("."));
        }
        String uniqueName = UUID.randomUUID().toString().substring(0, 12) + extension;

        try {
            Path targetLocation = this.uploadPath.resolve(uniqueName);
            Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);
            return "/uploads/" + uniqueName;
        } catch (IOException e) {
            throw new RuntimeException("Failed to store file: " + uniqueName, e);
        }
    }

    /**
     * Deletes a previously uploaded file.
     *
     * @param fileUrl the URL path returned by storeFile()
     */
    public void deleteFile(String fileUrl) {
        if (fileUrl == null || !fileUrl.startsWith("/uploads/")) {
            return;
        }
        String filename = fileUrl.substring("/uploads/".length());
        try {
            Path filePath = this.uploadPath.resolve(filename);
            Files.deleteIfExists(filePath);
        } catch (IOException e) {
            // Log but don't crash — orphaned files are not critical
            System.err.println("Warning: Could not delete file: " + filename);
        }
    }

    public Path getUploadPath() {
        return uploadPath;
    }
}
