document.addEventListener("DOMContentLoaded", function () {
    const lastModifiedElement = document.getElementById("lastModified");
    lastModifiedElement.textContent = document.lastModified;
});


document.addEventListener("DOMContentLoaded", () => {
    fetch("data/activities.json")
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById("activity-list");
            data.forEach(activity => {
                const item = document.createElement("div");
                item.classList.add("activity-card");
                item.innerHTML = `
                    <img src="${activity.image}" alt="${activity.name}">
                    <h3>${activity.name}</h3>
                    <p><strong>Category:</strong> ${activity.category}</p>
                    <p><strong>Age Group:</strong> ${activity.ageGroup}</p>
                `;
                container.appendChild(item);
            });
        })
        .catch(error => console.error("Error loading activities:", error));
});

document.getElementById("category-select").addEventListener("change", (event) => {
    localStorage.setItem("preferredCategory", event.target.value);
});

document.addEventListener("DOMContentLoaded", () => {
    const savedCategory = localStorage.getItem("preferredCategory");
    if (savedCategory) {
        document.getElementById("category-select").value = savedCategory;
    }
});

document.querySelectorAll(".activity-card").forEach(card => {
    card.addEventListener("click", () => {
        document.getElementById("modal-title").innerText = card.querySelector("h3").innerText;
        document.getElementById("modal-description").innerHTML = `<strong>Category:</strong> ${card.querySelector("p").innerText}`;
        document.getElementById("activity-modal").style.display = "block";
    });
});

document.querySelector(".close").addEventListener("click", () => {
    document.getElementById("activity-modal").style.display = "none";
});

