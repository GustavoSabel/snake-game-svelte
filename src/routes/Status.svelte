<script lang="ts">
	import { gameConfig, gameStatus } from './GameStore';

	$: fieldWidth = $gameConfig.fieldWidth;
	$: fieldHeight = $gameConfig.fieldHeight;
	$: blockSize = $gameConfig.blockSize;
</script>

<div style:width="{fieldWidth * blockSize}px" style:height="{fieldHeight * blockSize}px">
	{#if $gameStatus === 'stopped'}
		<span class='msg'>GAME PAUSED</span>
		<span class='instructions'>Press space to resume</span>
	{/if}
	{#if $gameStatus === 'losted'}
		<span class='msg'>GAME OVER</span>
		<span class='instructions'>Press space to start a new game</span>
	{/if}
	{#if $gameStatus === 'won'}
		<span class='msg'>YOU WIN!!!</span>
		<span class='instructions'>Press space to start a new game</span>
	{/if}
</div>

<style>
	div {
		position: absolute;
		display: flex;
    flex-direction: column;
		justify-content: center;
		align-items: center;
		z-index: 1;
	}
	.msg {
		color: rgba(59, 59, 59, 0.726);
		font-size: 100px;
	}
	.instructions {
		color: rgba(59, 59, 59, 0.726);
		font-size: 20px;
	}
</style>
