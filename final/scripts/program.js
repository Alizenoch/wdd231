document.addEventListener("DOMContentLoaded", async () => {
    try {
        // Set copyright year and last modified date
        document.getElementById("copyrightYear").textContent = new Date().getFullYear();
        document.getElementById("lastModified").textContent = document.lastModified;

        // Fetch activity data directly
        const response = await fetch("data/activities.json");
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        const data = await response.json();
        const container = document.getElementById("activity-list");

        data.forEach((activity, index) => {
            const item = document.createElement("div");
            item.classList.add("activity-card");
            item.dataset.activityId = index;

            item.innerHTML = `
                <img src="${activity.image}" alt="${activity.name}">
                <h3>${activity.name}</h3>
                <p><strong>Category:</strong> ${activity.category}</p>
                <p><strong>Age Group:</strong> ${activity.ageGroup}</p>
            `;

            container.appendChild(item);
        });

        // Restore selected activity
        const savedActivityId = localStorage.getItem("selectedActivityId");
        if (savedActivityId) highlightSelectedActivity(savedActivityId);
    } catch (error) {
        console.error("Error fetching activities:", error);
    }

    // Handle category selection persistence
    document.getElementById("category-select").addEventListener("change", (event) => {
        localStorage.setItem("preferredCategory", event.target.value);
    });

    // Restore category selection on reload
    const savedCategory = localStorage.getItem("preferredCategory");
    if (savedCategory) {
        document.getElementById("category-select").value = savedCategory;
     }

      document.querySelectorAll(".activity-card").forEach(card => {
        card.addEventListener("click", () => {
            const activityId = card.dataset.activityId;
             localStorage.setItem("selectedActivityId", activityId);

            document.getElementById("modal-title").innerText = card.querySelector("h3").innerText;
            document.getElementById("modal-description").innerHTML = `<strong>Category:</strong> ${card.querySelector("p").innerText}`;
            document.getElementById("activity-modal").style.display = "block";

             highlightSelectedActivity(activityId);
        });
    });
});

// Close modal functionality
document.querySelector(".close").addEventListener("click", () => {
    document.getElementById("activity-modal").style.display = "none";
});

// Function to highlight stored activity
function highlightSelectedActivity(activityId) {
    document.querySelectorAll(".activity-card").forEach(card => {
        card.classList.remove("selected");
        if (card.dataset.activityId === activityId) {
            card.classList.add("selected");
        }
    });
}

