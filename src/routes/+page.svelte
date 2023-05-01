<script lang="ts">
	import Board from './Board.svelte';
	import { onMount } from 'svelte';
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
		return () => {
			document.removeEventListener('keydown', onKeyDow);
			pauseLoop();
		}
	});
</script>

<main>
	<h1>Snake Game with Svelte</h1>
	<Board bind:this={board} />
</main>

<style>
	:global(html, body) {
		height: 100%;
	}
	:global(body) {
		margin: 0;
		background-color: black;
		font-family: Arial, sans-serif;
	}

	h1 {
		color: #f1f1f1;
	}

	main {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 100%;
	}
</style>
