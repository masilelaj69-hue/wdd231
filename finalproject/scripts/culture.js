const cultureContainer = document.querySelector("#culture-container");

const cultureData = [
    {
        name: "Bobotie",
        type: "Food",
        description: "A baked dish made with spiced minced meat and topped with an egg-based mixture.",
        experience: "Try it with yellow rice and traditional side dishes."
    },
    {
        name: "Biltong",
        type: "Food",
        description: "A popular South African dried meat snack prepared with spices and vinegar.",
        experience: "Enjoy it as a snack or as part of a South African food experience."
    },
    {
        name: "Bunny Chow",
        type: "Food",
        description: "A Durban dish made by filling a hollowed-out loaf of bread with curry.",
        experience: "Experience this popular Durban street-food tradition."
    },
    {
        name: "Boerewors",
        type: "Food",
        description: "A traditional South African sausage commonly prepared for a braai.",
        experience: "Enjoy it at a traditional South African braai."
    },
    {
        name: "Pap",
        type: "Food",
        description: "A maize-based staple food commonly served with meat, vegetables, or sauces.",
        experience: "Try it as part of a traditional meal."
    },
    {
        name: "Malva Pudding",
        type: "Food",
        description: "A sweet baked dessert traditionally served warm with custard or cream.",
        experience: "Enjoy it after a traditional South African meal."
    },
    {
        name: "Braai",
        type: "Tradition",
        description: "A social outdoor cooking tradition where friends and families gather around a fire.",
        experience: "Share food and conversation around a traditional braai."
    },
    {
        name: "Traditional Music",
        type: "Music",
        description: "South Africa has many musical traditions representing its diverse communities.",
        experience: "Listen to local music and learn about different musical styles."
    },
    {
        name: "Traditional Dance",
        type: "Dance",
        description: "Traditional dances are an important part of celebrations and cultural events.",
        experience: "Watch a cultural performance when visiting local events."
    },
    {
        name: "Beadwork",
        type: "Arts",
        description: "Decorative beadwork is an important artistic tradition in several South African communities.",
        experience: "Explore locally made crafts and artwork."
    },
    {
        name: "Pottery",
        type: "Arts",
        description: "Traditional and modern pottery can be found among South African artists and communities.",
        experience: "Visit craft markets and discover locally made pottery."
    },
    {
        name: "Heritage Sites",
        type: "History",
        description: "South Africa has many places that preserve important stories and cultural heritage.",
        experience: "Visit museums and heritage sites to learn about the country's history."
    },
    {
        name: "Local Markets",
        type: "Community",
        description: "Markets provide opportunities to experience local food, crafts, art, and community life.",
        experience: "Explore a local market and support small businesses."
    },
    {
        name: "South African Jazz",
        type: "Music",
        description: "Jazz has played an important role in South African musical history and culture.",
        experience: "Listen to South African jazz artists and live performances."
    },
    {
        name: "Cape Malay Cuisine",
        type: "Food",
        description: "Cape Malay cuisine includes aromatic spices, curries, and dishes influenced by Cape Town's history.",
        experience: "Explore Cape Town food experiences and traditional dishes."
    },
    {
        name: "Zulu Cultural Experiences",
        type: "Culture",
        description: "Learn about Zulu traditions, crafts, music, dance, and community heritage.",
        experience: "Visit cultural attractions and learn from local communities."
    }
];


function displayCulture(items) {

    cultureContainer.innerHTML = items.map(item => `
        <article class="feature-card">

            <p class="eyebrow">
                ${item.type}
            </p>

            <h3>
                ${item.name}
            </h3>

            <p>
                ${item.description}
            </p>

            <p>
                <strong>Experience:</strong>
                ${item.experience}
            </p>

        </article>
    `).join("");
}


displayCulture(cultureData);