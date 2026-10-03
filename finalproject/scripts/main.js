import { setupNavigation } from "./navigation.js";
import { setupStorage } from "./storage.js";

document.addEventListener("DOMContentLoaded", () => {
    setupNavigation();
    setupStorage();

    const year = document.querySelector("#current-year");

    if (year) {
        year.textContent = new Date().getFullYear();
    }
});