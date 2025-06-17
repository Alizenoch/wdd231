document.addEventListener("DOMContentLoaded", async () => {
    try {
        // Set copyright year and last modified date
        document.getElementById("copyrightYear").textContent = new Date().getFullYear();
        document.getElementById("lastModified").textContent = document.lastModified;

        // Store and display last visit date
        const lastVisit = localStorage.getItem("lastVisit");

        if (lastVisit) {
            document.getElementById("lastVisitDisplay").textContent = `Last Visit: ${lastVisit}`;
        }

        localStorage.setItem("lastVisit", new Date().toLocaleString());

        // Store user navigation preferences
        localStorage.setItem("lastPage", window.location.href);

        // Handle CTA button hover effect
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

            // Apply stored hover state
            if (localStorage.getItem("ctaHovered") === "true") {
                ctaButton.classList.add("hovered");
            }
        }
    } catch (error) {
        console.error("Error initializing index page:", error);
    }
});
