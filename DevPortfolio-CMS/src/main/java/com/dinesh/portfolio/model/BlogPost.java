package com.dinesh.portfolio.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

/**
 * MongoDB document representing a blog post.
 * Supports Markdown content that gets converted to HTML on save.
 * Uses slugs for SEO-friendly URLs.
 */
@Document(collection = "blog_posts")
public class BlogPost {

    @Id
    private String id;

    private String title;

    @Indexed(unique = true)
    private String slug;

    private String contentMarkdown;
    private String contentHtml;     // Auto-generated from Markdown
    private String excerpt;
    private String coverImageUrl;
    private List<String> tags = new ArrayList<>();
    private boolean published;
    private String authorId;
    private String authorName;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public BlogPost() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
        this.published = false;
    }

    // --- Getters and Setters ---

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getSlug() { return slug; }
    public void setSlug(String slug) { this.slug = slug; }

    public String getContentMarkdown() { return contentMarkdown; }
    public void setContentMarkdown(String contentMarkdown) { this.contentMarkdown = contentMarkdown; }

    public String getContentHtml() { return contentHtml; }
    public void setContentHtml(String contentHtml) { this.contentHtml = contentHtml; }

    public String getExcerpt() { return excerpt; }
    public void setExcerpt(String excerpt) { this.excerpt = excerpt; }

    public String getCoverImageUrl() { return coverImageUrl; }
    public void setCoverImageUrl(String coverImageUrl) { this.coverImageUrl = coverImageUrl; }

    public List<String> getTags() { return tags; }
    public void setTags(List<String> tags) { this.tags = tags; }

    /** Comma-separated string helper for form binding */
    public String getTagsString() {
        return tags != null ? String.join(", ", tags) : "";
    }
    public void setTagsString(String tagsStr) {
        if (tagsStr != null && !tagsStr.isBlank()) {
            this.tags = List.of(tagsStr.split("\\s*,\\s*"));
        }
    }

    public boolean isPublished() { return published; }
    public void setPublished(boolean published) { this.published = published; }

    public String getAuthorId() { return authorId; }
    public void setAuthorId(String authorId) { this.authorId = authorId; }

    public String getAuthorName() { return authorName; }
    public void setAuthorName(String authorName) { this.authorName = authorName; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}
