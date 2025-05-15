document.addEventListener("DOMContentLoaded", function() {
    let logo = document.getElementById("logo");

    logo.addEventListener("mouseover", function() {
        logo.style.opacity = "0.7"; // Slight fade effect
    });

    logo.addEventListener("mouseout", function() {
        logo.style.opacity = "1"; // Restore original look
    });
});
