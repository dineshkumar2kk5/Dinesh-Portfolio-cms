# 🚀 DevPortfolio CMS & Dynamic React Showcase

A full-stack Content Management System (CMS) and interactive portfolio engine built with **Spring Boot 3**, **Spring Security 6**, **MongoDB**, **Thymeleaf**, and **React 19**.

---

## 📌 Architecture Overview

```
 ┌──────────────────────────────────────┐                   ┌──────────────────────────────────────┐
 │       React 19 Frontend              │                   │       Spring Boot 3 Backend          │
 │   (Dinesh_Kumar_Portfolio)           │   REST API (JSON) │         (DevPortfolio-CMS)           │
 │   • TypeScript & Tailwind CSS        │ ◄───────────────► │   • Spring Security 6 (BCrypt)       │
 │   • Dynamic Data Fetching            │   http://localhost│   • MongoDB Document Persistence     │
 │   • Direct Admin CMS Links           │   :8080/api/*     │   • Thymeleaf Admin Dashboard        │
 └──────────────────────────────────────┘                   └──────────────────────────────────────┘
```

---

## 🛠️ Tech Stack

| Layer | Technologies Used |
| :--- | :--- |
| **Frontend** | React 19, TypeScript, Vite, Tailwind CSS, Lucide Icons, Framer Motion |
| **Backend** | Java 21, Spring Boot 3.3, Spring Security 6, Spring Data MongoDB, CommonMark (Markdown parser) |
| **Database** | MongoDB (Embedded Flapdoodle for zero-setup dev / MongoDB Atlas for Production) |
| **View Engine** | Thymeleaf (Admin CMS Dashboard) |
| **Build Tools** | Apache Maven, Vite, Node.js |

---

## ✨ Key Features

- **🛡️ Role-Based Security**: Administrative routes (`/admin/**`) are strictly guarded with Spring Security and BCrypt password encryption.
- **📁 Dynamic Project Showcase**: Full CRUD for projects with challenge narratives, solution strategies, tech tags, and custom mockup backgrounds.
- **📜 Certifications Engine**: Manage credentials, issue dates, issuer orgs, and verification links.
- **✍️ Markdown Technical Blog**: Integrated split-pane Markdown editor with live HTML preview and draft/publish toggles.
- **🖼️ Multipart File Uploads**: Upload project mockups and certificate images stored locally and served via static resource handlers.
- **🔄 Auto-Sync & Fallback**: React frontend dynamically fetches live data from Spring Boot REST APIs with automatic static fallback if offline.

---

## 🚀 Quick Start

### 1. Launch Spring Boot Backend
```bash
cd DevPortfolio-CMS
mvn spring-boot:run
```
- **Backend URL**: `http://localhost:8080`
- **Admin Dashboard**: `http://localhost:8080/admin/dashboard`
- **Default Credentials**: `admin` / `admin123`

### 2. Launch React Frontend
```bash
cd Dinesh_Kumar_Portfolio
npm run dev
```
- **Frontend URL**: `http://localhost:3000`

---

## 📡 REST API Endpoints

- `GET /api/projects` — Fetch all published portfolio projects
- `GET /api/projects/{id}` — Fetch detailed project specs by ID
- `GET /api/certifications` — Fetch all verified certifications
- `GET /api/blogs` — Fetch published blog posts
- `GET /api/blogs/{slug}` — Fetch single blog post by URL slug

---

## 📜 License
Developed by **Dinesh Kumar** (B.Tech CSE '27) — Designed for professional technical showcase.
