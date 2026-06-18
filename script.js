const state = {
    content: null,
    projectFilter: "All",
    projectSearch: "",
    notesSearch: ""
};

const selectors = {
    header: document.querySelector("#site-header"),
    menuToggle: document.querySelector("#menu-toggle"),
    navPanel: document.querySelector("#nav-menu"),
    navLinks: [...document.querySelectorAll(".nav-link")],
    themeToggle: document.querySelector("#theme-toggle"),
    backToTop: document.querySelector("#back-to-top"),
    contactForm: document.querySelector("#contact-form"),
    formStatus: document.querySelector("#form-status")
};

document.addEventListener("DOMContentLoaded", init);

async function init() {
    initTheme();
    bindNavigation();
    bindScrollUI();
    bindContactForm();
    await loadContent();
    setupRevealAnimations();
    updateScrollUI();
}

async function loadContent() {
    try {
        const response = await fetch("data/content.json", { cache: "no-store" });

        if (!response.ok) {
            throw new Error(`Content request failed: ${response.status}`);
        }

        state.content = await response.json();
        renderPageContent();
    } catch (error) {
        console.error(error);
        renderContentError();
    }
}

function renderPageContent() {
    renderStats(state.content.stats);
    renderSkills(state.content.skills);
    renderFeaturedProject(state.content.featuredProject);
    renderProjectFilters(state.content.projects);
    renderProjects();
    renderNotes();
    renderNow(state.content.now);
    renderTimeline(state.content.timeline);
    renderEducation(state.content.education);
    renderSimpleCards("#achievements-grid", state.content.achievements, "feature-card");
    renderTestimonials(state.content.testimonials);
    bindFilters();
}

function renderStats(stats) {
    const grid = document.querySelector("#stats-grid");
    grid.innerHTML = stats.map(item => `
        <article class="stat-card reveal">
            <span class="stat-number">${escapeHTML(item.value)}</span>
            <span class="stat-label">${escapeHTML(item.label)}</span>
        </article>
    `).join("");
}

function renderSkills(groups) {
    const grid = document.querySelector("#skills-grid");
    grid.innerHTML = groups.map(group => `
        <article class="skill-card reveal">
            <h3>${escapeHTML(group.category)}</h3>
            <div class="skill-list">
                ${group.items.map(skill => `
                    <div class="skill-row">
                        <div class="skill-meta">
                            <span class="skill-name">${escapeHTML(skill.name)}</span>
                            <span>${Number(skill.level)}%</span>
                        </div>
                        <div class="skill-track" aria-hidden="true">
                            <span class="skill-fill" style="--level: ${Number(skill.level)}%"></span>
                        </div>
                    </div>
                `).join("")}
            </div>
        </article>
    `).join("");
}

function renderFeaturedProject(project) {
    const container = document.querySelector("#featured-project");
    container.innerHTML = `
        <div class="spotlight-media">
            <img src="${escapeAttribute(project.image)}" alt="${escapeAttribute(project.title)} project preview">
        </div>
        <div class="spotlight-copy">
            <p class="eyebrow">Featured Project</p>
            <h3>${escapeHTML(project.title)}</h3>
            <p>${escapeHTML(project.summary)}</p>
            ${renderTags(project.tags)}
            ${renderLinks(project.links)}
        </div>
    `;
}

function renderProjectFilters(projects) {
    const filterRoot = document.querySelector("#project-filters");
    const categories = ["All", ...new Set(projects.map(project => project.category))];
    filterRoot.innerHTML = categories.map(category => `
        <button class="chip ${category === state.projectFilter ? "active" : ""}" type="button" data-filter="${escapeAttribute(category)}">
            ${escapeHTML(category)}
        </button>
    `).join("");
}

function renderProjects() {
    const grid = document.querySelector("#projects-grid");
    const empty = document.querySelector("#projects-empty");
    const query = state.projectSearch.trim().toLowerCase();

    const projects = state.content.projects.filter(project => {
        const matchesFilter = state.projectFilter === "All" || project.category === state.projectFilter;
        const haystack = `${project.title} ${project.summary} ${project.category} ${project.tags.join(" ")}`.toLowerCase();
        return matchesFilter && haystack.includes(query);
    });

    grid.innerHTML = projects.map(project => `
        <article class="project-card reveal">
            <img src="${escapeAttribute(project.image)}" alt="${escapeAttribute(project.title)} project preview">
            <div class="project-body">
                <span class="project-meta">${escapeHTML(project.category)}</span>
                <h3>${escapeHTML(project.title)}</h3>
                <p>${escapeHTML(project.summary)}</p>
                ${renderTags(project.tags)}
                ${renderLinks(project.links)}
            </div>
        </article>
    `).join("");

    empty.hidden = projects.length > 0;
    setupRevealAnimations();
}

