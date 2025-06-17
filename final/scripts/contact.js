document.addEventListener("DOMContentLoaded", async () => {
    try {
        // Set copyright year and last modified date
        document.getElementById("copyrightYear").textContent = new Date().getFullYear();
        document.getElementById("lastModified").textContent = document.lastModified;

        // Handle form submission and store user input
        const form = document.getElementById("enrollmentForm");

        if (form) {
            form.addEventListener("submit", (event) => {
                event.preventDefault();
                alert("Thank you for enrolling! We’ll reach out soon.");

                const formData = new FormData(form);
                formData.forEach((value, key) => {
                    localStorage.setItem(key, value);
                });
            });

            // Restore form values securely
            const inputs = form.querySelectorAll("input, select, textarea");
            inputs.forEach(input => {
                const storedValue = localStorage.getItem(input.name);
                if (storedValue) input.value = storedValue;
            });
        }

        // FAQ Toggle with Local Storage
        const faqButtons = document.querySelectorAll(".faq-question");
        faqButtons.forEach((button, index) => {
            const answer = button.nextElementSibling;

            // Retrieve previous state
            const storedState = localStorage.getItem(`faq-${index}`);
            if (storedState === "block") answer.classList.add("visible");

            button.addEventListener("click", () => {
                answer.classList.toggle("visible");
                localStorage.setItem(`faq-${index}`, answer.classList.contains("visible") ? "block" : "none");
            });
        });

    } catch (error) {
        console.error("Error initializing contact page:", error);
    }
});

// Close modal functionality (if applicable)
document.querySelector(".close")?.addEventListener("click", () => {
    document.getElementById("activity-modal").style.display = "none";
});
