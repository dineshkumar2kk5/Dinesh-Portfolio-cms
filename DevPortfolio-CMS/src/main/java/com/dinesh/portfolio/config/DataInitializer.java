package com.dinesh.portfolio.config;

import com.dinesh.portfolio.model.BlogPost;
import com.dinesh.portfolio.model.Certification;
import com.dinesh.portfolio.model.Project;
import com.dinesh.portfolio.service.BlogPostService;
import com.dinesh.portfolio.service.CertificationService;
import com.dinesh.portfolio.service.ProjectService;
import com.dinesh.portfolio.service.UserService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * Seeds the database with Dinesh's portfolio data and a default admin account
 * on first application startup (only if the collections are empty).
 */
@Component
public class DataInitializer implements CommandLineRunner {

    private final UserService userService;
    private final ProjectService projectService;
    private final BlogPostService blogPostService;
    private final CertificationService certificationService;

    @Value("${app.admin.username:dinesh}")
    private String adminUsername;

    @Value("${app.admin.password:dinesh09#}")
    private String adminPassword;

    @Value("${app.admin.email:dineshkumar2kk5@gmail.com}")
    private String adminEmail;

    public DataInitializer(UserService userService, ProjectService projectService,
                           BlogPostService blogPostService, CertificationService certificationService) {
        this.userService = userService;
        this.projectService = projectService;
        this.blogPostService = blogPostService;
        this.certificationService = certificationService;
    }

    @Override
    public void run(String... args) {
        // Create default admin if user 'dinesh' does not exist
        if (userService.findByUsername(adminUsername).isEmpty()) {
            userService.createAdmin(adminUsername, adminEmail, adminPassword);
            System.out.println("✔ Default admin created: " + adminUsername + " / " + adminPassword);
        }

        // Seed projects if collection is empty
        if (projectService.count() == 0) {
            seedProjects();
            System.out.println("✔ Seeded " + projectService.count() + " portfolio projects.");
        }

        // Seed a sample blog post if collection is empty
        if (blogPostService.count() == 0) {
            seedBlogPosts();
            System.out.println("✔ Seeded sample blog posts.");
        }

        // Seed certifications if collection is empty
        if (certificationService.count() == 0) {
            seedCertifications();
            System.out.println("✔ Seeded " + certificationService.count() + " certifications.");
        }
    }

