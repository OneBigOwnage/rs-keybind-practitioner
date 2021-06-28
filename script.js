let pressedButtonsContainer;


const sequence = ['J', 'K', 'Q'];

let GAME_STATE = {
  requestedButtons: [],
  firedButtons: [],
};

const draw = time => {
  if (pressedButtonsContainer) {
    pressedButtonsContainer.textContent = GAME_STATE.firedButtons.join();
  }

  window.requestAnimationFrame(draw);
};

const tick = () => {
  GAME_STATE.firedButtons = [GAME_STATE.requestedButtons.reverse().pop()];
  GAME_STATE.requestedButtons = [];

};

(() => {
  pressedButtonsContainer = document.getElementById('pressed-buttons-container');
  setInterval(() => tick(), 600);

  window.addEventListener('keydown', ev => {
    if (!(ev.ctrlKey && ev.key.toLowerCase() === 'r') && !(ev.ctrlKey && ev.shiftKey && ev.key.toLowerCase() === 'i')) {
      ev.stopPropagation();
      ev.preventDefault();
    }

    let keyPhrase = '';

    if (ev.shiftKey) {
      keyPhrase += 'SHIFT + '
    }

    if (ev.ctrlKey) {
      keyPhrase += 'CTRL + '
    }

    if (ev.altKey) {
      keyPhrase += 'ALT + '
    }

    keyPhrase += ev.key.toUpperCase();

    GAME_STATE.requestedButtons.push(keyPhrase);
  });

  window.requestAnimationFrame(draw);
})();
