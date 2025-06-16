document.addEventListener("DOMContentLoaded", function() {
    // Set copyright year and last modified date
    const year = new Date().getFullYear();
    document.getElementById("copyrightYear").textContent = year;
    document.getElementById("lastModified").textContent = document.lastModified;
});

// Fetch and display activities
document.addEventListener("DOMContentLoaded", () => {
    fetch("data/activities.json")
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById("activity-list");
            data.forEach((activity, index) => {
                const item = document.createElement("div");
                item.classList.add("activity-card");
                item.dataset.activityId = index; // Assign unique data attribute
                
                item.innerHTML = `
                    <img src="${activity.image}" alt="${activity.name}">
                    <h3>${activity.name}</h3>
                    <p><strong>Category:</strong> ${activity.category}</p>
                    <p><strong>Age Group:</strong> ${activity.ageGroup}</p>
                `;
                
                container.appendChild(item);
            });

            // Restore previously selected activity from Local Storage
            const savedActivityId = localStorage.getItem("selectedActivityId");
            if (savedActivityId) {
                highlightSelectedActivity(savedActivityId);
            }
        })
        .catch(error => console.error("Error loading activities:", error));
});

// Store preferred category selection
document.getElementById("category-select").addEventListener("change", (event) => {
    localStorage.setItem("preferredCategory", event.target.value);
});

// Restore category selection on reload
document.addEventListener("DOMContentLoaded", () => {
    const savedCategory = localStorage.getItem("preferredCategory");
    if (savedCategory) {
        document.getElementById("category-select").value = savedCategory;
    }
});

// Store and retrieve selected activity
document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".activity-card").forEach(card => {
        card.addEventListener("click", () => {
            const activityId = card.dataset.activityId;

            // Store selected activity ID
            localStorage.setItem("selectedActivityId", activityId);
            
            // Update modal content
            document.getElementById("modal-title").innerText = card.querySelector("h3").innerText;
            document.getElementById("modal-description").innerHTML = `<strong>Category:</strong> ${card.querySelector("p").innerText}`;
            document.getElementById("activity-modal").style.display = "block";

            // Highlight selected activity
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

