 document.addEventListener("DOMContentLoaded", () => {
    // Set copyright year and last modified date with element checks
    const copyrightEl = document.getElementById("copyrightYear");
    const modifiedEl = document.getElementById("lastModified");

    if (copyrightEl) copyrightEl.textContent = new Date().getFullYear();
    if (modifiedEl) modifiedEl.textContent = document.lastModified;

    // CTA button hover effect with event listeners
    const ctaButton = document.querySelector(".cta-button");

    if (ctaButton) {
        ctaButton.addEventListener("mouseenter", () => ctaButton.classList.add("hovered"));
        ctaButton.addEventListener("mouseleave", () => ctaButton.classList.remove("hovered"));
    }
 });
