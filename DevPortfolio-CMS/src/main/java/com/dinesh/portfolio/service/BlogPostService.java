package com.dinesh.portfolio.service;

import com.dinesh.portfolio.model.BlogPost;
import com.dinesh.portfolio.repository.BlogPostRepository;
import org.commonmark.node.Node;
import org.commonmark.parser.Parser;
import org.commonmark.renderer.html.HtmlRenderer;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

/**
 * Service layer for BlogPost CRUD operations.
 * Handles Markdown-to-HTML conversion, slug generation,
 * and published/draft filtering.
 */
@Service
public class BlogPostService {

    private final BlogPostRepository blogPostRepository;
    private final Parser markdownParser;
    private final HtmlRenderer htmlRenderer;

    public BlogPostService(BlogPostRepository blogPostRepository) {
        this.blogPostRepository = blogPostRepository;
        this.markdownParser = Parser.builder().build();
        this.htmlRenderer = HtmlRenderer.builder().build();
    }

    /** Returns only published posts, newest first (for public blog page). */
    public List<BlogPost> findPublished() {
        return blogPostRepository.findByPublishedTrueOrderByCreatedAtDesc();
    }

    /** Returns all posts including drafts (for admin panel). */
    public List<BlogPost> findAll() {
        return blogPostRepository.findAllByOrderByCreatedAtDesc();
    }

    public Optional<BlogPost> findById(String id) {
        return blogPostRepository.findById(id);
    }

    public Optional<BlogPost> findBySlug(String slug) {
        return blogPostRepository.findBySlug(slug);
    }

    /**
     * Saves a blog post, auto-generating the HTML from Markdown
     * and creating a URL-friendly slug from the title.
     */
    public BlogPost save(BlogPost post) {
        // Generate slug from title
        if (post.getSlug() == null || post.getSlug().isBlank()) {
            post.setSlug(generateSlug(post.getTitle()));
        }

        // Convert Markdown to HTML
        if (post.getContentMarkdown() != null && !post.getContentMarkdown().isBlank()) {
            Node document = markdownParser.parse(post.getContentMarkdown());
            post.setContentHtml(htmlRenderer.render(document));
        }

        // Auto-generate excerpt if not provided
        if ((post.getExcerpt() == null || post.getExcerpt().isBlank())
                && post.getContentMarkdown() != null) {
            String plain = post.getContentMarkdown()
                    .replaceAll("#", "")
                    .replaceAll("\\*", "")
                    .replaceAll("`", "")
                    .trim();
            post.setExcerpt(plain.length() > 200 ? plain.substring(0, 200) + "..." : plain);
        }

        post.setUpdatedAt(LocalDateTime.now());
        if (post.getCreatedAt() == null) {
            post.setCreatedAt(LocalDateTime.now());
        }

        return blogPostRepository.save(post);
    }

    public void deleteById(String id) {
        blogPostRepository.deleteById(id);
    }

    public long count() {
        return blogPostRepository.count();
    }

    public long countPublished() {
        return blogPostRepository.findByPublishedTrueOrderByCreatedAtDesc().size();
    }

    /** Generates a URL-friendly slug from a title. */
    private String generateSlug(String title) {
        if (title == null) return "untitled";
        String slug = title.toLowerCase()
                .replaceAll("[^a-z0-9\\s-]", "")
                .replaceAll("\\s+", "-")
                .replaceAll("-+", "-")
                .replaceAll("^-|-$", "");

        // Ensure uniqueness
        String baseSlug = slug;
        int counter = 1;
        while (blogPostRepository.existsBySlug(slug)) {
            slug = baseSlug + "-" + counter++;
        }
        return slug;
    }
}
