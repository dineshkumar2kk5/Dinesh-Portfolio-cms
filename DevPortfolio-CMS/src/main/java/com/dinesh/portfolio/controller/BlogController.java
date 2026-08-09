package com.dinesh.portfolio.controller;

import com.dinesh.portfolio.model.BlogPost;
import com.dinesh.portfolio.service.BlogPostService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;
import java.util.Optional;

/**
 * Handles public-facing blog pages.
 * Only shows published posts to visitors.
 */
@Controller
@RequestMapping("/blog")
public class BlogController {

    private final BlogPostService blogPostService;

    public BlogController(BlogPostService blogPostService) {
        this.blogPostService = blogPostService;
    }

    @GetMapping
    public String blogList() {
        return "redirect:/admin/blog";
    }

    @GetMapping("/{slug}")
    public String blogPost() {
        return "redirect:/admin/blog";
    }
}
