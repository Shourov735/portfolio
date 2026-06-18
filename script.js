/* ==========================================
   PORTFOLIO WEBSITE - JAVASCRIPT
   Handles navigation, animations, and interactions
   ========================================== */

// ==========================================
// DOM ELEMENTS
// ==========================================

const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const themeToggle = document.getElementById('theme-toggle');
const backToTopBtn = document.getElementById('back-to-top');
const contactForm = document.getElementById('contact-form');

// ==========================================
// INITIALIZATION
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    setupEventListeners();
    setupScrollAnimations();
});

// ==========================================
// THEME MANAGEMENT (Dark Mode)
// ==========================================

function initTheme() {
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme') || 'light-mode';
    document.body.classList.add(savedTheme);
    updateThemeIcon();
}

function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    const isDarkMode = document.body.classList.contains('dark-mode');
    localStorage.setItem('theme', isDarkMode ? 'dark-mode' : 'light-mode');
    updateThemeIcon();
}

function updateThemeIcon() {
    const isDarkMode = document.body.classList.contains('dark-mode');
    themeToggle.textContent = isDarkMode ? '☀️' : '🌙';
}

// ==========================================
// NAVIGATION
// ==========================================

function setupEventListeners() {
    // Hamburger menu toggle
    hamburger.addEventListener('click', toggleMobileMenu);

    // Navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Don't close menu for theme toggle button
            if (e.target.closest('.theme-toggle')) {
                toggleTheme();
                return;
            }
            closeMobileMenu();
            updateActiveNav(e.target);
        });
    });

    // Theme toggle
    themeToggle.addEventListener('click', (e) => {
        e.preventDefault();
        toggleTheme();
    });

    // Back to top button
    backToTopBtn.addEventListener('click', scrollToTop);

    // Contact form
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }

    // Scroll events
    window.addEventListener('scroll', () => {
        handleNavbarOnScroll();
        showBackToTopButton();
        handleScrollAnimations();
    });
}

function toggleMobileMenu() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
}

function closeMobileMenu() {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}

// ==========================================
// ACTIVE NAVIGATION
// ==========================================

function updateActiveNav(element) {
    // Remove active class from all links
    navLinks.forEach(link => link.classList.remove('active'));

    // Add active class to clicked link
    if (element.classList.contains('nav-link')) {
        element.classList.add('active');
    }
}

// Update active nav based on scroll position
function updateActiveNavOnScroll() {
    const sections = document.querySelectorAll('section');
    let currentSection = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (window.pageYOffset >= sectionTop - 200) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// ==========================================
// NAVBAR EFFECTS
// ==========================================

let lastScrollY = 0;

function handleNavbarOnScroll() {
    const scrollY = window.pageYOffset;

    // Add shadow on scroll
    if (scrollY > 10) {
        navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
    }

    // Update active navigation
    updateActiveNavOnScroll();

    lastScrollY = scrollY;
}

// ==========================================
// BACK TO TOP BUTTON
// ==========================================

function showBackToTopButton() {
    if (window.pageYOffset > 300) {
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// ==========================================
// FORM HANDLING
// ==========================================

function handleFormSubmit(e) {
    e.preventDefault();

    const formData = {
        name: document.getElementById('name').value.trim(),
        email: document.getElementById('email').value.trim(),
        subject: document.getElementById('subject').value.trim(),
        message: document.getElementById('message').value.trim()
    };

    // Validate form data
    if (!validateForm(formData)) {
        showFormMessage('Please fill in all fields correctly.', 'error');
        return;
    }

    // Simulate form submission
    const submitBtn = contactForm.querySelector('.btn-submit');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    // Simulate API call
    setTimeout(() => {
        showFormMessage(
            'Thank you! Your message has been received. I\'ll get back to you soon.',
            'success'
        );
        contactForm.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 1500);
}

function validateForm(data) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return (
        data.name.length > 0 &&
        data.email.length > 0 &&
        emailRegex.test(data.email) &&
        data.subject.length > 0 &&
        data.message.length > 0
    );
}

function showFormMessage(message, type) {
    // Remove existing message if present
    const existingMessage = contactForm.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }

    const messageDiv = document.createElement('div');
    messageDiv.className = `form-message form-message-${type}`;
    messageDiv.textContent = message;
    messageDiv.style.cssText = `
        padding: 12px 16px;
        border-radius: 6px;
        margin-bottom: 16px;
        font-weight: 500;
        ${type === 'success'
            ? 'background-color: rgba(34, 197, 94, 0.1); color: #22c55e; border: 1px solid #22c55e;'
            : 'background-color: rgba(239, 68, 68, 0.1); color: #ef4444; border: 1px solid #ef4444;'
        }
    `;

    contactForm.insertBefore(messageDiv, contactForm.firstChild);

    // Remove message after 5 seconds
    setTimeout(() => {
        messageDiv.remove();
    }, 5000);
}

// ==========================================
// SCROLL ANIMATIONS
// ==========================================

function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('scroll-animate');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements that should animate on scroll
    const animateOnScroll = document.querySelectorAll(
        '.skill-category, .project-card, .achievement-card, .timeline-item, .stat-card'
    );

    animateOnScroll.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        observer.observe(element);
    });
}

