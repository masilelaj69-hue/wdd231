const musicContainer = document.querySelector("#music-container");
const searchInput = document.querySelector("#search");
const genreFilter = document.querySelector("#genre-filter");
const modal = document.querySelector("#music-modal");
const modalContent = document.querySelector("#modal-content");

let musicData = [];

async function loadMusic() {
    try {
        const response = await fetch("data/music.json");

        if (!response.ok) {
            throw new Error("Could not load music data.");
        }

        musicData = await response.json();

        createGenreOptions();
        displayMusic(musicData);
    } catch (error) {
        console.error("Music error:", error);

        if (musicContainer) {
            musicContainer.innerHTML = `
                <div class="empty-message">
                    <h2>Music could not be loaded</h2>
                    <p>Please refresh the page.</p>
                </div>
            `;
        }
    }
}

function getFavorites() {
    try {
        return JSON.parse(localStorage.getItem("favorites")) || [];
    } catch (error) {
        return [];
    }
}

function displayMusic(music) {
    if (!musicContainer) {
        return;
    }

    const favorites = getFavorites();

    musicContainer.innerHTML = music.map((item) => {
        const saved = favorites.some(
            (favorite) => Number(favorite.id) === Number(item.id)
        );

        return `
            <article class="music-card">
                <img
                    src="images/music.webp"
                    alt="${item.genre} music"
                    width="600"
                    height="400"
                    loading="lazy">

                <span class="music-number">#${item.id}</span>

                <h3>${item.track}</h3>

                <p>
                    <strong>Artist:</strong> ${item.artist}
                </p>

                <div class="music-meta">
                    <span>${item.genre}</span>
                    <span>${item.year}</span>
                    <span>${item.country}</span>
                </div>

                <p>${item.description}</p>

                <div class="card-buttons">
                    <button
                        class="card-button"
                        type="button"
                        data-action="details"
                        data-id="${item.id}">
                        Details
                    </button>

                    <button
                        class="card-button favorite-button"
                        type="button"
                        data-action="favorite"
                        data-id="${item.id}"
                        aria-pressed="${saved}">
                        ${saved ? "★ Saved" : "☆ Save"}
                    </button>
                </div>
            </article>
        `;
    }).join("");
}

function createGenreOptions() {
    if (!genreFilter) {
        return;
    }

    const genres = [...new Set(
        musicData.map((item) => item.genre)
    )].sort();

    genreFilter.innerHTML = `
        <option value="all">All genres</option>
        ${genres.map((genre) => `
            <option value="${genre}">${genre}</option>
        `).join("")}
    `;
}

function filterMusic() {
    const search = searchInput
        ? searchInput.value.toLowerCase().trim()
        : "";

    const genre = genreFilter
        ? genreFilter.value
        : "all";

    const filtered = musicData.filter((item) => {
        const matchesSearch =
            item.artist.toLowerCase().includes(search) ||
            item.track.toLowerCase().includes(search) ||
            item.genre.toLowerCase().includes(search) ||
            item.country.toLowerCase().includes(search);

        const matchesGenre =
            genre === "all" || item.genre === genre;

        return matchesSearch && matchesGenre;
    });

    displayMusic(filtered);
}

function toggleFavorite(id) {
    let favorites = getFavorites();

    const index = favorites.findIndex(
        (favorite) => Number(favorite.id) === Number(id)
    );

    if (index !== -1) {
        favorites.splice(index, 1);
    } else {
        const item = musicData.find(
            (music) => Number(music.id) === Number(id)
        );

        if (item) {
            favorites.push(item);
        }
    }

    localStorage.setItem(
        "favorites",
        JSON.stringify(favorites)
    );

    filterMusic();
}

function openModal(id) {
    if (!modal || !modalContent) {
        return;
    }

    const item = musicData.find(
        (music) => Number(music.id) === Number(id)
    );

    if (!item) {
        return;
    }

    modalContent.innerHTML = `
        <button
            class="modal-close"
            type="button"
            aria-label="Close">
            ×
        </button>

        <img
            src="images/music.webp"
            alt="${item.genre} music"
            width="600"
            height="400">

        <p class="eyebrow">${item.genre}</p>

        <h2>${item.track}</h2>

        <p><strong>Artist:</strong> ${item.artist}</p>
        <p><strong>Year:</strong> ${item.year}</p>
        <p><strong>Country:</strong> ${item.country}</p>
        <p>${item.description}</p>
    `;

    modal.classList.add("show");
    modal.setAttribute("aria-hidden", "false");

    const closeButton =
        modalContent.querySelector(".modal-close");

    if (closeButton) {
        closeButton.addEventListener("click", closeModal);
    }
}

function closeModal() {
    if (!modal) {
        return;
    }

    modal.classList.remove("show");
    modal.setAttribute("aria-hidden", "true");
}

if (musicContainer) {
    musicContainer.addEventListener("click", (event) => {
        const button = event.target.closest("button");

        if (!button) {
            return;
        }

        const id = Number(button.dataset.id);

        if (button.dataset.action === "details") {
            openModal(id);
        }

        if (button.dataset.action === "favorite") {
            toggleFavorite(id);
        }
    });
}

if (searchInput) {
    searchInput.addEventListener("input", filterMusic);
}

if (genreFilter) {
    genreFilter.addEventListener("change", filterMusic);
}

if (modal) {
    modal.addEventListener("click", (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });
}

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        closeModal();
    }
});

loadMusic();