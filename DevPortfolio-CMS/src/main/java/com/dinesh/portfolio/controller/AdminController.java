package com.dinesh.portfolio.controller;

import com.dinesh.portfolio.model.BlogPost;
import com.dinesh.portfolio.model.Certification;
import com.dinesh.portfolio.model.Project;
import com.dinesh.portfolio.service.BlogPostService;
import com.dinesh.portfolio.service.CertificationService;
import com.dinesh.portfolio.service.FileStorageService;
import com.dinesh.portfolio.service.ProjectService;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.util.Optional;

import com.dinesh.portfolio.model.Resume;
import com.dinesh.portfolio.service.ResumeService;

/**
 * Admin dashboard controller. All routes under /admin/** require ROLE_ADMIN.
 * Provides full CRUD for Projects, Blog Posts, Certifications, and Resume.
 */
@Controller
@RequestMapping("/admin")
public class AdminController {

    private final ProjectService projectService;
    private final BlogPostService blogPostService;
    private final CertificationService certificationService;
    private final FileStorageService fileStorageService;
    private final ResumeService resumeService;

    public AdminController(ProjectService projectService,
                           BlogPostService blogPostService,
                           CertificationService certificationService,
                           FileStorageService fileStorageService,
                           ResumeService resumeService) {
        this.projectService = projectService;
        this.blogPostService = blogPostService;
        this.certificationService = certificationService;
        this.fileStorageService = fileStorageService;
        this.resumeService = resumeService;
    }

    // ==================== DASHBOARD ====================

    @GetMapping("/dashboard")
    public String dashboard(Model model, Authentication auth) {
        model.addAttribute("projectCount", projectService.count());
        model.addAttribute("blogCount", blogPostService.count());
        model.addAttribute("publishedCount", blogPostService.countPublished());
        model.addAttribute("certCount", certificationService.count());
        model.addAttribute("projects", projectService.findAll());
        model.addAttribute("posts", blogPostService.findAll());
        model.addAttribute("certifications", certificationService.findAll());
        model.addAttribute("currentUser", auth.getName());
        model.addAttribute("pageTitle", "Admin Dashboard — DevPortfolio CMS");
        return "admin/dashboard";
    }

    // ==================== PROJECT CRUD ====================

    @GetMapping("/projects")
    public String listProjects(Model model) {
        model.addAttribute("projects", projectService.findAll());
        model.addAttribute("pageTitle", "Manage Projects — Admin");
        return "admin/projects/list";
    }

    @GetMapping("/projects/new")
    public String newProjectForm(Model model) {
        model.addAttribute("project", new Project());
        model.addAttribute("pageTitle", "Add New Project — Admin");
        model.addAttribute("formAction", "/admin/projects/save");
        return "admin/projects/form";
    }

    @GetMapping("/projects/edit/{id}")
    public String editProjectForm(@PathVariable String id, Model model) {
        Optional<Project> project = projectService.findById(id);
        if (project.isEmpty()) {
            return "redirect:/admin/projects";
        }
        model.addAttribute("project", project.get());
        model.addAttribute("pageTitle", "Edit Project — Admin");
        model.addAttribute("formAction", "/admin/projects/save");
        return "admin/projects/form";
    }

    @PostMapping("/projects/save")
    public String saveProject(@ModelAttribute Project project,
                              @RequestParam(value = "imageFile", required = false) MultipartFile imageFile,
                              @RequestParam(value = "techTagsInput", required = false) String techTagsInput,
                              @RequestParam(value = "resultsInput", required = false) String resultsInput,
                              RedirectAttributes redirectAttributes) {
        try {
            // Handle tech tags
            if (techTagsInput != null && !techTagsInput.isBlank()) {
                project.setTechTagsString(techTagsInput);
            }

            // Handle results
            if (resultsInput != null && !resultsInput.isBlank()) {
                project.setResultsString(resultsInput);
            }

            // Handle image upload
            if (imageFile != null && !imageFile.isEmpty()) {
                String imageUrl = fileStorageService.storeFile(imageFile);
                project.setImageUrl(imageUrl);
            }

            projectService.save(project);
            redirectAttributes.addFlashAttribute("successMessage", "Project saved successfully!");
        } catch (Exception e) {
            redirectAttributes.addFlashAttribute("errorMessage", "Error saving project: " + e.getMessage());
        }
        return "redirect:/admin/projects";
    }

