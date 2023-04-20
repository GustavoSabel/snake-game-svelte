<script lang="ts">
	import { onMount } from 'svelte';
	import Snake from './Snake.svelte';

	const fieldWidth = 21;
	const fieldHeight = 12;

	let snake: Snake;
	let foods: { x: number; y: number }[] = [];

	const randomAvaliablePlace = () => {
		return {
			x: Math.floor(Math.random() * fieldHeight),
			y: Math.floor(Math.random() * fieldWidth)
		};
	};

	function addNewFood() {
		foods = [ ...foods, randomAvaliablePlace() ];
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

<button on:click={() => snake.start()}>Start</button>
<button on:click={() => snake.pause()}>Pause</button>
<button on:click={() => snake.incrementSize()}>Increment</button>

<div class="board" style="width: {fieldWidth * 50}px; height: {fieldHeight * 50}px;">
	<Snake bind:this={snake} {fieldWidth} {fieldHeight} on:move={onMove} />

	{#each foods as food}
		<div class="food" style="top: {food.x * 50}px; left: {food.y * 50}px" />
	{/each}
</div>

<style>
	.board {
		width: 500px;
		height: 500px;
		background-color: rgba(106, 106, 106, 0.745);
		position: relative;
	}

	button {
		font-size: 1rem;
		padding: 0.5rem 1rem;
	}

	.food {
		background-color: red;
		width: 48px;
		height: 48px;
		position: absolute;
	}
</style>
