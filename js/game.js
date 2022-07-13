const cardNumbers = ['6', '7', '8', '9', '10', 'J', 'Q', 'K'];
const cardSuits = ['♠️', '♣️', '♥️', '♦️'];

let cards = document.querySelectorAll('.card');
let cardsValues = []
let openedCards = [];

let remainingAttempts = 3;

let firstCard = null;

function openCard(cardId) {
    let card = document.getElementById(cardId);
    if (card) {
        card.classList.remove('down');
        card.classList.add('up');
    }
}

function closeCard(cardId) {
    let card = document.getElementById(cardId);
    if (card) {
        card.classList.remove('up');
        card.classList.add('down');
    }
}

function openEverything() {
    for (let card of cards) {
        openCard(card.id);
    }
}

function updateGame(cardId) {
    openCard(cardId);

    if (firstCard) { // if there is an open card
        console.log(firstCard)
        if (cardsValues[cardId].num == cardsValues[firstCard].num &&
            cardsValues[cardId].suit == cardsValues[firstCard].suit) { // if cards are equal
            openedCards.push(cardId);
            openedCards.push(firstCard);
        } else {// if cards are not equal 
            remainingAttempts--;
            document.getElementById('attempts').textContent = remainingAttempts;

            if (remainingAttempts <= 0) {
                openEverything();
                return;
            }
            
            setTimeout((firstCard, cardId) => {
                console.log(firstCard)
                console.log(cardId)
                closeCard(firstCard);
                closeCard(cardId);
            }, 1000, firstCard, cardId);
            
        }

        firstCard = null;
        return;
    }

    firstCard = cardId;
}


for (let card of cards) {
    card.addEventListener('click', () => {
        if (card.className.includes('up')) {
            return;
        }

        updateGame(card.id);
    });
}

function setupgame() {
    remainingAttempts = 3;
    document.getElementById('attempts').textContent = remainingAttempts;
    cardsValues.length = 0; // emptying deck

    for (let i = 0; i < 6; i++) {
        let number = Math.floor(Math.random() * (13 - 6) + 6); // choosing number of the card
        let suit = Math.floor(Math.random() * (4 - 1) + 1); // choosing suit of the card
        
        if (cardsValues.some((e) => (e.num == number && e.suit == suit))) {
            number = Math.floor(Math.random() * (13 - 6) + 6);
            suit = Math.floor(Math.random() * (4 - 1) + 1);
        }

        cardsValues.push({ 'num': number, 'suit': suit }); // adding cards to the deck
        cardsValues.push({ 'num': number, 'suit': suit });
    }

    cardsValues.sort(() => Math.random() - 0.5); // shuffling deck
    console.log(cardsValues);

    for (let card of cards) {
        if (card.className.includes('up')) {
            closeCard(card.id);
        }
    }

    for (let i = 0; i < cardsValues.length; i++) {
        
        let card = document.getElementById(i);
        if (card) {
            let number = card.getElementsByClassName('number')[0];
            let suits = card.getElementsByClassName('suit');

            number.textContent = cardNumbers[cardsValues[i]['num'] - 6];
            for (let suit of suits) {
                suit.textContent = cardSuits[cardsValues[i]['suit']];
            }
        }
    }
}

setupgame();
