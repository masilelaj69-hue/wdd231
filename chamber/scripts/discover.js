import { discoverItems } from "../data/discover.mjs";

// Display the 8 discover cards
const grid = document.querySelector("#discover-grid");

discoverItems.forEach((item, index) => {
    const card = document.createElement("article");

    card.className = `card card-${index + 1}`;

    card.innerHTML = `
        <h2>${item.name}</h2>
        <figure>
            <img src="${item.image}" alt="${item.name}" loading="lazy">
        </figure>
        <address>${item.address}</address>
        <p>${item.description}</p>
        <button type="button">Learn More</button>
    `;

    grid.appendChild(card);
});


// Last visit message
const visitMessage = document.querySelector("#visit-message");
const lastVisit = localStorage.getItem("lastVisit");
const currentVisit = Date.now();

if (!lastVisit) {
    visitMessage.textContent =
        "Welcome! Let us know if you have any questions.";
} else {
    const difference = currentVisit - Number(lastVisit);
    const days = Math.floor(
        difference / (1000 * 60 * 60 * 24)
    );

    if (days < 1) {
        visitMessage.textContent =
            "Back so soon! Awesome!";
    } else {
        const word = days === 1 ? "day" : "days";

        visitMessage.textContent =
            `You last visited ${days} ${word} ago.`;
    }
}

localStorage.setItem("lastVisit", currentVisit);