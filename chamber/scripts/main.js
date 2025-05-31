// ✅ **Dynamic Year Update**
document.getElementById('copyrightYear').textContent = new Date().getFullYear();

// ✅ **Last Modified Date**
const lastModifiedElement = document.getElementById("lastModified");
if (document.lastModified) {
    lastModifiedElement.textContent = new Date(document.lastModified).toLocaleString(undefined, {
        weekday: "long", year: "numeric", month: "long", day: "numeric",
        hour: "2-digit", minute: "2-digit", second: "2-digit"
    });
} else {
    lastModifiedElement.textContent = "Last modified date unavailable.";
}

// ✅ **Weather Data Fetch**
const apiKey = localStorage.getItem('weatherApiKey') || 'YOUR_API_KEY_HERE';
const city = 'Port Moresby';
const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

async function fetchWeather() {
    const now = Date.now();
    const cachedData = JSON.parse(localStorage.getItem("weatherData")) || {};
    
    if (cachedData.timestamp && now - cachedData.timestamp < 1800000) { // Use cached data (30 min)
        updateWeatherUI(cachedData.data);
        return;
    }

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Weather API Error: ${response.status}`);
        const data = await response.json();
        
        localStorage.setItem("weatherData", JSON.stringify({ data, timestamp: now }));
        updateWeatherUI(data);
    } catch (error) {
        console.error("Error fetching weather data:", error);

        if (cachedData.data) {
            updateWeatherUI(cachedData.data); // Use last successful response
        } else {
            document.querySelector(".weather-section").innerHTML = `<p>🌦 Unable to fetch weather data. Try again later.</p>`;
        }
    }
}

function updateWeatherUI(data) {
    document.querySelector('.weather-temp').innerText = `${data.list[0].main.temp}°C`;
    document.querySelector('.weather-details').innerHTML = `
        <div>Condition: ${data.list[0].weather[0].description}</div>
        <div>Humidity: ${data.list[0].main.humidity}%</div>
        <div>Sunrise: ${new Date(data.city.sunrise * 1000).toLocaleTimeString()}</div>
        <div>Sunset: ${new Date(data.city.sunset * 1000).toLocaleTimeString()}</div>
    `;
}
fetchWeather();

// ✅ **Fetch Chamber Members JSON**


// ✅ Fetch Chamber Members JSON
async function fetchMembers() {
    try {
        const response = await fetch("data/members.json");
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        const members = await response.json();

        // ✅ Get 2–3 random Gold/Silver members
        const featuredMembers = getRandomFeaturedMembers(members);

        // ✅ Display the selected members
        displayMembers(featuredMembers);
    } catch (error) {
        console.error("Error fetching member data:", error);
        document.getElementById("directoryContainer").innerHTML =
            "<p>Error loading member data. Please try again later.</p>";
    }
}

function getRandomFeaturedMembers(members) {
    // ✅ Filter Gold and Silver members
    const premiumMembers = members.filter(member =>
        member.membership?.toLowerCase() === "gold" || member.membership?.toLowerCase() === "silver"
    );

    // ✅ Shuffle using Fisher-Yates
    for (let i = premiumMembers.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [premiumMembers[i], premiumMembers[j]] = [premiumMembers[j], premiumMembers[i]];
    }

    // ✅ Select 2 or 3 members
    const count = Math.min(premiumMembers.length, Math.floor(Math.random() * 2) + 2); // 2 or 3 max
    return premiumMembers.slice(0, count);
}

function displayMembers(members) {
    const container = document.getElementById("directoryContainer");
    container.innerHTML = "";

    members.forEach(member => {
        const memberCard = document.createElement("article");
        memberCard.classList.add("business-card", member.membership?.toLowerCase());

        const imgElement = document.createElement("img");
        imgElement.src = `images/${member.image}`;
        imgElement.alt = `${member.name} Logo`;
        imgElement.onerror = () => (imgElement.src = "images/default-logo.png");

        memberCard.appendChild(imgElement);

        memberCard.innerHTML += `
            <h3>${member.name}</h3>
            <p>${member.description}</p>
            <p><strong>Address:</strong> ${member.address}</p>
            <p><strong>Phone:</strong> ${member.phone}</p>
            <p><strong>Website:</strong> <a href="${member.website}" target="_blank" rel="noopener">${member.website}</a></p>
            <p class="membership-level">Membership: ${member.membership}</p>
        `;

        container.appendChild(memberCard);
    });
}

// ✅ Toggle between Grid and List View
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("gridView").addEventListener("click", function () {
        const container = document.getElementById("directoryContainer");
        container.classList.add("grid");
        container.classList.remove("list");
        this.setAttribute("aria-pressed", "true");
        document.getElementById("listView").setAttribute("aria-pressed", "false");
    });

    document.getElementById("listView").addEventListener("click", function () {
        const container = document.getElementById("directoryContainer");
        container.classList.add("list");
        container.classList.remove("grid");
        this.setAttribute("aria-pressed", "true");
        document.getElementById("gridView").setAttribute("aria-pressed", "false");
    });
});

// ✅ Call the function to fetch and display members
fetchMembers();
