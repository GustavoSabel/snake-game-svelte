<script lang="ts">
	import type { Direction } from '../../types/Direction';
	import { gameConfig } from '../GameStore';
	import Rotate from './Rotate.svelte';

	$: blockSize = $gameConfig.blockSize;

	export let direction: Direction;

	export let round: {
		frontLeft?: boolean 
		frontRight?: boolean 
		bottonLeft?: boolean 
		bottonRight?: boolean 
	} = {}
</script>

<Rotate {direction}>
	<div style:width="{blockSize}px" style:height="{blockSize}px"
		style:border-end-end-radius="{round.frontLeft ? `50%` : ''}"
		style:border-end-start-radius="{round.frontRight ? `50%` : ''}"
		style:border-start-end-radius="{round.bottonLeft ? `50%` : ''}"
		style:border-start-start-radius="{round.bottonRight ? `50%` : ''}"
		>
		<slot />
	</div>
</Rotate>

<style>
	div {
		background-color: #3a5a34;
	}
</style>
