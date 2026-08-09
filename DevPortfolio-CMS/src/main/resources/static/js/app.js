/**
 * DevPortfolio CMS — Client-Side JavaScript
 * Handles theme toggle, smooth scroll, and interactive UI.
 */

document.addEventListener('DOMContentLoaded', function () {

    // ==========================================
    // THEME TOGGLE (Dark / Light)
    // ==========================================
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    const body = document.getElementById('page-body');

    // Load saved theme preference
    const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
    applyTheme(savedTheme);

    if (themeToggle) {
        themeToggle.addEventListener('click', function () {
            const currentTheme = body.classList.contains('light-theme') ? 'light' : 'dark';
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            applyTheme(newTheme);
            localStorage.setItem('portfolio-theme', newTheme);
        });
    }

    function applyTheme(theme) {
        if (theme === 'light') {
            body.classList.remove('dark-theme');
            body.classList.add('light-theme');
            if (themeIcon) {
                themeIcon.className = 'bi bi-sun';
            }
        } else {
            body.classList.remove('light-theme');
            body.classList.add('dark-theme');
            if (themeIcon) {
                themeIcon.className = 'bi bi-moon-stars';
            }
        }
    }

    // ==========================================
    // SMOOTH SCROLL for anchor links
    // ==========================================
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetEl = document.querySelector(targetId);
            if (targetEl) {
                e.preventDefault();
                targetEl.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ==========================================
    // NAVBAR SCROLL EFFECT
    // ==========================================
    const nav = document.getElementById('portfolio-nav');
    let lastScrollY = 0;

    window.addEventListener('scroll', function () {
        const currentScrollY = window.scrollY;
        if (nav) {
            if (currentScrollY > 50) {
                nav.style.borderBottomColor = 'var(--border-accent)';
            } else {
                nav.style.borderBottomColor = 'var(--border)';
            }
        }
        lastScrollY = currentScrollY;
    });

    // ==========================================
    // INTERSECTION OBSERVER for fade-in animations
    // ==========================================
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -80px 0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all project cards and section elements
    document.querySelectorAll('.project-card, .stat-card, .skill-card, .exp-card, .blog-card, .contact-card').forEach(function (el) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // ==========================================
    // IMAGE UPLOAD PREVIEW
    // ==========================================
    const imageFileInput = document.getElementById('imageFile');
    const coverFileInput = document.getElementById('coverFile');

    function setupImagePreview(input) {
        if (!input) return;
        input.addEventListener('change', function (e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function (event) {
                    // Find or create preview element
                    let preview = input.parentElement.querySelector('.upload-preview');
                    if (!preview) {
                        preview = document.createElement('div');
                        preview.className = 'upload-preview mt-2';
                        input.parentElement.appendChild(preview);
                    }
                    preview.innerHTML = '<small class="text-muted">Preview:</small><br/>' +
                        '<img src="' + event.target.result + '" ' +
                        'style="max-width:200px; max-height:120px; object-fit:cover; border-radius:8px; margin-top:4px;" />';
                };
                reader.readAsDataURL(file);
            }
        });
    }

    setupImagePreview(imageFileInput);
    setupImagePreview(coverFileInput);

    // ==========================================
    // AUTO-DISMISS ALERTS after 5 seconds
    // ==========================================
    document.querySelectorAll('.alert-custom').forEach(function (alert) {
        setTimeout(function () {
            alert.style.transition = 'opacity 0.4s ease';
            alert.style.opacity = '0';
            setTimeout(function () { alert.remove(); }, 400);
        }, 5000);
    });

    console.log('✔ DevPortfolio CMS loaded successfully.');
});
