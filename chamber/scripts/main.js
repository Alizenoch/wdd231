// Menu Toggle
document.getElementById('menu-toggle').addEventListener('click', function () {
    const menu = document.getElementById('nav-menu');
    menu.classList.toggle('open');
});

// Dynamic Year Update
document.getElementById('copyrightYear').textContent = new Date().getFullYear();

// Last Modified Date
document.getElementById('lastModified').textContent = document.lastModified;

// Weather Data Simulation
const weatherData = {
    temperature: '75°F',
    condition: 'Partly Cloudy',
    high: '85°F',
    low: '52°F',
    humidity: '34%',
    sunrise: '7:30 AM',
    sunset: '9:59 PM'
};

function updateWeather() {
    const weatherBox = document.querySelector('.weather-box');
    weatherBox.innerHTML = `
        <div class="box-header">⛅ Current Weather</div>
        <div class="current-weather">
            <div class="weather-row">
                <img src="images/partly-cloudy-icon.webp" alt="${weatherData.condition}" class="weather-icon">
                <span class="weather-temp">${weatherData.temperature}</span>
            </div>
            <div class="weather-details">
                <div>Condition: ${weatherData.condition}</div>
                <div>High: ${weatherData.high}</div>
                <div>Low: ${weatherData.low}</div>
                <div>Humidity: ${weatherData.humidity}</div>
                <div>Sunrise: ${weatherData.sunrise}</div>
                <div>Sunset: ${weatherData.sunset}</div>
            </div>
        </div>`;
}

// Run Weather Update
updateWeather();


