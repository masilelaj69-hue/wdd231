const params = new URLSearchParams(window.location.search);


document.querySelector("#firstName").textContent =
    params.get("firstName") || "Not provided";


document.querySelector("#lastName").textContent =
    params.get("lastName") || "Not provided";


document.querySelector("#email").textContent =
    params.get("email") || "Not provided";


document.querySelector("#phone").textContent =
    params.get("phone") || "Not provided";


document.querySelector("#organization").textContent =
    params.get("organization") || "Not provided";


const timestamp = params.get("timestamp");


if (timestamp) {

    document.querySelector("#timestamp").textContent =
        new Date(timestamp).toLocaleString();

} else {

    document.querySelector("#timestamp").textContent =
        "Not provided";

}