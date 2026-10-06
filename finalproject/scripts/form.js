const params = new URLSearchParams(window.location.search);

const name = params.get("name");
const email = params.get("email");
const topic = params.get("topic");
const message = params.get("message");

const submittedName = document.querySelector("#submitted-name");
const submittedEmail = document.querySelector("#submitted-email");
const submittedTopic = document.querySelector("#submitted-topic");
const submittedMessage = document.querySelector("#submitted-message");

submittedName.textContent = name || "Not provided";
submittedEmail.textContent = email || "Not provided";
submittedTopic.textContent = topic || "Not provided";
submittedMessage.textContent = message || "Not provided";

const currentYear = document.querySelector("#current-year");
const lastModified = document.querySelector("#lastModified");

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}

if (lastModified) {
    lastModified.textContent = document.lastModified;
}