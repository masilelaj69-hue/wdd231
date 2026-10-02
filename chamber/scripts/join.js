// Set the current date and time in the hidden form field
const timestamp = document.querySelector("#timestamp");

if (timestamp) {
    timestamp.value = new Date().toISOString();
}


// Open membership information modals
const modalButtons = document.querySelectorAll(".modal-button");

modalButtons.forEach((button) => {

    button.addEventListener("click", () => {

        const modalId = button.dataset.modal;
        const modal = document.querySelector(`#${modalId}`);

        if (modal) {
            modal.showModal();
        }

    });

});


// Close membership information modals
const closeButtons = document.querySelectorAll(".close-modal");

closeButtons.forEach((button) => {

    button.addEventListener("click", () => {

        const modal = button.closest("dialog");

        if (modal) {
            modal.close();
        }

    });

});


// Close modal when clicking outside the dialog
const dialogs = document.querySelectorAll("dialog");

dialogs.forEach((dialog) => {

    dialog.addEventListener("click", (event) => {

        const rectangle = dialog.getBoundingClientRect();

        const clickedInside =
            event.clientX >= rectangle.left &&
            event.clientX <= rectangle.right &&
            event.clientY >= rectangle.top &&
            event.clientY <= rectangle.bottom;

        if (!clickedInside) {
            dialog.close();
        }

    });

});