const menuButton = document.querySelector("#menu-button");
const navigation = document.querySelector("#navigation");
const featuredMusic = document.querySelector("#featured-music");
const currentYear = document.querySelector("#current-year");

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}

if (menuButton && navigation) {
    menuButton.addEventListener("click", () => {
        const isOpen = navigation.classList.toggle("open");

        menuButton.setAttribute("aria-expanded", isOpen);
        menuButton.setAttribute(
            "aria-label",
            isOpen ? "Close navigation menu" : "Open navigation menu"
        );
    });
}

async function loadFeaturedMusic() {
    if (!featuredMusic) {
        return;
    }

    try {
        const response = await fetch("data/music.json");

        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }

        const music = await response.json();

        const featured = music.slice(0, 6);

        featuredMusic.innerHTML = featured.map((item) => `
            <article class="music-card">
                <span class="music-number">#${item.id}</span>
                <h3>${item.track}</h3>
                <p>${item.artist}</p>

                <div class="music-meta">
                    <span>${item.genre}</span>
                    <span>${item.year}</span>
                    <span>${item.country}</span>
                </div>

                <p>${item.description}</p>

                <div class="card-buttons">
                    <a class="card-button" href="discover.html">
                        Discover
                    </a>
                </div>
            </article>
        `).join("");
    } catch (error) {
        console.error("Unable to load music data:", error);

        featuredMusic.innerHTML = `
            <p class="empty-message">
                Music is temporarily unavailable. Please try again later.
            </p>
        `;
    }
}

loadFeaturedMusic();