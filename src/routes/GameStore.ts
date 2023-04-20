import { readable } from 'svelte/store';
import { writable } from 'svelte/store';

export const gameConfig = readable({
  fieldWidth: 21,
  fieldHeight: 12,
  blockSize: 40,
  speed: 200,
});


function createGameStatus() {
  const { subscribe, set } = writable<'stopped' | 'running' | 'losted'>('stopped');

  return {
    subscribe,
    run: () => set('running'),
    pause: () => set('stopped'),
    lost: () => set('losted'),
    newGame: () => set('stopped')
  };
}

export const gameStatus = createGameStatus();