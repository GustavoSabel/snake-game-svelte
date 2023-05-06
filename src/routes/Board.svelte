<script lang="ts">
	import { onMount } from 'svelte';
	import Snake from './Snake/index.svelte';
	import { gameConfig, gameStatus } from './GameStore';
	import type { SnakeBody } from '../types/SnakeType';
	import Status from './Status.svelte';

	$: fieldWidth = $gameConfig.fieldWidth;
	$: fieldHeight = $gameConfig.fieldHeight;
	$: blockSize = $gameConfig.blockSize;

	let snake: Snake;
	let foods: { x: number; y: number }[] = [];

	const randomAvaliablePlace = () => {
		return {
			x: Math.floor(Math.random() * fieldHeight),
			y: Math.floor(Math.random() * fieldWidth)
		};
	};

	function addNewFood() {
		foods = [...foods, randomAvaliablePlace()];
	}

	export function run() {
		snake.run();
	}

	export function restart() {
		foods = [randomAvaliablePlace()];
		snake.restart();
	}

	function onSnakeMove(e: CustomEvent<SnakeBody>) {
		const snakeBody = e.detail;
		const head = snakeBody[e.detail.length - 1];
		const food = foods.find((food) => food.x === head.x && food.y === head.y);
		if (food) {
			foods = foods.filter((f) => f !== food);
			snake.incrementSize();
			addNewFood();
		}

		snakeBody.forEach((bodyPart) => {
			if (bodyPart.x === head.x && bodyPart.y === head.y) {
				if (head !== bodyPart) {
					gameStatus.lost();
				}
			}
		});
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
		<div
			class="food"
			style:top="{food.x * blockSize}px"
			style:left="{food.y * blockSize}px"
			style:width="{blockSize}px"
			style:height="{blockSize}px"
		/>
	{/each}
</div>

<style>
	.board {
		background-color: #5a5a5a;
		position: relative;
		
	}

	.food {
		background-color: red;
		position: absolute;
	}
</style>
