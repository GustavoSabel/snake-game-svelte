<script lang="ts">
	import Snake from './Snake.svelte';

	const fieldWidth = 21;
	const fieldHeight = 12;

	let snake: Snake;
</script>

<button on:click={() => snake.start()}>Start</button>
<button on:click={() => snake.stop()}>Stop</button>
<button on:click={() => snake.incrementSize()}>Increment</button>

<div class="board" style="width: {fieldWidth * 50}px; height: {fieldHeight * 50}px;">
	<Snake bind:this={snake} {fieldWidth} {fieldHeight} />
</div>

<style>
	.board {
		width: 500px;
		height: 500px;
		background-color: rgba(106, 106, 106, 0.745);
	}

	button {
		font-size: 1rem;
		padding: 0.5rem 1rem;
	}
</style>