    private void seedProjects() {
        Project p1 = new Project();
        p1.setTitle("MedSync Enterprise Backend");
        p1.setSubtitle("Enterprise REST API suite for hospital client systems built with Spring Boot & PostgreSQL.");
        p1.setDescription("A secure, resilient Java backend managing scheduling, medical databases, and JWT authentication protocols. Implemented custom Hibernate queries to accelerate fetch latency.");
        p1.setTechTags(List.of("Java", "Spring Boot", "Spring Data JPA", "PostgreSQL", "JWT Security"));
        p1.setChallengeText("Safely mapping thousands of relational records (doctors, patients, schedules) without running into recursive N+1 lazy database issues.");
        p1.setSolutionText("Configured optimized EntityGraphs and JPQL join-fetches, paired with a Redis query-cache layer to handle heavy repeat lookups.");
        p1.setResults(List.of("Reduced N+1 database queries to absolute zero", "Improved record lookups by 62% in stress testing", "Guarded sensitive fields using Spring Security layers"));
        p1.setRole("Backend Architect & Designer");
        p1.setTimeline("4 Months (2025)");
        p1.setGithubUrl("https://github.com/dineshkumar2kk5/MedSync-Enterprise-Backend");
        p1.setLiveUrl("http://localhost:8080/admin/projects");
        p1.setMockupType("laptop");
        p1.setMockupBg("bg-blue-600");
        p1.setDisplayOrder(1);
        projectService.save(p1);

        Project p2 = new Project();
        p2.setTitle("JVM Metric Dispatcher");
        p2.setSubtitle("Custom telemetry service parsing JVM garbage collection and heap details using Actuator.");
        p2.setDescription("A Java microservice tool utilizing Micrometer and Spring Actuator to capture running memory footprints, garbage collection duration, and processor cores usage.");
        p2.setTechTags(List.of("Java", "Spring Actuator", "Prometheus", "Docker", "REST API"));
        p2.setChallengeText("Extracting telemetry metrics with zero diagnostic latency overhead on the active developer thread pools.");
        p2.setSolutionText("Established a daemon background thread pool utilizing lightweight atomic counters and non-blocking event emissions.");
        p2.setResults(List.of("Exported standardized JSON metrics in <12ms", "Configured Prometheus-friendly scrape alerts for quick diagnosis", "Isolated critical heap leaks during stress runs"));
        p2.setRole("Core Developer");
        p2.setTimeline("3 Months (2025)");
        p2.setGithubUrl("https://github.com/dineshkumar2kk5/JVM-Metric-Dispatcher");
        p2.setLiveUrl("http://localhost:8080/admin/projects");
        p2.setMockupType("phone");
        p2.setMockupBg("bg-amber-600");
        p2.setDisplayOrder(2);
        projectService.save(p2);

        Project p3 = new Project();
        p3.setTitle("J-VCS Version Engine");
        p3.setSubtitle("Standalone version control CLI simulator built entirely on Java NIO and byte buffers.");
        p3.setDescription("A Java application that tracks file changes, creates file diff indexes, stores compression blobs, and manages project staging zones without external dependencies.");
        p3.setTechTags(List.of("Java", "Java NIO", "Concurrency", "SHA-256", "CLI"));
        p3.setChallengeText("Simultaneously parsing high-volume workspace folders and compressing blobs without blocking user command loops.");
        p3.setSolutionText("Leveraged Java Concurrent executor frameworks (Callable pipelines) and customized NIO byte stream buffers for asynchronous disk writing.");
        p3.setResults(List.of("Asynchronous commit indexing completed in sub-30ms", "Zero data collisions during local test merges", "Fully self-contained platform operating on any runtime system"));
        p3.setRole("Java Systems Designer");
        p3.setTimeline("3 Months (2024)");
        p3.setGithubUrl("https://github.com/dineshkumar2kk5/J-VCS-Version-Engine");
        p3.setLiveUrl("http://localhost:8080/admin/projects");
        p3.setMockupType("tablet");
        p3.setMockupBg("bg-emerald-600");
        p3.setDisplayOrder(3);
        projectService.save(p3);

        Project p4 = new Project();
        p4.setTitle("SmartTelemetry Monitor");
        p4.setSubtitle("Interactive telemetry layout analyzing server threads with Spring and React.");
        p4.setDescription("A full-stack diagnostic interface that presents real-time thread pool charts and server health. Pulls data from active Spring Boot actuators using d3.js streams.");
        p4.setTechTags(List.of("Spring Actuator", "React", "d3.js", "WebSockets", "TypeScript"));
        p4.setChallengeText("Graphing live high-frequency JVM thread status maps smoothly in a browser dashboard without memory bloat.");
        p4.setSolutionText("Designed a lightweight WebSocket stream in Java that pumps events directly to a highly optimized React dynamic d3 line canvas.");
        p4.setResults(List.of("Rendered 100Hz thread charts at crisp 60FPS", "Implemented responsive grid panels that adapt per client viewport size", "Added printable snapshots of stack trace dumps"));
        p4.setRole("Full Stack Lead");
        p4.setTimeline("4 Months (2025)");
        p4.setMockupType("laptop");
        p4.setMockupBg("bg-rose-600");
        p4.setDisplayOrder(4);
        projectService.save(p4);

        Project p5 = new Project();
        p5.setTitle("CloudStore Async Processor");
        p5.setSubtitle("Distributed event-driven transaction pipeline built with Spring Boot & Apache Kafka.");
        p5.setDescription("An asynchronous queue worker parsing massive multi-format batch purchase logs with near-zero ledger variance. Secures payment processing steps via transactional isolation levels.");
        p5.setTechTags(List.of("Spring Security", "Apache Kafka", "Docker", "PostgreSQL", "JUnit 5"));
        p5.setChallengeText("Preventing double-writes and race conditions on high-throughput ledger entries during concurrent batch ingest sessions.");
        p5.setSolutionText("Programmed robust idempotent message handlers with distributed locks, leveraging Spring's @Transactional isolation levels.");
        p5.setResults(List.of("Successfully processed 1,500 messages/sec with zero ledger variance", "Constructed mock consumer tests achieving 98.4% assertion coverage", "Deployed container environments via dynamic docker-compose blueprints"));
        p5.setRole("Database & Backend Engineer");
        p5.setTimeline("3 Months (2024)");
        p5.setMockupType("tablet");
        p5.setMockupBg("bg-violet-600");
        p5.setDisplayOrder(5);
        projectService.save(p5);
    }

