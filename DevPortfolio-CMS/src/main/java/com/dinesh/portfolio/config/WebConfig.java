package com.dinesh.portfolio.config;

import com.dinesh.portfolio.service.FileStorageService;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * Web MVC configuration.
 * Maps the /uploads/ URL path to the physical upload directory
 * so uploaded images can be served as static resources.
 */
@Configuration
public class WebConfig implements WebMvcConfigurer {

    private final FileStorageService fileStorageService;

    public WebConfig(FileStorageService fileStorageService) {
        this.fileStorageService = fileStorageService;
    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // Serve uploaded files from the external uploads directory
        String uploadLocation = "file:" + fileStorageService.getUploadPath().toString() + "/";
        registry.addResourceHandler("/uploads/**")
                .addResourceLocations(uploadLocation);
    }

    @Override
    public void addCorsMappings(org.springframework.web.servlet.config.annotation.CorsRegistry registry) {
        registry.addMapping("/api/**")
                .allowedOriginPatterns("*")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true);
        registry.addMapping("/uploads/**")
                .allowedOriginPatterns("*")
                .allowedMethods("GET");
    }
}
