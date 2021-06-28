/** @type {HTMLElement}  */
let pressedButtonsContainer;


const sequence = ['J', 'K', 'Q'];

const initial = () => ({
  ticks: 0,
  requestedKeysForNextTick: [],
  firedBindsThisTick: [],
  bindSequence: [],
});

let GAME_STATE = initial();

const draw = time => {
  if (pressedButtonsContainer) {
    pressedButtonsContainer.innerHTML = GAME_STATE.bindSequence.map((bind, index) => {
      if (sequence[index] == bind) {
        return `<span style="color: green;">${bind}</span>`;
      }

      return `<span style="color: red;">${bind}</span>`;
    }).join('\n');
  }

  window.requestAnimationFrame(draw);
};

const tick = () => {
  if (++GAME_STATE.ticks > sequence.length) {

    restartSesh();

    return;
  }

  GAME_STATE.firedBindsThisTick = [GAME_STATE.requestedKeysForNextTick.reverse().pop()]; // Some keys may be used simultaniously in one tick...
  GAME_STATE.requestedKeysForNextTick = [];

  GAME_STATE.bindSequence.push(GAME_STATE.firedBindsThisTick[0] || '(empty)');

};

const restartSesh = () => {
  GAME_STATE = initial();
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

    GAME_STATE.requestedKeysForNextTick.push(keyPhrase);
  });

  window.requestAnimationFrame(draw);
})();
