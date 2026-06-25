// initialize card variables
let cards = [];

/* using Fetch API async/await
loadCards();

// implement the Fetch API to grab the card JSON file
async function loadCards() {
    try {
        // fetch the JSON file
        let response = await fetch("./data/card_info.json");
        // parse the JSON file
        let cardsArray = await response.json();
        console.log(cardsArray);
    } catch (error) {
        console.log(error);
    }
};
*/

fetch("./data/card_info.json")
    .then(response => response.json())
    .then((data) => {
        // OPTION 1 using MAP
        const cardsWithMap = data.map(card => [card, card]).flat();
        console.log(cardsWithMap);
    })
    .catch((error) => {
        console.log("Error fetching card data: ", error);
    }); 