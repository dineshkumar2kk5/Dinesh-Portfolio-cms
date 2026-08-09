package com.dinesh.portfolio.controller;

import com.dinesh.portfolio.model.Project;
import com.dinesh.portfolio.service.ProjectService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;
import java.util.Optional;

/**
 * Handles public-facing portfolio pages.
 * Loads projects dynamically from MongoDB.
 */
@Controller
public class HomeController {

    private final ProjectService projectService;

    public HomeController(ProjectService projectService) {
        this.projectService = projectService;
    }

    @GetMapping("/")
    public String index() {
        return "redirect:/admin/dashboard";
    }

    @GetMapping("/projects/{id}")
    public String projectDetail(@PathVariable String id, Model model) {
        Optional<Project> project = projectService.findById(id);
        if (project.isEmpty()) {
            return "redirect:/";
        }
        model.addAttribute("project", project.get());
        model.addAttribute("pageTitle", project.get().getTitle() + " — Dinesh Kumar");
        return "project-detail";
    }
}
