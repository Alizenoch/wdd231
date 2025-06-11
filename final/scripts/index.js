document.addEventListener("DOMContentLoaded", () => {
    console.log("BrightStart Hub loaded!");

    const ctaButton = document.querySelector(".cta-button");
    ctaButton.addEventListener("mouseover", () => {
        ctaButton.style.backgroundColor = "#5FAF00";
    });

    ctaButton.addEventListener("mouseout", () => {
        ctaButton.style.backgroundColor = "#7ED321";
    });
});
