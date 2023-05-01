<script lang="ts">
	import Board from './Board.svelte';
	import { onMount } from 'svelte';
	import Status from './Status.svelte';
	import { gameConfig, gameStatus } from './GameStore';

	let intervalNumber: number | null = null;
	let board: Board;

	gameStatus.subscribe((status) => {
		if (status === 'running') {
			startLoop();
		} else {
			pauseLoop();
		}
	});

	function startLoop() {
		if (!intervalNumber) {
			intervalNumber = setInterval(() => {
				board.run();
			}, $gameConfig.speed);
		}
	}

	function pauseLoop() {
		if (intervalNumber) {
			clearInterval(intervalNumber);
			intervalNumber = null;
		}
	}

	const onKeyDow = (e: KeyboardEvent) => {
		if (e.key === ' ') {
			if ($gameStatus === 'running') {
				gameStatus.pause();
			} else if ($gameStatus === 'losted') {
				board.restart();
				gameStatus.run();
			} else if ($gameStatus === 'stopped') {
				gameStatus.run();
			}
			return;
		}

		if ($gameStatus === 'running' || $gameStatus === 'stopped') {
			switch (e.key) {
				case 'ArrowLeft':
				case 'ArrowUp':
				case 'ArrowRight':
				case 'ArrowDown':
					gameStatus.run();
					break;
			}
		}
	};

	onMount(() => {
		document.addEventListener('keydown', onKeyDow);
		return () => document.removeEventListener('keydown', onKeyDow);
	});
</script>

<main>
	<h1>Snake with Svelte</h1>
	<Status />
	<Board bind:this={board} />
</main>
