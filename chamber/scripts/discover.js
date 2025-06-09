document.addEventListener("DOMContentLoaded", function () {
    const visitMessage = document.getElementById("visit-message");
    const lastVisit = localStorage.getItem("lastVisit");

    const currentDate = new Date();
    localStorage.setItem("lastVisit", currentDate);

    if (!lastVisit) {
        visitMessage.textContent = "Welcome! This is your first visit.";
    } else {
        const lastVisitDate = new Date(lastVisit);
        const timeDifference = Math.floor((currentDate - lastVisitDate) / (1000 * 60 * 60 * 24));

        if (timeDifference < 1) {
            visitMessage.textContent = "Welcome back! You last visited today.";
        } else if (timeDifference < 7) {
            visitMessage.textContent = `It's been ${timeDifference} days since your last visit. Great to see you again!`;
        } else {
            visitMessage.textContent = "Welcome back! It's been a while. Check out what's new!";
        }
    }

         // Function to Fetch and Display JSON Data
    function loadCards() {
        fetch("data/locations.json")
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                const container = document.querySelector(".card-container");
                container.innerHTML = ""; // Clear previous content before adding new

                data.locations.forEach(location => {
                    const card = document.createElement("div");
                    card.classList.add("card");
                    card.innerHTML = `
                        <h2>${location.name}</h2>
                        <figure>
                            <img src="${location.image}" alt="${location.name}" width="300" height="200">
                        </figure>
                        <address>${location.address}</address>
                        <p>${location.description}</p>
                        <button class="learn-more">Learn More</button>
                    `;
                    container.appendChild(card);
                });
            })
            .catch(error => console.error("Error loading JSON data:", error));
    }

    loadCards(); // Call function to load JSON data
});
