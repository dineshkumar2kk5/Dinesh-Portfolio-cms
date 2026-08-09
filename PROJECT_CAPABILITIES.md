# 💡 DevPortfolio CMS — System Capabilities & Feature Guide

This document outlines everything you can do with your **DevPortfolio CMS & React Showcase system**.

---

## 🔑 1. Administrative CMS Dashboard (`http://localhost:8080/admin/dashboard`)

Log in using credentials `admin` / `admin123` to access the full administrative panel.

### 📁 Projects Management (`/admin/projects`)
- **Add New Projects**: Create project entries with title, subtitle, detailed description, role, timeline, and display order.
- **Structured Problem-Solving Narrative**:
  - *Engineering Challenge*: Document complex concurrency or database issues faced.
  - *Solution Strategy*: Detail how you solved it using Java, Spring, or architectural design.
  - *Key Outcomes*: Add bullet points of performance metrics achieved (e.g. "Reduced database queries by 60%").
- **Tech Tags**: Input comma-separated technology tags (e.g., `Java, Spring Boot, MongoDB, Redis`) automatically rendered as badges.
- **Image Uploads**: Upload project screenshots or mockups via multipart forms stored in local file storage.
- **Display Ordering**: Set custom display order numbers (`1, 2, 3...`) to control position on the public portfolio.

### 📜 Certifications Engine (`/admin/certifications`)
- **Credential Logging**: Log certifications from Oracle, AWS, Google Cloud, Coursera, etc.
- **Metadata Fields**: Store issuer name, year, credential ID, issue date, and direct verification URLs (`https://credly.com/...`).
- **Badge/Certificate Upload**: Upload badge images or certificate documents directly.

### ✍️ Blog CMS with Live Markdown (`/admin/blog`)
- **Markdown Editor**: Write blog posts using standard Markdown syntax (headers, code blocks, bullet points, blockquotes).
- **Live Preview**: Real-time side-by-side preview powered by `marked.js`.
- **Auto Slug Generation**: Converts titles into clean URLs (e.g., `"Understanding JVM Memory"` → `/blog/understanding-jvm-memory`).
- **Publish / Draft Toggle**: Save drafts privately or publish them live to visitors.
- **CommonMark Engine**: Markdown is converted to safe HTML on save using CommonMark Java parser.

---

## 🎨 2. Public Portfolio Frontend (`http://localhost:3000`)

### ⚡ Real-Time Data Synchronization
- **Live API Fetch**: Automatically queries `/api/projects` and `/api/certifications` on load.
- **Zero-Downtime Fallback**: If the Spring Boot backend is temporarily offline, the React portfolio seamlessly falls back to static `data.ts`.
- **CMS Connected Badge**: Top navigation bar features a dynamic **"CMS Connected"** badge that links directly to your Admin Login page.

### 🌙 Editorial UX & Theming
- **Dark / Light Modes**: Instant theme toggle with localStorage persistence.
- **Interactive Modals**: Click any project card to view full challenge/solution/results spec sheet.
- **Responsive Layout**: Optimized for desktop, tablet, and mobile viewports with smooth Framer Motion animations.

---

## 📡 3. REST API Operations (`/api/*`)

You can consume these JSON endpoints from any web app, mobile app, or third-party service:

- `GET http://localhost:8080/api/projects` — List all projects sorted by display order
- `GET http://localhost:8080/api/projects/{id}` — Retrieve single project details
- `GET http://localhost:8080/api/certifications` — List all verified certifications
- `GET http://localhost:8080/api/blogs` — List all published blog posts
- `GET http://localhost:8080/api/blogs/{slug}` — Retrieve single blog post by slug
