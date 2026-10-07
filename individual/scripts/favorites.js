const favoritesContainer = document.querySelector("#favorites-container");

function getFavorites() {
    try {
        return JSON.parse(localStorage.getItem("favorites")) || [];
    } catch (error) {
        console.error("Unable to read favorites:", error);
        return [];
    }
}

function displayFavorites() {
    const favorites = getFavorites();

    if (!favoritesContainer) {
        return;
    }

    if (favorites.length === 0) {
        favoritesContainer.innerHTML = `
            <div class="empty-message">
                <h2>No saved music yet</h2>
                <p>
                    Go to the Discover page and save the tracks you like.
                </p>
                <a class="button" href="discover.html">
                    Discover Music
                </a>
            </div>
        `;
        return;
    }

    favoritesContainer.innerHTML = favorites.map((item) => `
        <article class="music-card">
            <span class="music-number">#${item.id}</span>

            <h3>${item.track}</h3>

            <p><strong>Artist:</strong> ${item.artist}</p>

            <div class="music-meta">
                <span>${item.genre}</span>
                <span>${item.year}</span>
                <span>${item.country}</span>
            </div>

            <p>${item.description}</p>

            <div class="card-buttons">
                <button
                    class="card-button remove-button"
                    type="button"
                    data-id="${item.id}">
                    Remove
                </button>
            </div>
        </article>
    `).join("");
}

function removeFavorite(id) {
    const favorites = getFavorites();

    const updatedFavorites = favorites.filter(
        (item) => item.id !== id
    );

    localStorage.setItem(
        "favorites",
        JSON.stringify(updatedFavorites)
    );

    displayFavorites();
}

if (favoritesContainer) {
    favoritesContainer.addEventListener("click", (event) => {
        const button = event.target.closest(".remove-button");

        if (!button) {
            return;
        }

        const id = Number(button.dataset.id);

        removeFavorite(id);
    });
}

displayFavorites();