function renderNotes() {
    const grid = document.querySelector("#notes-grid");
    const empty = document.querySelector("#notes-empty");
    const query = state.notesSearch.trim().toLowerCase();

    const notes = state.content.notes.filter(note => {
        const haystack = `${note.title} ${note.summary} ${note.tags.join(" ")}`.toLowerCase();
        return haystack.includes(query);
    });

    grid.innerHTML = notes.map(note => `
        <article class="note-card reveal">
            <time datetime="${escapeAttribute(note.date)}">${formatDate(note.date)}</time>
            <h3>${escapeHTML(note.title)}</h3>
            <p>${escapeHTML(note.summary)}</p>
            ${renderTags(note.tags)}
        </article>
    `).join("");

    empty.hidden = notes.length > 0;
    setupRevealAnimations();
}

function renderNow(items) {
    const grid = document.querySelector("#now-grid");
    grid.innerHTML = items.map(item => `
        <article class="now-card">
            <h3>${escapeHTML(item.title)}</h3>
            <p>${escapeHTML(item.summary)}</p>
        </article>
    `).join("");
}

function renderTimeline(items) {
    const timeline = document.querySelector("#timeline");
    timeline.innerHTML = items.map(item => `
        <article class="timeline-item reveal">
            <span class="timeline-date">${escapeHTML(item.date)}</span>
            <h3>${escapeHTML(item.title)}</h3>
            <p>${escapeHTML(item.summary)}</p>
        </article>
    `).join("");
}

function renderEducation(items) {
    const grid = document.querySelector("#education-grid");
    grid.innerHTML = items.map(item => `
        <article class="education-card reveal">
            <span class="project-meta">${escapeHTML(item.duration)}</span>
            <h3>${escapeHTML(item.title)}</h3>
            <p><strong>${escapeHTML(item.institution)}</strong></p>
            <p>${escapeHTML(item.summary)}</p>
            ${item.coursework ? renderTags(item.coursework) : ""}
            ${item.results ? renderAdmissionTable(item.results) : ""}
        </article>
    `).join("");
}

function renderSimpleCards(selector, items, className) {
    const grid = document.querySelector(selector);
    grid.innerHTML = items.map(item => `
        <article class="${className} reveal">
            <h3>${escapeHTML(item.title)}</h3>
            <p>${escapeHTML(item.summary)}</p>
        </article>
    `).join("");
}

function renderTestimonials(items) {
    const grid = document.querySelector("#testimonials-grid");
    grid.innerHTML = items.map(item => `
        <article class="testimonial-card reveal">
            <p>"${escapeHTML(item.quote)}"</p>
            <h3>${escapeHTML(item.name)}</h3>
            <p>${escapeHTML(item.role)}</p>
        </article>
    `).join("");
}

function renderTags(tags = []) {
    return `
        <div class="tag-list">
            ${tags.map(tag => `<span class="tag">${escapeHTML(tag)}</span>`).join("")}
        </div>
    `;
}

function renderLinks(links = []) {
    if (!links.length) return "";

    return `
        <div class="link-row">
            ${links.map(link => `
                <a class="text-link" href="${escapeAttribute(link.url)}" target="_blank" rel="noreferrer">
                    ${escapeHTML(link.label)} →
                </a>
            `).join("")}
        </div>
    `;
}

function renderAdmissionTable(results) {
    return `
        <table class="admission-table">
            <thead>
                <tr>
                    <th>University</th>
                    <th>Marks</th>
                    <th>Merit</th>
                </tr>
            </thead>
            <tbody>
                ${results.map(result => `
                    <tr>
                        <td>${escapeHTML(result.university)}</td>
                        <td>${escapeHTML(result.marks)}</td>
                        <td>${escapeHTML(result.merit)}</td>
                    </tr>
                `).join("")}
            </tbody>
        </table>
    `;
}

function bindFilters() {
    document.querySelector("#project-search").oninput = event => {
        state.projectSearch = event.target.value;
        renderProjects();
    };

    document.querySelector("#notes-search").oninput = event => {
        state.notesSearch = event.target.value;
        renderNotes();
    };

    document.querySelector("#project-filters").onclick = event => {
        const button = event.target.closest("[data-filter]");
        if (!button) return;

        state.projectFilter = button.dataset.filter;
        renderProjectFilters(state.content.projects);
        bindFilters();
        renderProjects();
    };
}

