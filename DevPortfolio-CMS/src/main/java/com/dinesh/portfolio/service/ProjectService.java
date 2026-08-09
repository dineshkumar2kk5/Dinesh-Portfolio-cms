package com.dinesh.portfolio.service;

import com.dinesh.portfolio.model.Project;
import com.dinesh.portfolio.repository.ProjectRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

/**
 * Service layer for Project CRUD operations.
 * Handles ordering, timestamps, and business logic.
 */
@Service
public class ProjectService {

    private final ProjectRepository projectRepository;

    public ProjectService(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    public List<Project> findAll() {
        return projectRepository.findAllByOrderByDisplayOrderAsc();
    }

    public Optional<Project> findById(String id) {
        return projectRepository.findById(id);
    }

    public Project save(Project project) {
        project.setUpdatedAt(LocalDateTime.now());
        if (project.getCreatedAt() == null) {
            project.setCreatedAt(LocalDateTime.now());
        }
        return projectRepository.save(project);
    }

    public void deleteById(String id) {
        projectRepository.deleteById(id);
    }

    public long count() {
        return projectRepository.count();
    }

    public List<Project> search(String keyword) {
        return projectRepository.findByTitleContainingIgnoreCase(keyword);
    }
}
