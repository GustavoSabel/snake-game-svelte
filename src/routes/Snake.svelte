<script lang="ts">
	import { onMount } from 'svelte';
	import type { Direction } from '../types/Direction';
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	export let fieldWidth: number;
	export let fieldHeight: number;

	const blockSize = 50;
	let nextDirection: Direction = 'down';
	let increment = false;
	let snake = {
		direction: nextDirection as Direction,
		positions: createInicialSnakeBody(5)
	};

	function createInicialSnakeBody(size: number) {
		const positions = [];
		const middleY = Math.round(fieldWidth / 2) - 1;
		for (let i = 0; i < size; i++) {
			positions.push({
				x: i + 2,
				y: middleY,
				key: i
			});
		}
		return positions;
	}

	onMount(() => {
		document.addEventListener('keydown', (e) => {
			switch (e.key) {
				case 'ArrowLeft':
					if (snake.direction !== 'right') nextDirection = 'left';
					break;
				case 'ArrowUp':
					if (snake.direction !== 'down') nextDirection = 'up';
					break;
				case 'ArrowRight':
					if (snake.direction !== 'left') nextDirection = 'right';
					break;
				case 'ArrowDown':
					if (snake.direction !== 'up') nextDirection = 'down';
					break;
        default:
          return;
			}

			start();
		});
	});

	export function move() {
		if (!increment) {
			snake.positions.shift();
		}
		increment = false;
		const oldHead = snake.positions[snake.positions.length - 1];

		const newHead = {
			x: oldHead.x,
			y: oldHead.y,
			key: oldHead.key + 1
		};

		snake.direction = nextDirection;
		if (snake.direction === 'down') {
			newHead.x = (newHead.x + 1) % fieldHeight;
		} else if (snake.direction === 'right') {
			newHead.y = (newHead.y + 1) % fieldWidth;
		} else if (snake.direction === 'up') {
			newHead.x = newHead.x - 1;
			if (newHead.x < 0) newHead.x = fieldHeight - 1;
		} else if (snake.direction === 'left') {
			newHead.y = newHead.y - 1;
			if (newHead.y < 0) newHead.y = fieldWidth - 1;
		}

		snake.positions.push(newHead);
		snake = snake;

		dispatch('move', newHead);
	}

	let intervalNumber: number | null = null;
	export function start() {
		if (!intervalNumber) {
			intervalNumber = setInterval(() => {
				move();
			}, 200);
		}
	}

	export function pause() {
		if (intervalNumber) {
			clearInterval(intervalNumber);
			intervalNumber = null;
		}
	}

	export function incrementSize() {
		increment = true;
	}
</script>

<div class="body">
	{#each snake.positions as pos (pos.key)}
		<div class="body-part" style="top: {pos.x * blockSize}px; left: {pos.y * blockSize}px" />
	{/each}
</div>

<style>
	.body {
		position: relative;
	}

	.body-part:last-child {
		background-color: rebeccapurple;
	}

	.body-part {
		width: 48px;
		height: 48px;
		margin: 1px;
		background-color: black;
		position: absolute;
	}
</style>
