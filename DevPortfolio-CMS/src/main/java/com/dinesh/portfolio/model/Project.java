package com.dinesh.portfolio.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

/**
 * MongoDB document representing a portfolio project.
 * Stores all project metadata including challenge/solution narrative
 * and image references for the portfolio display.
 */
@Document(collection = "projects")
public class Project {

    @Id
    private String id;

    private String title;
    private String subtitle;
    private String description;
    private List<String> techTags = new ArrayList<>();
    private String challengeText;
    private String solutionText;
    private List<String> results = new ArrayList<>();
    private String role;
    private String timeline;
    private String imageUrl;
    private String githubUrl;
    private String liveUrl;
    private String mockupType;  // laptop, phone, tablet
    private String mockupBg;    // CSS color class
    private int displayOrder;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public Project() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    // --- Getters and Setters ---

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getSubtitle() { return subtitle; }
    public void setSubtitle(String subtitle) { this.subtitle = subtitle; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public List<String> getTechTags() { return techTags; }
    public void setTechTags(List<String> techTags) { this.techTags = techTags; }

    /** Comma-separated string helper for form binding */
    public String getTechTagsString() {
        return techTags != null ? String.join(", ", techTags) : "";
    }
    public void setTechTagsString(String tags) {
        if (tags != null && !tags.isBlank()) {
            this.techTags = List.of(tags.split("\\s*,\\s*"));
        }
    }

    public String getChallengeText() { return challengeText; }
    public void setChallengeText(String challengeText) { this.challengeText = challengeText; }

    public String getSolutionText() { return solutionText; }
    public void setSolutionText(String solutionText) { this.solutionText = solutionText; }

    public List<String> getResults() { return results; }
    public void setResults(List<String> results) { this.results = results; }

    /** Comma-separated string helper for form binding */
    public String getResultsString() {
        return results != null ? String.join("\n", results) : "";
    }
    public void setResultsString(String res) {
        if (res != null && !res.isBlank()) {
            this.results = List.of(res.split("\\n"));
        }
    }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }

    public String getTimeline() { return timeline; }
    public void setTimeline(String timeline) { this.timeline = timeline; }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }

    public String getGithubUrl() { return githubUrl; }
    public void setGithubUrl(String githubUrl) { this.githubUrl = githubUrl; }

    public String getLiveUrl() { return liveUrl; }
    public void setLiveUrl(String liveUrl) { this.liveUrl = liveUrl; }

    public String getMockupType() { return mockupType; }
    public void setMockupType(String mockupType) { this.mockupType = mockupType; }

    public String getMockupBg() { return mockupBg; }
    public void setMockupBg(String mockupBg) { this.mockupBg = mockupBg; }

    public int getDisplayOrder() { return displayOrder; }
    public void setDisplayOrder(int displayOrder) { this.displayOrder = displayOrder; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}
