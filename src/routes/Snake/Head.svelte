<script lang="ts">
	import type { Direction } from '../../types/Direction';
	import { gameConfig } from '../GameStore';
	import BodyPart from './BodyPart.svelte';

	export let direction: Direction;
	let rotate = 0;

	$: blockSize = $gameConfig.blockSize;

	$: {
		if (direction === 'down') {
			rotate = 0;
		} else if (direction === 'left') {
			rotate = 90;
		} else if (direction === 'up') {
			rotate = 180;
		} else if (direction === 'right') {
			rotate = 270;
		}
	}
</script>

<div style:transform={`rotate(${rotate}deg)`}>
	<BodyPart>
		<div class="eyes">
			<div class="eye eye1" />
			<div class="eye eye2" />
		</div>
	</BodyPart>
</div>

<style>
	.eye {
		background-color: #161616c0;
		width: 10px;
		height: 10px;
		border-radius: 10px;
		top: 10px;
	}

	.eyes {
		display: flex;
		justify-content: space-around;
		position: relative;
		top: 20px
	}
</style>
