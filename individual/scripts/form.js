const formData = new URLSearchParams(window.location.search);

const name = formData.get("name");
const email = formData.get("email");
const favorite = formData.get("favorite");
const message = formData.get("message");

const formSection = document.querySelector(".form-section");

if (name && email && favorite && message) {
    formSection.innerHTML = `
        <p class="eyebrow">Message received</p>

        <h1>Thank You, ${name}!</h1>

        <p>
            Your message has been received by House Vibe.
        </p>

        <div class="music-card">
            <h2>Your Submission</h2>

            <p>
                <strong>Name:</strong> ${name}
            </p>

            <p>
                <strong>Email:</strong> ${email}
            </p>

            <p>
                <strong>Favorite Artist:</strong> ${favorite}
            </p>

            <p>
                <strong>Message:</strong> ${message}
            </p>
        </div>

        <div class="card-buttons">
            <a class="button" href="discover.html">
                Discover Music
            </a>

            <a class="card-button" href="index.html">
                Back Home
            </a>
        </div>
    `;
}