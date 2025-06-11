document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll(".activity-card");

    cards.forEach(card => {
        card.addEventListener("mouseover", () => {
            card.style.backgroundColor = "#5FAF00";
        });

        card.addEventListener("mouseout", () => {
            card.style.backgroundColor = "#7ED321";
        });
    });
});
