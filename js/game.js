const cardNumbers = ['6', '7', '8', '9', '10', 'J', 'Q', 'K'];
const cardSuits = ['♠️', '♣️', '♥️', '♦️'];

let cards = document.querySelectorAll('.card');
let cardsValues = [];
let openedCards = [];

var toClose = [];
let timeouts = [];
let firstGame = true;

const maxAttempts = 5;
let remainingAttempts = maxAttempts;

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

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
    while (timeouts.length) {
        clearTimeout(timeouts.pop());
    }

    for (let card of cards) {
        openCard(card.id);
    }
}

function updateGame(cardId) {
    toClose.push(cardId);

    openCard(cardId);

    while (toClose.length >= 2) {
        let firstCard = toClose.shift();
        let secondCard = toClose.shift();

        if (cardsValues[firstCard].num == cardsValues[secondCard].num &&
            cardsValues[firstCard].suit == cardsValues[secondCard].suit) { // if cards are equal
            toClose.length = 0;
            openedCards.push(firstCard);
            openedCards.push(secondCard);

            if (openedCards.length == cardsValues.length) {
                setTimeout(() => { alert("You win!"); setupgame(); }, 800);
                return;
            }
        } else {// if cards are not equal 
            remainingAttempts--;
            document.getElementById('attempts').textContent = remainingAttempts;

            if (remainingAttempts <= 0) {
                openEverything();
                return;
            } else {
                timeouts.push(setTimeout((a, b) => {
                    closeCard(a);
                    closeCard(b);
                }, 1000, firstCard, secondCard));

            }
        }
    }
}


for (let card of cards) {
    card.addEventListener('click', () => {
        console.log(toClose);

        if (card.className.includes('up')) {
            return;
        }

        updateGame(card.id);
    });
}

function setupgame() {
    openedCards.length = 0;
    toClose.length = 0;
    cardsValues.length = 0; // emptying deck
    
    remainingAttempts = maxAttempts;
    document.getElementById('attempts').textContent = remainingAttempts;

    for (let i = 0; i < 6; i++) {
        let number = Math.floor(Math.random() * (13 - 6) + 6); // choosing number of the card
        let suit = Math.floor(Math.random() * (4 - 1) + 1); // choosing suit of the card
        
        while (cardsValues.some((e) => (e.num == number && e.suit == suit))) {
            number = Math.floor(Math.random() * (13 - 6) + 6);
            suit = Math.floor(Math.random() * (4 - 1) + 1);
        }

        cardsValues.push({ 'num': number, 'suit': suit }); // adding cards to the deck
        cardsValues.push({ 'num': number, 'suit': suit });
    }

    // cardsValues.sort(() => Math.random() - 0.5); // shuffling deck
    shuffle(cardsValues);


    for (let card of cards) {
        if (card.className.includes('up')) {
            closeCard(card.id);
        }
    }

    function palceValues() {
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

    if (firstGame) {
        setTimeout(palceValues, 800); //800
    } else {
        palceValues();
        firstGame = false;
    }
}

document.getElementById('restart').addEventListener('click', () => {
    setupgame();
});

setupgame();