    @PostMapping("/projects/delete/{id}")
    public String deleteProject(@PathVariable String id, RedirectAttributes redirectAttributes) {
        Optional<Project> project = projectService.findById(id);
        if (project.isPresent() && project.get().getImageUrl() != null) {
            fileStorageService.deleteFile(project.get().getImageUrl());
        }
        projectService.deleteById(id);
        redirectAttributes.addFlashAttribute("successMessage", "Project deleted successfully.");
        return "redirect:/admin/projects";
    }

    // ==================== BLOG POST CRUD ====================

    @GetMapping("/blog")
    public String listBlogPosts(Model model) {
        model.addAttribute("posts", blogPostService.findAll());
        model.addAttribute("pageTitle", "Manage Blog — Admin");
        return "admin/blog/list";
    }

    @GetMapping("/blog/new")
    public String newBlogPostForm(Model model) {
        model.addAttribute("post", new BlogPost());
        model.addAttribute("pageTitle", "New Blog Post — Admin");
        model.addAttribute("formAction", "/admin/blog/save");
        return "admin/blog/form";
    }

    @GetMapping("/blog/edit/{id}")
    public String editBlogPostForm(@PathVariable String id, Model model) {
        Optional<BlogPost> post = blogPostService.findById(id);
        if (post.isEmpty()) {
            return "redirect:/admin/blog";
        }
        model.addAttribute("post", post.get());
        model.addAttribute("pageTitle", "Edit Blog Post — Admin");
        model.addAttribute("formAction", "/admin/blog/save");
        return "admin/blog/form";
    }

    @PostMapping("/blog/save")
    public String saveBlogPost(@ModelAttribute BlogPost post,
                               @RequestParam(value = "coverFile", required = false) MultipartFile coverFile,
                               @RequestParam(value = "tagsInput", required = false) String tagsInput,
                               Authentication auth,
                               RedirectAttributes redirectAttributes) {
        try {
            // Handle tags
            if (tagsInput != null && !tagsInput.isBlank()) {
                post.setTagsString(tagsInput);
            }

            // Handle cover image upload
            if (coverFile != null && !coverFile.isEmpty()) {
                String coverUrl = fileStorageService.storeFile(coverFile);
                post.setCoverImageUrl(coverUrl);
            }

            // Set author info
            if (post.getAuthorName() == null || post.getAuthorName().isBlank()) {
                post.setAuthorName(auth.getName());
            }

            blogPostService.save(post);
            redirectAttributes.addFlashAttribute("successMessage", "Blog post saved successfully!");
        } catch (Exception e) {
            redirectAttributes.addFlashAttribute("errorMessage", "Error saving post: " + e.getMessage());
        }
        return "redirect:/admin/blog";
    }

    @PostMapping("/blog/delete/{id}")
    public String deleteBlogPost(@PathVariable String id, RedirectAttributes redirectAttributes) {
        Optional<BlogPost> post = blogPostService.findById(id);
        if (post.isPresent() && post.get().getCoverImageUrl() != null) {
            fileStorageService.deleteFile(post.get().getCoverImageUrl());
        }
        blogPostService.deleteById(id);
        redirectAttributes.addFlashAttribute("successMessage", "Blog post deleted successfully.");
        return "redirect:/admin/blog";
    }

    // ==================== CERTIFICATION CRUD ====================

    @GetMapping("/certifications")
    public String listCertifications(Model model) {
        model.addAttribute("certifications", certificationService.findAll());
        model.addAttribute("pageTitle", "Manage Certifications — Admin");
        return "admin/certifications/list";
    }

