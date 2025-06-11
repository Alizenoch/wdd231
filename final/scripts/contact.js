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
