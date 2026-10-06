const dialog = document.querySelector("#strategy-modal");

const modalTitle = document.querySelector("#modal-title");
const modalCategory = document.querySelector("#modal-category");
const modalTimeframe = document.querySelector("#modal-timeframe");
const modalRisk = document.querySelector("#modal-risk");
const modalDifficulty = document.querySelector("#modal-difficulty");
const modalDescription = document.querySelector("#modal-description");

const closeModalBtn = document.querySelector("#close-modal");

/* ===========================
   OPEN MODAL
=========================== */

export function openModal(strategy) {

    if (!dialog) return;

    modalTitle.textContent = strategy.name;

    modalCategory.textContent = `Category: ${strategy.category}`;

    modalTimeframe.textContent = `Timeframe: ${strategy.timeframe}`;

    modalRisk.textContent = `Risk: ${strategy.risk}`;

    modalDifficulty.textContent = `Difficulty: ${strategy.difficulty}`;

    modalDescription.textContent = strategy.description;

    dialog.showModal();

}

/* ===========================
   INITIALIZE MODAL
=========================== */

export function initModal() {

    if (!dialog || !closeModalBtn) return;

    closeModalBtn.addEventListener("click", () => {

        dialog.close();

    });

    dialog.addEventListener("click", (event) => {

        const rect = dialog.getBoundingClientRect();

        const clickedOutside =
            event.clientX < rect.left ||
            event.clientX > rect.right ||
            event.clientY < rect.top ||
            event.clientY > rect.bottom;

        if (clickedOutside) {
            dialog.close();
        }

    });

}