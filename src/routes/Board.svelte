<script lang="ts">
	import { onMount } from 'svelte';
	import Snake from './Snake.svelte';
	import { gameConfig } from './GameStore';

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

	function onMove(e: CustomEvent<{ x: number; y: number }>) {
		const food = foods.find((food) => food.x === e.detail.x && food.y === e.detail.y);
		if (food) {
			foods = foods.filter((f) => f !== food);
			snake.incrementSize();
			addNewFood();
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
		addNewFood();
		return () => document.removeEventListener('keydown', onKeyDow);
	});
</script>

<div
	class="board"
	style:width="{fieldWidth * blockSize}px"
	style:height="{fieldHeight * blockSize}px"
>
	<Snake bind:this={snake} on:move={onMove} />

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
		background-color: rgba(106, 106, 106, 0.745);
		position: relative;
	}

	.food {
		background-color: red;
		position: absolute;
	}
</style>
