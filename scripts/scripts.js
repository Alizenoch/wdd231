document.addEventListener("DOMContentLoaded", () => {
    const filterButtons = document.querySelectorAll(".filter-btn");
    
    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            alert(`Filtering by: ${button.textContent}`);
        });
    });
});