    private void seedBlogPosts() {
        BlogPost post = new BlogPost();
        post.setTitle("Understanding JVM Memory Management & Garbage Collection");
        post.setAuthorName("Dinesh Kumar");
        post.setPublished(true);
        post.setTags(List.of("Java", "JVM", "Performance", "Backend"));
        post.setContentMarkdown("""
## Introduction

Understanding how the JVM manages memory is crucial for any Java developer who wants to write performant applications. In this post, we'll dive deep into the heap structure, garbage collection algorithms, and practical tuning strategies.

## The JVM Heap Architecture

The JVM divides its heap memory into several regions:

- **Young Generation**: Where new objects are allocated
  - Eden Space
  - Survivor Spaces (S0, S1)
- **Old Generation (Tenured)**: Long-lived objects promoted from Young Gen
- **Metaspace**: Class metadata (replaced PermGen in Java 8+)

```java
// You can inspect heap usage programmatically
Runtime runtime = Runtime.getRuntime();
long totalMemory = runtime.totalMemory();
long freeMemory = runtime.freeMemory();
long usedMemory = totalMemory - freeMemory;

System.out.printf("Heap Usage: %d MB / %d MB%n",
    usedMemory / (1024 * 1024),
    totalMemory / (1024 * 1024));
```

## Garbage Collection Algorithms

### 1. Serial GC
Best for single-threaded applications with small heaps.

### 2. Parallel GC (Throughput Collector)
Uses multiple threads for Young Generation collection. Default in Java 8.

### 3. G1 GC (Garbage First)
Divides heap into regions and collects the ones with most garbage first. **Default since Java 9**.

```bash
# JVM flags for G1 GC tuning
java -XX:+UseG1GC \\
     -XX:MaxGCPauseMillis=200 \\
     -XX:G1HeapRegionSize=16m \\
     -XX:InitiatingHeapOccupancyPercent=45 \\
     -jar application.jar
```

## Practical Tips

1. **Avoid premature optimization** — Profile first with tools like VisualVM
2. **Monitor GC logs** — Enable with `-Xlog:gc*`
3. **Right-size your heap** — Too large = longer GC pauses
4. **Watch for memory leaks** — Use weak references where appropriate

## Conclusion

Mastering JVM memory management separates good Java developers from great ones. Start by understanding the basics, then use profiling tools to identify bottlenecks in your specific application.

---
*Written by Dinesh Kumar | Java Backend Developer*
""");
        blogPostService.save(post);
    }

    private void seedCertifications() {
        Certification c1 = new Certification();
        c1.setName("Data Structures and Algorithms Specialization");
        c1.setIssuer("Coursera (Princeton University)");
        c1.setYear("2024");
        c1.setCredentialId("COURSERA-PRIN-DSA-8821");
        c1.setIssueDate("05/11/2024");
        c1.setDisplayOrder(1);
        certificationService.save(c1);

        Certification c2 = new Certification();
        c2.setName("AWS Certified Developer - Associate");
        c2.setIssuer("Amazon Web Services (AWS)");
        c2.setYear("2025");
        c2.setCredentialId("AWS-DEV-ASSOC-7723");
        c2.setIssueDate("18/01/2025");
        c2.setDisplayOrder(2);
        certificationService.save(c2);

        Certification c3 = new Certification();
        c3.setName("Google Cloud Certified Associate Cloud Engineer");
        c3.setIssuer("Google Cloud (GCP)");
        c3.setYear("2025");
        c3.setCredentialId("GCP-ACE-9943-2025");
        c3.setIssueDate("03/03/2025");
        c3.setDisplayOrder(3);
        certificationService.save(c3);

        Certification c4 = new Certification();
        c4.setName("Oracle Certified Professional: Java SE 17 Developer");
        c4.setIssuer("Oracle Academy");
        c4.setYear("2025");
        c4.setCredentialId("OCP-JAVA17-8854");
        c4.setIssueDate("28/05/2025");
        c4.setDisplayOrder(4);
        certificationService.save(c4);

        Certification c5 = new Certification();
        c5.setName("SQL & Relational Databases Mastery");
        c5.setIssuer("PostgreSQL Guild");
        c5.setYear("2024");
        c5.setCredentialId("PG-GUILD-SQL-5542");
        c5.setIssueDate("14/09/2024");
        c5.setDisplayOrder(5);
        certificationService.save(c5);
    }
}
