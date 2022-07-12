let cards = document.querySelectorAll('.card');
let cardsnumbers = []
let openedcards = [];

let firstcard = null;


for (let card of cards) {
    card.addEventListener('click', () => {
        if (card.className.includes('up')) {
            return;
        }

        card.classList.remove('down');
        card.classList.add('up');

        if (firstcard) {

            firstcard = null;
            return;
        }
    });
}

function setupgame() {
    cardsnumbers.length = 0; // emptying deck

    for (let i = 0; i < 6; i++) {
        let number = Math.floor(Math.random() * (13 - 6) + 6); // choosing number of the card
        let suit = Math.floor(Math.random() * (4 - 1) + 1); // choosing suit of the card
        cardsnumbers.push({ number, suit }); // adding cards to the deck
        cardsnumbers.push({ number, suit });
    }

    cardsnumbers.sort(() => Math.random() - 0.5); // shuffling deck
    console.log(cardsnumbers);

    for (let card of cards) {
        if (card.className.includes('up')) {
            card.classList.remove('up');
            card.classList.add('down');
            return;
        }
    }
}

setupgame();
