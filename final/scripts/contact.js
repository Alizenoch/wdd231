document.addEventListener("DOMContentLoaded", function() {
    // Set copyright year and last modified date
    const year = new Date().getFullYear();
    document.getElementById("copyrightYear").textContent = year;
    document.getElementById("lastModified").textContent = document.lastModified;
});

// Handle form submission and store user input
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("enrollmentForm");

    if (form) {
        form.addEventListener("submit", (event) => {
            event.preventDefault();
            alert("Thank you for enrolling! We’ll reach out soon.");

            // Store form values in local storage
            const formData = new FormData(form);
            formData.forEach((value, key) => {
                localStorage.setItem(key, value);
            });
        });

        // Restore form values on page load
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

        // Retrieve previous state from local storage
        const storedState = localStorage.getItem(`faq-${index}`);
        answer.style.display = storedState === "block" ? "block" : "none";

        button.addEventListener("click", () => {
            const isVisible = answer.style.display === "block";
            answer.style.display = isVisible ? "none" : "block";

            // Save updated state
            localStorage.setItem(`faq-${index}`, answer.style.display);
        });
    });
});