    @GetMapping("/certifications/new")
    public String newCertificationForm(Model model) {
        model.addAttribute("certification", new Certification());
        model.addAttribute("pageTitle", "Add New Certification — Admin");
        model.addAttribute("formAction", "/admin/certifications/save");
        return "admin/certifications/form";
    }

    @GetMapping("/certifications/edit/{id}")
    public String editCertificationForm(@PathVariable String id, Model model) {
        Optional<Certification> cert = certificationService.findById(id);
        if (cert.isEmpty()) {
            return "redirect:/admin/certifications";
        }
        model.addAttribute("certification", cert.get());
        model.addAttribute("pageTitle", "Edit Certification — Admin");
        model.addAttribute("formAction", "/admin/certifications/save");
        return "admin/certifications/form";
    }

    @PostMapping("/certifications/save")
    public String saveCertification(@ModelAttribute Certification cert,
                                    @RequestParam(value = "certFile", required = false) MultipartFile certFile,
                                    RedirectAttributes redirectAttributes) {
        try {
            if (certFile != null && !certFile.isEmpty()) {
                String certUrl = fileStorageService.storeFile(certFile);
                cert.setCertificateImage(certUrl);
            }
            certificationService.save(cert);
            redirectAttributes.addFlashAttribute("successMessage", "Certification saved successfully!");
        } catch (Exception e) {
            redirectAttributes.addFlashAttribute("errorMessage", "Error saving certification: " + e.getMessage());
        }
        return "redirect:/admin/certifications";
    }

    @PostMapping("/certifications/delete/{id}")
    public String deleteCertification(@PathVariable String id, RedirectAttributes redirectAttributes) {
        Optional<Certification> cert = certificationService.findById(id);
        if (cert.isPresent() && cert.get().getCertificateImage() != null) {
            fileStorageService.deleteFile(cert.get().getCertificateImage());
        }
        certificationService.deleteById(id);
        redirectAttributes.addFlashAttribute("successMessage", "Certification deleted successfully.");
        return "redirect:/admin/certifications";
    }

    // ==================== RESUME MANAGEMENT ====================

    @GetMapping("/resume")
    public String resumePage(Model model) {
        Optional<Resume> resume = resumeService.getLatestResume();
        model.addAttribute("currentResume", resume.orElse(null));
        model.addAttribute("pageTitle", "Manage Resume — Admin");
        return "admin/resume";
    }

    @PostMapping("/resume/upload")
    public String uploadResume(@RequestParam("resumeFile") MultipartFile resumeFile,
                               RedirectAttributes redirectAttributes) {
        if (resumeFile == null || resumeFile.isEmpty()) {
            redirectAttributes.addFlashAttribute("errorMessage", "Please select a PDF or Document file to upload.");
            return "redirect:/admin/resume";
        }
        try {
            Resume uploaded = resumeService.uploadResume(resumeFile);
            redirectAttributes.addFlashAttribute("successMessage", "Resume uploaded successfully: " + uploaded.getFileName());
        } catch (Exception e) {
            redirectAttributes.addFlashAttribute("errorMessage", "Error uploading resume: " + e.getMessage());
        }
        return "redirect:/admin/resume";
    }

    @PostMapping("/resume/link")
    public String saveDriveLink(@RequestParam("driveUrl") String driveUrl,
                                RedirectAttributes redirectAttributes) {
        if (driveUrl == null || driveUrl.isBlank()) {
            redirectAttributes.addFlashAttribute("errorMessage", "Please enter a valid Google Drive or external URL.");
            return "redirect:/admin/resume";
        }
        try {
            resumeService.saveDriveLink(driveUrl.trim());
            redirectAttributes.addFlashAttribute("successMessage", "Google Drive Resume link saved successfully!");
        } catch (Exception e) {
            redirectAttributes.addFlashAttribute("errorMessage", "Error saving Drive link: " + e.getMessage());
        }
        return "redirect:/admin/resume";
    }
}
