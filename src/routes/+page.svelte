<script lang="ts">
	import Board from './Board.svelte';
	import { onMount } from 'svelte';
	import Status from './Status.svelte';
	import { gameConfig } from './GameStore';

	let intervalNumber: number | null = null;
  let board: Board

  function isRunning() {
    return !!intervalNumber;
  }

  $: status = intervalNumber ? '' : 'Paused';

	function start() {
		if (!intervalNumber) {
			intervalNumber = setInterval(() => {
				board.run();
			}, $gameConfig.speed);
		}
	}

	function pause() {
		if (intervalNumber) {
			clearInterval(intervalNumber);
			intervalNumber = null;
		}
	}

	const onKeyDow = (e: KeyboardEvent) => {
		switch (e.key) {
			case ' ':
        if(isRunning()) {
				  pause();
        } else {
          start();
        }
				return;
			case 'ArrowLeft':
			case 'ArrowUp':
			case 'ArrowRight':
			case 'ArrowDown':
				start();
				break;
		}
	};

  onMount(() => {
    document.addEventListener('keydown', onKeyDow);
    return () => document.removeEventListener('keydown', onKeyDow);
  });
</script>

<main>
	<h1>Snake with Svelte</h1>
  <Status {status} />
	<Board bind:this={board} />
</main>
