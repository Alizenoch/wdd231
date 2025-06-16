// Set the current year for the copyright notice
        document.addEventListener("DOMContentLoaded", function() {
            const year = new Date().getFullYear();
            document.getElementById("copyrightYear").textContent = year;
            document.getElementById("lastModified").textContent = document.lastModified;
        });

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("enrollmentForm");
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        alert("Thank you for enrolling! We’ll reach out soon.");
    });

    const faqButtons = document.querySelectorAll(".faq-question");
    faqButtons.forEach(button => {
        button.addEventListener("click", () => {
            const answer = button.nextElementSibling;
            answer.style.display = answer.style.display === "block" ? "none" : "block";
        });
    });
});
