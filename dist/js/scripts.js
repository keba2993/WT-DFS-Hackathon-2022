// add filtering
// add search
// add getting url Params
// add game functionality
// add loyalty stuff
const cards = document.querySelectorAll('.memory-card');
const itemCards = document.querySelectorAll('.card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');

  if (!hasFlippedCard) {
    // first click
    hasFlippedCard = true;
    firstCard = this;

    return;
  }

  // second click
  secondCard = this;

  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  resetBoard();
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
  }, 1500);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();

cards.forEach(card => card.addEventListener('click', flipCard));
itemCards.forEach(card => card.addEventListener('click', flipCard));

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const loyaltyId = urlParams.get('loyaltyId');
const loyaltyPoints = urlParams.get('loyaltyPoints');
var loyalty1 = document.getElementById("loyaltyId");
var loyalty2 = document.getElementById("loyaltyPoints");
if (loyaltyId != null){
loyalty1.append(loyaltyId);
}
if (loyaltyPoints!= null){
loyalty2.append(loyaltyPoints);
}