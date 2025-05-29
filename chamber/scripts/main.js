document.addEventListener("DOMContentLoaded", function () {
    // Smooth Scrolling
    document.querySelectorAll("nav a").forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            const targetId = this.getAttribute("href").substring(1);
            const targetElement = document.getElementById(targetId);
            targetElement.scrollIntoView({ behavior: "smooth" });
        });
    });

    // Lazy Loading Optimization
    function lazyLoadImages() {
        document.querySelectorAll("img[data-src]").forEach(img => {
            img.src = img.dataset.src;
            img.removeAttribute("data-src");
        });
    }

    // Real-Time Weather Update
    function loadWeather() {
        fetch("https://api.openweathermap.org/data/2.5/weather?q=Port%20Moresby&appid=YOUR_API_KEY&units=metric")
            .then(response => response.json())
            .then(data => {
                document.getElementById("weather-status").textContent = `${data.weather[0].description}, ${data.main.temp}°C`;
            })
            .catch(error => console.error("Weather data fetch error:", error));
    }

    loadWeather();
    lazyLoadImages();
});


