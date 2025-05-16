document.addEventListener("DOMContentLoaded", () => {
    const filterButtons = document.querySelectorAll(".filter-btn");
    const courseButtons = document.querySelectorAll(".courses button");
    const totalCreditsDiv = document.getElementById("total-credits");

    function updateTotalCredits() {
        let total = 0;
        courseButtons.forEach(course => {
            if (course.style.display !== "none") {
                total += Number(course.getAttribute("data-credits")) || 0;
            }
        });
        if (totalCreditsDiv) {
            totalCreditsDiv.textContent = `Total Credits: ${total}`;
        }
    }

    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            const filter = button.textContent;
            courseButtons.forEach(course => {
                if (filter === "All" || course.getAttribute("data-type") === filter) {
                    course.style.display = "inline-block";
                } else {
                    course.style.display = "none";
                }
            });
            updateTotalCredits();
        });
    });

    // Initial total credits calculation
    updateTotalCredits();
});


