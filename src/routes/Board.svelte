<script lang="ts">
	import Snake from './Snake.svelte';

	const fieldWidth = 21;
	const fieldHeight = 12;

	let snake: Snake;

	const randomPlace = () => {
		return {
			x: Math.floor(Math.random() * fieldHeight),
			y: Math.floor(Math.random() * fieldWidth)
		};
	};
	let foods = [randomPlace(), randomPlace()];

	function addNewFood() {
		foods.push(randomPlace());
	}

	function onMove(e: CustomEvent<{ x: number; y: number }>) {
		const food = foods.find((food) => food.x === e.detail.x && food.y === e.detail.y);
		if (food) {
			foods = foods.filter(f => f !== food);
			snake.incrementSize();
			addNewFood();
		}
	}
</script>

<button on:click={() => snake.start()}>Start</button>
<button on:click={() => snake.stop()}>Stop</button>
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
