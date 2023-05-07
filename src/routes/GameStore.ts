import { readable, writable } from 'svelte/store';

export const gameConfig = readable({
  fieldWidth: 21,
  fieldHeight: 12,
  blockSize: 40,
  speed: 200,
});


function createGameStatus() {
  const { subscribe, set } = writable<'stopped' | 'running' | 'lose' | 'won'>('stopped');

  return {
    subscribe,
    run: () => set('running'),
    pause: () => set('stopped'),
    lose: () => set('lose'),
    newGame: () => set('stopped'),
    won: () => set('won'),
  };
}

export const gameStatus = createGameStatus();
