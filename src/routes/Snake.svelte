<script lang="ts">
	import type { Direction } from '../types/Direction';
	import { createEventDispatcher, onMount } from 'svelte';
	import { gameConfig } from './GameStore';
	import type { SnakeType } from '../types/SnakeType';
	const dispatch = createEventDispatcher();

	$: fieldWidth = $gameConfig.fieldWidth;
	$: fieldHeight = $gameConfig.fieldHeight;
	$: blockSize = $gameConfig.blockSize;

	let nextDirection: Direction = 'down';
	let increment = false;
	let snake: SnakeType = {
		direction: 'down',
		body: []
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

	export function changeDirectionTo(newDirection: Direction) {
		if (snake.direction === 'up' && newDirection === 'down') return;
		if (snake.direction === 'down' && newDirection === 'up') return;
		if (snake.direction === 'left' && newDirection === 'right') return;
		if (snake.direction === 'right' && newDirection === 'left') return;
		nextDirection = newDirection;
	}

	export function run() {
		if (!increment) {
			snake.body.shift();
		}
		increment = false;
		const oldHead = snake.body[snake.body.length - 1];

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

		snake.body.push(newHead);
		snake = snake;

		dispatch('move', snake.body);
	}

	export function restart() {
		nextDirection = 'down';
		snake = {
			direction: nextDirection as Direction,
			body: createInicialSnakeBody(5)
		};
	}

	export function incrementSize() {
		increment = true;
	}

	onMount(() => {
		restart()
	});
</script>

<div class="body">
	{#each snake.body as pos (pos.key)}
		<div
			class="body-part"
			style:top="{pos.x * blockSize}px"
			style:left="{pos.y * blockSize}px"
			style:width="{blockSize}px"
			style:height="{blockSize}px"
		/>
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
		background-color: black;
		position: absolute;
		border: 1px solid #5a5a5a;
	}
</style>
