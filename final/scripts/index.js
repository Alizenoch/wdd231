document.addEventListener("DOMContentLoaded", () => {
    const ctaButton = document.querySelector(".cta-button");

    if (ctaButton) {
        ctaButton.addEventListener("mouseenter", () => {
            ctaButton.classList.add("hovered");
        });

        ctaButton.addEventListener("mouseleave", () => {
            ctaButton.classList.remove("hovered");
        });
    }
});

// This script initializes the BrightStart Hub and adds hover effects to the CTA button.
// It listens for the DOMContentLoaded event to ensure the page is fully loaded before executing.
