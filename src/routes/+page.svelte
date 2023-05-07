<script lang="ts">
	import Board from './Board.svelte';
	import { onMount } from 'svelte';
	import { gameConfig, gameStatus } from './GameStore';
	import GameDescription from './GameDescription.svelte';

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
				board?.run();
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
			} else if ($gameStatus === 'lose' || $gameStatus === 'won') {
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
	<Board bind:this={board} />
	<GameDescription />
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 100%;
		gap: 16px;
	}
</style>
