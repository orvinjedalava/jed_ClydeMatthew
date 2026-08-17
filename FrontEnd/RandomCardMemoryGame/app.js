// initialize card variables
let cards = [];
let cardTable = document.querySelector(".card-table");
let firstCard = null;
let secondCard = null;
let noFlipping = false;

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

        // shuffle our cards
        let shuffledCards = shuffle();
        
        // deal our cards
        dealCards(shuffledCards);
    })
    .catch((error) => {
        console.log("Error fetching card data: ", error);
    });

function shuffle() {
    // Create a copy of the cards array to avoid mutating the original array.
    let shuffledCardsArray = [...cards];
    let totalCards = shuffledCardsArray.length;
    let currentIndex = totalCards - 1;

    // use Fisher-Yates ( or Knuth ) shuffle algorithm. This method is efficient and ensures that
    // each possible permutation of the array has an equal probability of occurring.

    // OPTION 1
    // Loop through the array from the last element to the first
    // for(currentIndex; currentIndex > 0; currentIndex--) {
    //     // Generate a random index between 0 and currentIndex (inclusive)
    //     let randomCardIndex = Math.floor(Math.random() * (current  + 1));

    //     // Swap the elements at currentIndex and randomIndex using a temporary variable.
    //     let randomCard = shuffledCardsArray[randomCardIndex];
    //     // replace the randomCard with the card at the currentIndex
    //     shuffledCardsArray[randomCardIndex] = shuffledCardsArray[currentIndex];
    //     // replace the card at currentIndex with the randomCard.
    //     shuffledCardsArray[currentIndex] = randomCard;
    // }

    // OPTION 2
    // Swap elements using destructuring assignment in Javascript.
    for(currentIndex; currentIndex > 0; currentIndex--) {
        // Generate a random index between 0 and currentIndex (inclusive)
        let randomCardIndex = Math.floor(Math.random() * (currentIndex  + 1));

        [shuffledCardsArray[currentIndex], shuffledCardsArray[randomCardIndex]] = [shuffledCardsArray[randomCardIndex], shuffledCardsArray[currentIndex]];
    }

    return shuffledCardsArray;
}
    
function dealCards(cards) {
    console.log('welcome to the random card game');

    // OPTION 2: using fragments
    // create a document fragment to minimize reflows ( if you append each card 1 by 1), 
    // this can be innefficient because each appendChild operation may trigger reflows and repaint the browser.
    let fragment = document.createDocumentFragment();
    
    for (const card of cards) {
        // OPTION 1: Directly adding created elements to the DOM
        // #1. create the card wrapper
        // let cardElement = document.createElement("div");
        // cardElement.classList.add("card");
        // cardElement.setAttribute("data-name", card.name);
        // // #2 add the front and back of the card
        // cardElement.innerHTML = `
        //     <div class="back">
        //         <img class="back-image" src="${card.image}">
        //     </div>
        //     <div class="front">
        //     </div>
        // `;
        // cardTable.appendChild(cardElement);

        // OPTION 2: Use fragments
        // create our entre card
        let cardElement = document.createElement("div");
        cardElement.classList.add("card");
        cardElement.setAttribute("data-name", card.name);

        // create both the front and back of the cards, separately.
        // FRONT of card
        let frontCardDiv = document.createElement("div");
        frontCardDiv.classList.add("front");

        // BACK of card
        let backCardDiv = document.createElement("div");
        backCardDiv.classList.add("back");
        // add image to the back of the card.
        let img = document.createElement("img");
        img.classList.add("back-image");
        img.src = `${card.image}`;
        backCardDiv.appendChild(img);

        // append our front and back of the card, to the card itself
        cardElement.append(backCardDiv, frontCardDiv);
        // attach our card to the fragment
        fragment.appendChild(cardElement);
    } // end of for loop

    // append the entire fragment to the live DOM
    cardTable.appendChild(fragment);

    // Attach click event listeners after all cards are added.
    let dealthCards = document.querySelectorAll('.card');
    dealthCards.forEach(card => {
        card.addEventListener("click", flipCard);
    })

}

function flipCard() {
    
    if (noFlipping) { return; }
    // this - represents the HTML Element that triggers the event
    // console.log(this);
    // add a css class to activate the flip effect
    this.classList.add("flipped");
    // grab first card flipped over ( clicked )
    if (!firstCard) {
      firstCard = this;
      return;
    }

    secondCard = this;
    noFlipping = true;
    checkForMatch();
}

function checkForMatch() {
    // dataset propert returns all the key attributes we've attached to that DOM ( e.g. cardElement.setAttribute("data-name", card.name) )
    // let firstName = firstCard.dataset.name;
    // let secondCardName = secondCard.dataset.name;
    let isMatch = firstCard.dataset.name === secondCard.dataset.name;

    isMatch ? matchCards() : unflipCards();
}

function unflipCards() {
    setTimeout(() => {
        firstCard.classList.remove("flipped");
        secondCard.classList.remove("flipped");
        resetFlags();
    }, 1000);
    
}

function resetFlags() {
    firstCard = null;
    secondCard = null;
    noFlipping = false;
}
