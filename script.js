// Part 1: Number Facts

// Step 1: Get a Single Fact About Your Favorite Number
async function getNumberFact() {
    try {
        const favoriteNumber = 7; // Replace with your favorite number
        const response = await fetch(`http://numbersapi.com/${favoriteNumber}?json`);
        const data = await response.json();
        console.log(data.text);
        document.getElementById('number-facts').innerHTML += `<p>${data.text}</p>`;
    } catch (error) {
        console.error('Error:', error);
    }
}

// Step 2: Get Facts for Multiple Numbers in One Request
async function getMultipleNumberFacts() {
    try {
        const numbers = [7, 14, 21]; // Replace with your chosen numbers
        const response = await fetch(`http://numbersapi.com/${numbers.join(',')}?json`);
        const data = await response.json();
        Object.values(data).forEach(fact => {
            console.log(fact);
            document.getElementById('number-facts').innerHTML += `<p>${fact}</p>`;
        });
    } catch (error) {
        console.error('Error:', error);
    }
}

// Step 3: Get Four Facts About Your Favorite Number (Updated)
async function getFourFactsAboutNumber() {
    try {
        const favoriteNumber = 7; // Replace with your favorite number
        const promises = Array(4).fill().map(() => fetch(`http://numbersapi.com/${favoriteNumber}?json`));

        const responses = await Promise.all(promises);
        const facts = await Promise.all(responses.map(response => response.json()));
        
        facts.forEach(data => {
            console.log(data.text);
            document.getElementById('number-facts').innerHTML += `<p>${data.text}</p>`;
        });
    } catch (error) {
        console.error('Error:', error);
    }
}

// Call the functions
getNumberFact();
getMultipleNumberFacts();
getFourFactsAboutNumber();

// Part 2: Deck of Cards

// Draw a single card from a new deck
async function drawSingleCard() {
    try {
        const response = await fetch('https://deckofcardsapi.com/api/deck/new/draw/?count=1');
        const data = await response.json();
        const card = data.cards[0];
        console.log(`${card.value} of ${card.suit}`);
        document.getElementById('card-area').innerHTML += `<p>${card.value} of ${card.suit}</p>`;
    } catch (error) {
        console.error('Error:', error);
    }
}

// Draw two cards from the same deck
async function drawTwoCards() {
    try {
        const shuffleResponse = await fetch('https://deckofcardsapi.com/api/deck/new/shuffle/');
        const shuffleData = await shuffleResponse.json();
        const deckId = shuffleData.deck_id;

        const firstCardResponse = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`);
        const firstCardData = await firstCardResponse.json();
        const card1 = firstCardData.cards[0];
        console.log(`${card1.value} of ${card1.suit}`);
        document.getElementById('card-area').innerHTML += `<p>${card1.value} of ${card1.suit}</p>`;

        const secondCardResponse = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`);
        const secondCardData = await secondCardResponse.json();
        const card2 = secondCardData.cards[0];
        console.log(`${card2.value} of ${card2.suit}`);
        document.getElementById('card-area').innerHTML += `<p>${card2.value} of ${card2.suit}</p>`;
    } catch (error) {
        console.error('Error:', error);
    }
}

// Draw cards with a button until deck is empty
let deckId;

async function initializeDeck() {
    try {
        const response = await fetch('https://deckofcardsapi.com/api/deck/new/shuffle/');
        const data = await response.json();
        deckId = data.deck_id;
        document.getElementById('draw-card').addEventListener('click', drawCard);
    } catch (error) {
        console.error('Error:', error);
    }
}

async function drawCard() {
    try {
        const response = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`);
        const data = await response.json();
        if (data.remaining === 0) {
            document.getElementById('draw-card').disabled = true;
            document.getElementById('draw-card').textContent = "No More Cards!";
        }
        const card = data.cards[0];
        const cardHtml = `<p>${card.value} of ${card.suit}</p><img src="${card.image}" alt="${card.value} of ${card.suit}">`;
        document.getElementById('card-area').innerHTML += cardHtml;
    } catch (error) {
        console.error('Error:', error);
    }
}

// Initialize the deck
initializeDeck();
