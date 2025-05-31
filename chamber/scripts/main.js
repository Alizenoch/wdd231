// Menu Toggle
document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.getElementById("menu-toggle");
    const menu = document.getElementById("nav-menu");

    if (menuToggle && menu) {
        menuToggle.addEventListener("click", function () {
            const isOpen = menu.classList.toggle("open");
            this.setAttribute("aria-expanded", isOpen);
        });
    } else {
        console.error("Menu toggle or nav menu not found in the document.");
    }
});


// Dynamic Year Update
document.getElementById('copyrightYear').textContent = new Date().getFullYear();

// Last Modified Date
//document.getElementById('lastModified').textContent = document.lastModified;
document.getElementById('lastModified').textContent = new Date(document.lastModified).toLocaleString();


// Weather Data Simulation
const apiKey = '07f8b66b3e6a870e4feabe95381bdeb9';
const city = 'Port Moresby';
const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

fetch(url)
  .then(response => response.json())
  .then(data => {
    // Extract current weather
    document.querySelector('.weather-temp').innerText = `${data.list[0].main.temp}°C`;
    document.querySelector('.weather-details').innerHTML = `
      <div>Condition: ${data.list[0].weather[0].description}</div>
      <div>Humidity: ${data.list[0].main.humidity}%</div>
      <div>Sunrise: ${new Date(data.city.sunrise * 1000).toLocaleTimeString()}</div>
      <div>Sunset: ${new Date(data.city.sunset * 1000).toLocaleTimeString()}</div>
    `;

    // Extract 3-day forecast
    const forecastContainer = document.querySelector('.weather-forecast');
    forecastContainer.innerHTML = '<h3>3-Day Forecast</h3>';
    
    for (let i = 1; i <= 3; i++) {
      const forecast = data.list[i * 8]; // Every 24 hours (8 * 3-hour intervals)
      forecastContainer.innerHTML += `
        <div>
          <strong>${new Date(forecast.dt * 1000).toLocaleDateString()}</strong>
          <p>Temp: ${forecast.main.temp}°C</p>
          <p>Condition: ${forecast.weather[0].description}</p>
        </div>
      `;
    }
  })
  .catch(error => {
    console.error("Error fetching weather data:", error);
    document.querySelector(".weather-temp").innerText = "Weather data unavailable";
    document.querySelector(".weather-details").innerHTML = "<p>Could not retrieve weather information.</p>";
});


// Fetch Chamber Members JSON
// Fetch and display members
    fetchMembers();


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





