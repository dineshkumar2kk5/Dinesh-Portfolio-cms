# 🎯 Interview Preparation Guide — DevPortfolio CMS & Backend

This guide contains exact interview questions, answers, architecture explanations, and resume pitch lines to ace software engineering interviews using this project.

---

## 🗣️ 1. The 60-Second "Resume Pitch" (How to Explain This Project)

> *"I designed and built **DevPortfolio CMS**, a full-stack content management system built with **Spring Boot 3**, **Spring Security 6**, **MongoDB**, and **React 19**.
>
> Instead of keeping my portfolio static, I engineered a role-based CMS where administrative functions (creating, editing, reordering projects, managing certifications, and writing Markdown blogs with live preview) are secured behind BCrypt authentication.
>
> The React frontend dynamically consumes REST endpoints exposed by Spring Boot with zero-downtime fallback to local state if offline. I also handled multipart file uploads and configured custom WebMvc resource handlers for static image serving."*

---

## ❓ 2. Top 15 Technical Interview Questions & Answers

### Q1: Why did you choose MongoDB over a Relational SQL database for this CMS?
**Answer**:
> "Portfolio projects, blog posts, and certifications have flexible schema attributes (e.g. dynamic tech tags array, lists of outcome metrics, variable detail schemas). MongoDB's document model allows storing these as nested BSON arrays natively without needing complex SQL join tables (e.g., `project_tags` or `project_results`).
>
> Furthermore, MongoDB offers high read throughput for public visitors reading portfolio projects while keeping updates simple for admin writes."

### Q2: How did you implement Security in Spring Boot 3?
**Answer**:
> "I configured Spring Security 6 using a `SecurityFilterChain` bean:
> 1. Administrative routes (`/admin/**`) require `ROLE_ADMIN` authority.
> 2. Passwords are encoded using `BCryptPasswordEncoder` with salted hashing.
> 3. Public REST API endpoints (`/api/**`) are exposed via `WebSecurityCustomizer` / `CorsRegistry` to allow cross-origin requests from the React frontend without triggering form login redirects."

### Q3: How did you handle Cross-Origin Resource Sharing (CORS) between React (Port 3000) and Spring Boot (Port 8080)?
**Answer**:
> "I configured CORS at two levels:
> 1. **Spring WebMVC Level**: In `WebConfig.java`, implementing `WebMvcConfigurer.addCorsMappings()` with `allowedOriginPatterns("*")` and HTTP methods (`GET`, `POST`, `PUT`, `DELETE`).
> 2. **Spring Security Level**: Added `.cors(Customizer.withDefaults())` to the `SecurityFilterChain` so pre-flight `OPTIONS` requests pass through cleanly without authentication blocks."

### Q4: How does the Markdown blog editor convert text to HTML?
**Answer**:
> "When an admin submits a blog post written in Markdown, the backend uses **CommonMark** (`org.commonmark.parser.Parser` and `HtmlRenderer`) to parse the raw Markdown string into an AST (Abstract Syntax Tree) and render optimized HTML stored directly in the `contentHtml` document field.
>
> On the frontend, client-side live editing is facilitated by `marked.js` so the author sees instant side-by-side previews."

### Q5: How do file uploads work in Spring Boot?
**Answer**:
> "Multipart image uploads (`MultipartFile`) are validated by MIME type (JPEG, PNG, WebP) in `FileStorageService`. Files are given unique UUID filenames to prevent filename collisions and saved to an external upload directory.
>
> To serve these images to browsers, I mapped the physical upload folder to URL path `/uploads/**` using Spring MVC's `ResourceHandlerRegistry`."

### Q6: How does the React app handle backend offline states gracefully?
**Answer**:
> "In React's `useEffect` hook, the app attempts to fetch live data from `http://localhost:8080/api/projects`. If the request succeeds, it updates the component state. If the backend is offline or unreachable, a `catch` block catches the error and retains the initial fallback data loaded from static `data.ts`, ensuring zero UI disruption."

### Q7: What design patterns did you use in the Spring Boot application?
**Answer**:
- **Repository Pattern**: Spring Data MongoRepository abstracts data access logic.
- **Service Layer Pattern**: Business logic, Markdown parsing, and slug generation encapsulated in `@Service` beans.
- **MVC / REST Controller Pattern**: Separation of Thymeleaf views (`@Controller`) and REST APIs (`@RestController`).
- **Singleton Pattern**: Spring IoC container manages service and repository singletons.

---

## ⚡ 3. Key Resume Bullet Points

Add these lines directly to your resume:

- **"Designed and deployed a full-stack CMS using Spring Boot 3, MongoDB, Spring Security, and React 19, enabling dynamic management of projects, certifications, and technical blogs."**
- **"Implemented Spring Security 6 role-based access control (RBAC) with BCrypt encryption, securing administrative operations while exposing CORS-enabled REST APIs."**
- **"Engineered an automated Markdown-to-HTML compilation pipeline utilizing CommonMark for high-performance server-side rendering."**
- **"Configured multipart file storage pipelines and WebMVC static resource handlers for dynamic image management."**
