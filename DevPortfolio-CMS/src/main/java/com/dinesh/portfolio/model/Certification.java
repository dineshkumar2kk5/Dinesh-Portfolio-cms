package com.dinesh.portfolio.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

/**
 * MongoDB document representing a professional certification or credential.
 */
@Document(collection = "certifications")
public class Certification {

    @Id
    private String id;
    private String name;
    private String issuer;
    private String year;
    private String credentialId;
    private String issueDate;
    private String verificationUrl;
    private String certificateImage;
    private int displayOrder = 1;
    private LocalDateTime createdAt = LocalDateTime.now();
    private LocalDateTime updatedAt = LocalDateTime.now();

    public Certification() {}

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getIssuer() { return issuer; }
    public void setIssuer(String issuer) { this.issuer = issuer; }

    public String getYear() { return year; }
    public void setYear(String year) { this.year = year; }

    public String getCredentialId() { return credentialId; }
    public void setCredentialId(String credentialId) { this.credentialId = credentialId; }

    public String getIssueDate() { return issueDate; }
    public void setIssueDate(String issueDate) { this.issueDate = issueDate; }

    public String getVerificationUrl() { return verificationUrl; }
    public void setVerificationUrl(String verificationUrl) { this.verificationUrl = verificationUrl; }

    public String getCertificateImage() { return certificateImage; }
    public void setCertificateImage(String certificateImage) { this.certificateImage = certificateImage; }

    public int getDisplayOrder() { return displayOrder; }
    public void setDisplayOrder(int displayOrder) { this.displayOrder = displayOrder; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}
