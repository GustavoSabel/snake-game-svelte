import { readable } from 'svelte/store';

export const gameConfig = readable({
  fieldWidth: 21,
	fieldHeight: 12,
	blockSize: 40,
  speed: 200,
});
