document.addEventListener("DOMContentLoaded", () => {
    // Set copyright year and last modified date
    const copyrightEl = document.getElementById("copyrightYear");
    const modifiedEl = document.getElementById("lastModified");

    if (copyrightEl) copyrightEl.textContent = new Date().getFullYear();
    if (modifiedEl) modifiedEl.textContent = document.lastModified;

    // Store and display last visit date
    const lastVisit = localStorage.getItem("lastVisit");

    if (lastVisit) {
        document.getElementById("lastVisitDisplay").textContent = `Last Visit: ${lastVisit}`;
    }

    localStorage.setItem("lastVisit", new Date().toLocaleString());

    // Store user navigation preferences (optional)
    const currentPage = window.location.href;
    localStorage.setItem("lastPage", currentPage);

    // CTA button hover effect with event listeners
    const ctaButton = document.querySelector(".cta-button");

    if (ctaButton) {
        ctaButton.addEventListener("mouseenter", () => {
            ctaButton.classList.add("hovered");
            localStorage.setItem("ctaHovered", "true");
        });

        ctaButton.addEventListener("mouseleave", () => {
            ctaButton.classList.remove("hovered");
            localStorage.setItem("ctaHovered", "false");
        });

        // Apply stored hover state if applicable
        const wasHovered = localStorage.getItem("ctaHovered");
        if (wasHovered === "true") {
            ctaButton.classList.add("hovered");
        }
    }
});
