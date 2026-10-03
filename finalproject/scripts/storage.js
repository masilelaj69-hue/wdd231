const STORAGE_KEY = "southAfricaExplorerVisited";

export function setupStorage() {

    const currentPage = window.location.pathname;

    localStorage.setItem(
        STORAGE_KEY,
        currentPage
    );

    const savedPage = localStorage.getItem(
        STORAGE_KEY
    );

    console.log(
        `South Africa Explorer last visited page: ${savedPage}`
    );
}