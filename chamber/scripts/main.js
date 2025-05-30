// Menu Toggle
document.getElementById('menu-toggle').addEventListener('click', function () {
    const menu = document.getElementById('nav-menu');
    const isOpen = menu.classList.toggle('open');
    this.setAttribute('aria-expanded', isOpen);
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
  .catch(error => console.error('Error fetching weather data:', error));

// Fetch Chamber Members JSON
fetch('data/members.json')
  .then(response => response.json())
  .then(data => {
    // Filter only Gold & Silver members
    const eligibleMembers = data.members.filter(member => 
      member.membershipLevel === 'Gold' || member.membershipLevel === 'Silver'
    );

    // Randomly select 2 or 3 members
    const shuffled = eligibleMembers.sort(() => 0.5 - Math.random());
    const selectedMembers = shuffled.slice(0, Math.min(3, shuffled.length));

    // Display Spotlight Ads
    const spotlightContainer = document.querySelector('.business-spotlight');
    spotlightContainer.innerHTML = ''; // Clear previous content

    selectedMembers.forEach(member => {
      const spotlightCard = document.createElement('div');
      spotlightCard.className = 'spotlight-box';
      spotlightCard.innerHTML = `
        <img src="${member.logo}" alt="${member.name}">
        <h3>${member.name}</h3>
        <p>${member.address}</p>
        <p>Phone: ${member.phone}</p>
        <p>Membership Level: ${member.membershipLevel}</p>
        <a href="${member.website}" target="_blank">Visit Website</a>
      `;
      spotlightContainer.appendChild(spotlightCard);
    });
  })
  .catch(error => console.error('Error loading chamber members:', error));


