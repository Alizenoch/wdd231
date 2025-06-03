// Add timestamp to hidden input
document.addEventListener("DOMContentLoaded", () => {
  const timestamp = new Date().toISOString();
  document.getElementById("timestamp").value = timestamp;
});

// Modal Logic
const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modal-title");
const modalBody = document.getElementById("modal-body");
const modalButtons = document.querySelectorAll(".modal-btn");
const closeBtn = document.querySelector(".close");

const benefits = {
  Bronze: "Bronze members get access to events and newsletters.",
  Silver: "Silver members get event invites, business listing, and promo.",
  Gold: "Gold includes all lower benefits + featured ads & networking.",
  Platinum: "All benefits + leadership events, prime visibility, & sponsors."
};

modalButtons.forEach(btn => {
  btn.addEventListener("click", (e) => {
    const level = e.target.closest(".card").dataset.level;
    modalTitle.textContent = `${level} Membership Benefits`;
    modalBody.textContent = benefits[level];
    modal.classList.remove("hidden");
  });
});

closeBtn.addEventListener("click", () => modal.classList.add("hidden"));
window.addEventListener("click", e => {
  if (e.target === modal) modal.classList.add("hidden");
});
