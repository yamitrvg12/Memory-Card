const cards = document.querySelectorAll('.memory-card');
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

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
    resetBoard();
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

cards.forEach(card => card.addEventListener('click', flipCard));

