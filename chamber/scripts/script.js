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
          <div class="directory-card-img">
            ${member.image
                    ? `<img src="images/${member.image}" alt="${member.name}" style="width:80px;height:80px;object-fit:cover;border-radius:4px;">`
                    : `<svg width="80" height="80"><rect width="80" height="80" fill="#bbb"/><line x1="0" y1="0" x2="80" y2="80" stroke="#888" stroke-width="2"/><line x1="80" y1="0" x2="0" y2="80" stroke="#888" stroke-width="2"/></svg>`
                }
          </div>
          <div class="directory-card-info">
            <p><strong>EMAIL:</strong> ${member.email || 'N/A'}</p>
            <p><strong>PHONE:</strong> ${member.phone}</p>
            <p><strong>URL:</strong> ${member.website.replace(/^https?:\/\//, '')}</p>
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
