document.addEventListener("DOMContentLoaded", () => {
    fetch('data/members.json')
        .then(response => response.json())
        .then(members => {
            const container = document.getElementById('directory-cards');
            container.innerHTML = members.map(member => `
  <div class="directory-card">
    <div class="directory-card-header">
      <h3>${member.name}</h3>
      <p>${member.tagline || ''}</p>
    </div>
    <div class="directory-card-content">
      <div class="directory-card-img">
        ${member.image
          ? `<img src="images/${member.image}" alt="${member.name}">`
          : `<svg width="100" height="100"><rect width="100" height="100" fill="#bbb"/><line x1="0" y1="0" x2="100" y2="100" stroke="#888" stroke-width="2"/><line x1="100" y1="0" x2="0" y2="100" stroke="#888" stroke-width="2"/></svg>`
        }
      </div>
      <div class="directory-card-info">
        <p><strong>EMAIL:</strong> ${member.email || 'N/A'}</p>
        <p><strong>PHONE:</strong> ${member.phone}</p>
        <p><strong>URL:</strong> ${member.website.replace(/^https?:\/\//, '')}</p>
      </div>
    </div>
  </div>
`).join('');
        });
});

document.addEventListener("DOMContentLoaded", function () {
    let logo = document.getElementById("logo");

    logo.addEventListener("mouseover", function () {
        logo.style.opacity = "0.7"; // Slight fade effect
    });

    logo.addEventListener("mouseout", function () {
        logo.style.opacity = "1"; // Restore original look
    });
});