function handleScrollAnimations() {
    // Additional scroll animation logic can be added here
}

// ==========================================
// SMOOTH SCROLLING FOR ANCHOR LINKS
// ==========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');

        // Skip if it's the theme toggle or hamburger
        if (this.closest('.theme-toggle') || this.closest('.hamburger')) {
            return;
        }

        // Skip if href is just '#'
        if (href === '#') {
            return;
        }

        e.preventDefault();

        const target = document.querySelector(href);
        if (target) {
            const offsetTop = target.offsetTop - 70; // Account for navbar height

            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });

            // Update active nav if it's a section link
            if (target.tagName === 'SECTION') {
                const navLink = document.querySelector(`a[href="${href}"]`);
                if (navLink) {
                    updateActiveNav(navLink);
                }
            }
        }
    });
});

// ==========================================
// UTILITY FUNCTIONS
// ==========================================

/**
 * Debounce function to limit function calls
 * @param {Function} func - The function to debounce
 * @param {number} wait - The debounce delay in milliseconds
 * @returns {Function} The debounced function
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Throttle function to limit function calls
 * @param {Function} func - The function to throttle
 * @param {number} limit - The throttle limit in milliseconds
 * @returns {Function} The throttled function
 */
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ==========================================
// KEYBOARD NAVIGATION
// ==========================================

document.addEventListener('keydown', (e) => {
    // Close mobile menu on Escape
    if (e.key === 'Escape') {
        closeMobileMenu();
    }

    // Back to top on Control + Home
    if (e.ctrlKey && e.key === 'Home') {
        scrollToTop();
    }
});

// ==========================================
// RESPONSIVE BEHAVIOR
// ==========================================

// Close mobile menu on window resize if screen becomes larger
let resizeTimer;
window.addEventListener('resize', debounce(() => {
    if (window.innerWidth > 768) {
        closeMobileMenu();
    }
}, 250));

// ==========================================
// PREFERS REDUCED MOTION
// ==========================================

// Respect user's motion preferences
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (prefersReducedMotion) {
    // Apply reduced motion styles
    document.querySelectorAll('*').forEach(el => {
        el.style.animationDuration = '0.01ms !important';
        el.style.transitionDuration = '0.01ms !important';
    });
}

// ==========================================
// PERFORMANCE MONITORING
// ==========================================

// Log performance metrics (optional, for debugging)
if (window.performance && window.performance.timing) {
    window.addEventListener('load', () => {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log(`Page loaded in ${pageLoadTime}ms`);
    });
}

// ==========================================
// SERVICE WORKER REGISTRATION (Optional for PWA)
// ==========================================

// Uncomment to enable service worker for offline support
// if ('serviceWorker' in navigator) {
//     navigator.serviceWorker.register('/sw.js').catch(err => {
//         console.log('Service Worker registration failed:', err);
//     });
// }
