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

