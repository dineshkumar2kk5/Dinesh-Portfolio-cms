package com.dinesh.portfolio.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "resumes")
public class Resume {

    @Id
    private String id;
    private String fileName;
    private String fileUrl;
    private String fileType;
    private LocalDateTime uploadedAt;

    public Resume() {
        this.uploadedAt = LocalDateTime.now();
    }

    public Resume(String fileName, String fileUrl, String fileType) {
        this.fileName = fileName;
        this.fileUrl = fileUrl;
        this.fileType = fileType;
        this.uploadedAt = LocalDateTime.now();
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public String getFileUrl() {
        return fileUrl;
    }

    public void setFileUrl(String fileUrl) {
        this.fileUrl = fileUrl;
    }

    public String getFileType() {
        return fileType;
    }

    public void setFileType(String fileType) {
        this.fileType = fileType;
    }

    public LocalDateTime getUploadedAt() {
        return uploadedAt;
    }

    public void setUploadedAt(LocalDateTime uploadedAt) {
        this.uploadedAt = uploadedAt;
    }
}
