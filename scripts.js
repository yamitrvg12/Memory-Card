const cards = document.querySelectorAll('.memory-card');
let hasFlippedCard = false;
let firstCard, secondCard;

function flipCard() {
    this.classList.add('flip');

    if (!hasFlippedCard) {
        // First click
        hasFlippedCard = true;
        firstCard = this; // memory card
    } else {
        // second click
        hasFlippedCard = false;
        secondCard = this;
        
        // do card match
        if (firstCard.dataset.framework === secondCard.dataset.framework) {
            // it's a match
            firstCard.removeEventListener('click', flipCard);
            secondCard.removeEventListener('click', flipCard);
        } else {
            // it's not a match
            setTimeout(() => {
                firstCard.classList.remove('flip');
                secondCard.classList.remove('flip');
            }, 1500);
        }
        console.log('function was executed');
    }
}

cards.forEach(card => card.addEventListener('click', flipCard));

