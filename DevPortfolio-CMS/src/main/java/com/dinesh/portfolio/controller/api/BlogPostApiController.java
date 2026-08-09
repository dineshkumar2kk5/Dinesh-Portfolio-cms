package com.dinesh.portfolio.controller.api;

import com.dinesh.portfolio.model.BlogPost;
import com.dinesh.portfolio.service.BlogPostService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/blogs")
@CrossOrigin(originPatterns = "*")
public class BlogPostApiController {

    private final BlogPostService blogPostService;

    public BlogPostApiController(BlogPostService blogPostService) {
        this.blogPostService = blogPostService;
    }

    @GetMapping
    public ResponseEntity<List<BlogPost>> getPublishedBlogs() {
        return ResponseEntity.ok(blogPostService.findPublished());
    }

    @GetMapping("/{slug}")
    public ResponseEntity<BlogPost> getBlogBySlug(@PathVariable String slug) {
        return blogPostService.findBySlug(slug)
                .filter(BlogPost::isPublished)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
