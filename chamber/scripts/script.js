document.addEventListener("DOMContentLoaded", function () {
    // Display Current Copyright Year
    const currentYear = new Date().getFullYear();
    document.getElementById("copyrightYear").textContent = currentYear;

    // Auto-update last modification date
    document.getElementById("lastModified").textContent = document.lastModified;

    // Fetch and display members
    fetchMembers();
});

    // Toggle Mobile Navigation Menu
    document.getElementById("menu-toggle").addEventListener("click", function() {
        const navMenu = document.querySelector("nav ul");
        navMenu.classList.toggle("show-menu");
    });


async function fetchMembers() {
    try {
        const response = await fetch("data/members.json");
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        const members = await response.json();
        displayMembers(members);
    } catch (error) {
        console.error("Error fetching member data:", error);
        document.getElementById("directoryContainer").innerHTML = "<p>Error loading member data. Please try again later.</p>";
    }
}

function displayMembers(members) {
    const container = document.getElementById("directoryContainer");
    container.innerHTML = ""; 

    members.forEach(member => {
        const memberCard = document.createElement("article");
        memberCard.classList.add("business-card");

        // Create image element with fallback
        const imgElement = document.createElement("img");
        imgElement.src = `images/${member.image}`;
        imgElement.alt = `${member.name} Logo`;
        imgElement.onerror = () => imgElement.src = "images/default-logo.png"; // Fallback image

        memberCard.appendChild(imgElement);

        memberCard.innerHTML += `
            <h3>${member.name}</h3>
            <p>${member.description}</p>
            <p><strong>Address:</strong> ${member.address}</p>
            <p><strong>Phone:</strong> ${member.phone}</p>
            <p><strong>Website:</strong> <a href="${member.website}" target="_blank">${member.website}</a></p>
        `;
        
        container.appendChild(memberCard);
    });
}

// Toggle between Grid and List View with accessibility improvements
document.getElementById("gridView").addEventListener("click", function() {
    const container = document.getElementById("directoryContainer");
    container.classList.add("grid");
    container.classList.remove("list");
    this.setAttribute("aria-pressed", "true");
    document.getElementById("listView").setAttribute("aria-pressed", "false");
});

document.getElementById("listView").addEventListener("click", function() {
    const container = document.getElementById("directoryContainer");
    container.classList.add("list");
    container.classList.remove("grid");
    this.setAttribute("aria-pressed", "true");
    document.getElementById("gridView").setAttribute("aria-pressed", "false");
});