function initTheme() {
    const savedTheme = localStorage.getItem("portfolio-theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const shouldUseDark = savedTheme ? savedTheme === "dark" : prefersDark;

    document.body.classList.toggle("dark", shouldUseDark);
    updateThemeToggle();
}

function updateThemeToggle() {
    const isDark = document.body.classList.contains("dark");
    selectors.themeToggle.setAttribute("aria-label", isDark ? "Switch to light theme" : "Switch to dark theme");
    selectors.themeToggle.innerHTML = `<span aria-hidden="true">${isDark ? "☀" : "◐"}</span>`;
}

function bindNavigation() {
    selectors.themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark");
        localStorage.setItem("portfolio-theme", document.body.classList.contains("dark") ? "dark" : "light");
        updateThemeToggle();
    });

    selectors.menuToggle.addEventListener("click", () => {
        const isOpen = selectors.navPanel.classList.toggle("open");
        selectors.menuToggle.classList.toggle("active", isOpen);
        selectors.menuToggle.setAttribute("aria-expanded", String(isOpen));
        selectors.menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
        document.body.classList.toggle("menu-open", isOpen);
    });

    selectors.navLinks.forEach(link => {
        link.addEventListener("click", event => {
            const targetId = link.getAttribute("href");
            closeMenu();

            if (!targetId.startsWith("#")) return;
            const target = document.querySelector(targetId);
            if (!target) return;

            event.preventDefault();
            target.scrollIntoView({ behavior: "smooth", block: "start" });
            history.pushState(null, "", targetId);
        });
    });

    document.addEventListener("keydown", event => {
        if (event.key === "Escape") closeMenu();
    });
}

function bindScrollUI() {
    window.addEventListener("scroll", updateScrollUI, { passive: true });
    selectors.backToTop.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const id = entry.target.id;
            selectors.navLinks.forEach(link => {
                link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
            });
        });
    }, { rootMargin: "-35% 0px -55% 0px", threshold: 0 });

    document.querySelectorAll("main section[id]").forEach(section => observer.observe(section));
}

function updateScrollUI() {
    const isScrolled = window.scrollY > 16;
    selectors.header.classList.toggle("scrolled", isScrolled);
    selectors.backToTop.classList.toggle("show", window.scrollY > 500);
}

function closeMenu() {
    selectors.navPanel.classList.remove("open");
    selectors.menuToggle.classList.remove("active");
    selectors.menuToggle.setAttribute("aria-expanded", "false");
    selectors.menuToggle.setAttribute("aria-label", "Open navigation");
    document.body.classList.remove("menu-open");
}

function setupRevealAnimations() {
    const elements = [...document.querySelectorAll(".reveal:not(.visible):not([data-observed])")];

    if (!elements.length) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        elements.forEach(element => element.classList.add("visible"));
        return;
    }

    const revealObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("visible");
            revealObserver.unobserve(entry.target);
        });
    }, { threshold: 0.12, rootMargin: "0px 0px -60px 0px" });

    elements.forEach(element => {
        element.dataset.observed = "true";
        revealObserver.observe(element);
    });
}

function bindContactForm() {
    selectors.contactForm.addEventListener("submit", async event => {
        event.preventDefault();

        const formData = new FormData(selectors.contactForm);
        const payload = Object.fromEntries(formData.entries());

        if (!isValidMessage(payload)) {
            showFormStatus("Please complete every field with a valid email and message.", "error");
            return;
        }

        const submitButton = selectors.contactForm.querySelector("button[type='submit']");
        submitButton.disabled = true;
        submitButton.textContent = "Sending...";

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                throw new Error("API unavailable");
            }

            selectors.contactForm.reset();
            showFormStatus("Thanks! Your message was submitted successfully.", "success");
        } catch (error) {
            openMailFallback(payload);
            showFormStatus("The static fallback opened your email app with the message prepared.", "success");
        } finally {
            submitButton.disabled = false;
            submitButton.textContent = "Send Message";
        }
    });
}

function isValidMessage(data) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return (
        !data.website &&
        data.name?.trim().length >= 2 &&
        emailPattern.test(data.email || "") &&
        data.subject?.trim().length >= 3 &&
        data.message?.trim().length >= 10
    );
}

function showFormStatus(message, type) {
    selectors.formStatus.textContent = message;
    selectors.formStatus.className = `form-status show ${type}`;
}

function openMailFallback(data) {
    const subject = encodeURIComponent(`[Portfolio] ${data.subject}`);
    const body = encodeURIComponent(`Name: ${data.name}\nEmail: ${data.email}\n\n${data.message}`);
    window.location.href = `mailto:mdshourov735@gmail.com?subject=${subject}&body=${body}`;
}

function renderContentError() {
    const targets = ["#projects-grid", "#skills-grid", "#notes-grid"];
    targets.forEach(selector => {
        const element = document.querySelector(selector);
        if (element) {
            element.innerHTML = `<p class="empty-state">Content could not load. Run the site from a local server or deploy it to GitHub Pages/Vercel.</p>`;
        }
    });
}

function formatDate(value) {
    return new Intl.DateTimeFormat("en", {
        month: "short",
        day: "numeric",
        year: "numeric"
    }).format(new Date(value));
}

function escapeHTML(value = "") {
    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

function escapeAttribute(value = "") {
    return escapeHTML(value).replaceAll("`", "&#096;");
}
