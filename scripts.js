const cards = document.querySelectorAll('.memory-card');
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let matches = 0;

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flip');

    if (!hasFlippedCard) {
        // First click
        hasFlippedCard = true;
        firstCard = this; // memory card

        return;
    }

    // second click
    secondCard = this;
    
    checkForMatch();
}

function checkForMatch() {
    // do card match
    const isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    // it's a match
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    levelComplete();
    resetBoard();
}

function levelComplete() {
    matches += 1;

    setTimeout(() => {
        if (matches === (cards.length / 2)) {
            alert('Level complete!');
        }
    }, 1600);
}

function unflipCards() {
    lockBoard = true;
    // it's not a match
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard();
    }, 1500);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false]; // hasFlippedCard = false; lockBoard = false;
    [firstCard, secondCard] = [null, null]; // firstCard = null;, secondCard = null
}

(function() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12);

        card.style.order = randomPos;
    });
})();

cards.forEach(card => card.addEventListener('click', flipCard));
