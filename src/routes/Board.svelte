<script lang="ts">
	import { onMount } from 'svelte';
	import Snake from './Snake/index.svelte';
	import { gameConfig, gameStatus } from './GameStore';
	import type { SnakeBody } from '../types/SnakeType';
	import Status from './Status.svelte';
	import Food from './Food.svelte';
	import type { Position } from '../types/Position';
	import PositionElement from './PositionElement.svelte';

	$: fieldWidth = $gameConfig.fieldWidth;
	$: fieldHeight = $gameConfig.fieldHeight;
	$: blockSize = $gameConfig.blockSize;

	let snake: Snake;
	let foods: Position[] = [];

	const randomAvaliablePlace = (unavaliableSpaces: Position[]): Position | null => {
		const avaliableSpaces: [number, number][] = [];

		for (let x = 0; x < fieldHeight; x++) {
			for (let y = 0; y < fieldWidth; y++) {
				if (!unavaliableSpaces.some((s) => s.x === x && s.y === y)) {
					avaliableSpaces.push([x, y]);
				}
			}
		}

		if (!avaliableSpaces.length) {
			return null;
		}

		const randomPosition = Math.floor(Math.random() * avaliableSpaces.length);
		const newPosition = avaliableSpaces[randomPosition];

		return { x: newPosition[0], y: newPosition[1] };
	};

	export function run() {
		snake.run();
	}

	export function restart() {
		const snakeBody = snake.restart();
		foods = [randomAvaliablePlace(snakeBody.body)!];
	}

	function onSnakeMove(e: CustomEvent<SnakeBody>) {
		const snakeBody = e.detail;
		const head = snakeBody[e.detail.length - 1];

		snakeBody.forEach((bodyPart) => {
			if (bodyPart.x === head.x && bodyPart.y === head.y) {
				if (head !== bodyPart) {
					gameStatus.lose();
					return;
				}
			}
		});

		const food = foods.find((food) => food.x === head.x && food.y === head.y);
		if (food) {
			foods = foods.filter((f) => f !== food);
			snake.incrementSize();

			const avaliablePlace = randomAvaliablePlace([...foods, ...snakeBody]);
			if (avaliablePlace) {
				foods = [...foods, avaliablePlace];
			} else {
				if (foods.length === 0) {
					gameStatus.won();
					return;
				}
			}
		}
	}

	const onKeyDow = (e: KeyboardEvent) => {
		switch (e.key) {
			case 'ArrowLeft':
				snake.changeDirectionTo('left');
				break;
			case 'ArrowUp':
				snake.changeDirectionTo('up');
				break;
			case 'ArrowRight':
				snake.changeDirectionTo('right');
				break;
			case 'ArrowDown':
				snake.changeDirectionTo('down');
				break;
		}
	};

	onMount(() => {
		document.addEventListener('keydown', onKeyDow);
		restart();
		return () => document.removeEventListener('keydown', onKeyDow);
	});
</script>

<div
	class="board"
	style:width="{fieldWidth * blockSize}px"
	style:height="{fieldHeight * blockSize}px"
>
	<Status />
	<Snake bind:this={snake} on:move={onSnakeMove} />

	{#each foods as food}
		<PositionElement x={food.x} y={food.y}>
			<Food />
		</PositionElement>
	{/each}
</div>

<style>
	.board {
		background-color: #708d74;
		position: relative;
	}
</style>
