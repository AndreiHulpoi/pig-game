'use strict';

const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const currentScore0El = document.getElementById('current--0');
const currentScore1El = document.getElementById('current--1');

const firstPlayer = document.querySelector('.player--0');
const secondPlayer = document.querySelector('.player--1');

const diceEl = document.querySelector('.dice');

const rollDice = document.querySelector('.btn--roll');
const newGame = document.querySelector('.btn--new');
const hold = document.querySelector('.btn--hold');

let playerScore, scores, activePlayer, playing;

//STARTING SETUP

const init = function () {
  scores = [0, 0];
  playerScore = 0;
  activePlayer = 0;

  score0El.textContent = 0;
  score1El.textContent = 0;
  currentScore0El.textContent = 0;
  currentScore1El.textContent = 0;

  playing = true;

  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner');
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add('player--active');
  diceEl.classList.add('hidden');

  playing = true;
};

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  playerScore = 0;
  firstPlayer.classList.toggle('player--active');
  secondPlayer.classList.toggle('player--active');
};
//BUTTON SETUP - ROLL DICE

rollDice.addEventListener('click', function () {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;
    diceEl.classList.remove('hidden');
    //DISPLAY IMAGE ACCORDING TO DICE NUMBER
    diceEl.src = `dice/dice-${dice}.png`;
    if (dice !== 1) {
      playerScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        playerScore;
    } else {
      switchPlayer();
    }
  }
});

hold.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += playerScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    if (document.getElementById(`score--${activePlayer}`).textContent < 100) {
      switchPlayer();
    } else {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      diceEl.classList.add('hidden');
    }
  }
});

newGame.addEventListener('click', init);
