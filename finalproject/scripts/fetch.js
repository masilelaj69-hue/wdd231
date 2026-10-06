import { openModal } from "./modal.js";

const strategyContainer = document.querySelector("#strategy-container");
const searchInput = document.querySelector("#search");

const DATA_URL = "./data/strategies.json";

let strategies = [];
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

/* ===========================
   LOAD STRATEGIES
=========================== */

export async function loadStrategies() {

    try {

        const response = await fetch(DATA_URL);

        if (!response.ok) {
            throw new Error("Unable to load strategies.");
        }

        strategies = await response.json();

        displayStrategies(strategies);

    } catch (error) {

        console.error(error);

        strategyContainer.innerHTML = `
            <p class="error">
                Failed to load trading strategies.
            </p>
        `;

    }

}

/* ===========================
   DISPLAY STRATEGIES
=========================== */

function displayStrategies(data) {

    strategyContainer.innerHTML = "";

    data.forEach(strategy => {

        const card = document.createElement("article");

        card.className = "strategy-card";

        const favorite = favorites.includes(strategy.id);

        card.innerHTML = `

            <h3>${strategy.name}</h3>

            <p><strong>Category:</strong> ${strategy.category}</p>

            <p><strong>Timeframe:</strong> ${strategy.timeframe}</p>

            <p><strong>Risk:</strong> ${strategy.risk}</p>

            <p><strong>Difficulty:</strong> ${strategy.difficulty}</p>

            <div class="buttons">

                <button
                    class="details-btn"
                    data-id="${strategy.id}">

                    View Details

                </button>

                <button
                    class="favorite-btn"
                    data-id="${strategy.id}">

                    ${favorite ? "★ Favorite" : "☆ Favorite"}

                </button>

            </div>

        `;

        strategyContainer.appendChild(card);

    });

    addButtonEvents();

}

/* ===========================
   BUTTON EVENTS
=========================== */

function addButtonEvents() {

    document.querySelectorAll(".details-btn").forEach(button => {

        button.addEventListener("click", () => {

            const id = Number(button.dataset.id);

            const strategy = strategies.find(item => item.id === id);

            openModal(strategy);

        });

    });

    document.querySelectorAll(".favorite-btn").forEach(button => {

        button.addEventListener("click", () => {

            const id = Number(button.dataset.id);

            toggleFavorite(id);

        });

    });

}

/* ===========================
   LOCAL STORAGE
=========================== */

function toggleFavorite(id) {

    if (favorites.includes(id)) {

        favorites = favorites.filter(item => item !== id);

    } else {

        favorites.push(id);

    }

    localStorage.setItem("favorites", JSON.stringify(favorites));

    displayStrategies(strategies);

}

/* ===========================
   SEARCH
=========================== */

if (searchInput) {
    searchInput.addEventListener("input", () => {
        const keyword = searchInput.value.trim().toLowerCase();

        const filtered = strategies.filter(strategy =>
            Object.values(strategy).some(value =>
                String(value).toLowerCase().includes(keyword)
            )
        );

        displayStrategies(filtered);
    });
}