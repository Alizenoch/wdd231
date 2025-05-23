document.addEventListener("DOMContentLoaded", function () {
    // Display Current Copyright Year
    const currentYear = new Date().getFullYear();
    document.getElementById("copyrightYear").textContent = currentYear;

    // Auto-update last modification date
    document.getElementById("lastModified").textContent = document.lastModified;

    // Fetch and display members
    fetchMembers();
});

async function fetchMembers() {
    try {
        const response = await fetch("data/members.json");
        const members = await response.json();
        displayMembers(members);
    } catch (error) {
        console.error("Error fetching member data:", error);
    }
}

function displayMembers(members) {
    const container = document.getElementById("directoryContainer");
    container.innerHTML = ""; 

    members.forEach(member => {
        const memberCard = document.createElement("article");
        memberCard.classList.add("business-card");
        memberCard.innerHTML = `
            <img src="images/${member.image}" alt="${member.name} Logo">
            <h3>${member.name}</h3>
            <p>${member.description}</p>
            <p><strong>Address:</strong> ${member.address}</p>
            <p><strong>Phone:</strong> ${member.phone}</p>
            <p><strong>Website:</strong> <a href="${member.website}" target="_blank">${member.website}</a></p>
        `;
        container.appendChild(memberCard);
    });
}

// Toggle between Grid and List View
document.getElementById("gridView").addEventListener("click", function() {
    document.getElementById("directoryContainer").classList.add("grid");
    document.getElementById("directoryContainer").classList.remove("list");
});

document.getElementById("listView").addEventListener("click", function() {
    document.getElementById("directoryContainer").classList.add("list");
    document.getElementById("directoryContainer").classList.remove("grid");
});
