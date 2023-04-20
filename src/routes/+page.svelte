<script lang="ts">
	import Board from './Board.svelte';
	import { onMount } from 'svelte';

	let intervalNumber: number | null = null;
  let board: Board

  function isRunning() {
    return !!intervalNumber;
  }

	function start() {
		if (!intervalNumber) {
			intervalNumber = setInterval(() => {
				board.run();
			}, 200);
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
	<Board bind:this={board} />
</main>
