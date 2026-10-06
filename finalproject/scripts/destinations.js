const destinationContainer = document.querySelector("#destination-container");
const categoryFilter = document.querySelector("#category-filter");

const modal = document.querySelector("#destination-modal");
const modalContent = document.querySelector("#modal-content");
const closeModal = document.querySelector("#close-modal");

let destinations = [];


async function getDestinations() {

    try {

        const response = await fetch("data/destinations.json");

        if (!response.ok) {
            throw new Error("Unable to load destination data.");
        }

        destinations = await response.json();

        displayDestinations(destinations);

    } catch (error) {

        console.error("Error loading destinations:", error);

        destinationContainer.innerHTML = `
            <p>
                Sorry, the destination information could not be loaded.
                Please try again later.
            </p>
        `;
    }
}


function displayDestinations(items) {

    if (items.length === 0) {

        destinationContainer.innerHTML = `
            <p>
                No destinations were found for this category.
            </p>
        `;

        return;
    }

    destinationContainer.innerHTML = items.map(destination => `
        <article class="feature-card destination-card">

            <p class="eyebrow">
                ${destination.category}
            </p>

            <h3>
                ${destination.name}
            </h3>

            <p>
                <strong>Province:</strong>
                ${destination.province}
            </p>

            <p>
                ${destination.description}
            </p>

            <p>
                <strong>Highlight:</strong>
                ${destination.highlight}
            </p>

            <button
                class="button details-button"
                data-name="${destination.name}">
                View Details
            </button>

        </article>
    `).join("");

    addDetailEvents();
}


function addDetailEvents() {

    const buttons = document.querySelectorAll(".details-button");

    buttons.forEach(button => {

        button.addEventListener("click", () => {

            const selectedName = button.dataset.name;

            const selectedDestination = destinations.find(
                destination => destination.name === selectedName
            );

            if (selectedDestination) {
                showModal(selectedDestination);
            }

        });

    });
}


function showModal(destination) {

    modalContent.innerHTML = `
        <p class="eyebrow">
            ${destination.category}
        </p>

        <h2>
            ${destination.name}
        </h2>

        <p>
            <strong>Province:</strong>
            ${destination.province}
        </p>

        <p>
            ${destination.description}
        </p>

        <p>
            <strong>Featured experience:</strong>
            ${destination.highlight}
        </p>
    `;

    modal.showModal();
}


categoryFilter.addEventListener("change", () => {

    const selectedCategory = categoryFilter.value;

    if (selectedCategory === "all") {

        displayDestinations(destinations);

    } else {

        const filteredDestinations = destinations.filter(
            destination => destination.category === selectedCategory
        );

        displayDestinations(filteredDestinations);
    }

});


closeModal.addEventListener("click", () => {
    modal.close();
});


modal.addEventListener("click", event => {

    if (event.target === modal) {
        modal.close();
    }

});


getDestinations();