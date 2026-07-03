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
        /*
        // OPTION 1 using MAP
        const cardsWithMap = data.map(card => [card, card]).flat();
        console.log(cardsWithMap);
        */

        /*
        // OPTION 2 using flatmap()
        const cardsWithFlatMap = data.flatMap(card => {
            return [card, card];
        })
        console.log(cardsWithFlatMap);
        */

        // OPTION 3 ( easiest )
        cards = [...data, ...data];
        
        // deal our cards
        dealCards();
    })
    .catch((error) => {
        console.log("Error fetching card data: ", error);
    });
    
function dealCards(cards) {
    console.log('welcome to the random card game');

    for (const card of cards) {
        // OPTION 1: Directly adding created elements to the DOM
        // #1. create the card wrapper
        let cardElement = document.createElement("div");
        cardElement.classList.add("card");
        cardElement.setAttribute("data-name", card.name);
        // #2 add the front and back of the card
        cardElement.innerHTML = `
            <div class="back">
                <img class="back-image" src="${card.image}">
            </div>
            <div class="front">
            </div>
        `;
    }

}