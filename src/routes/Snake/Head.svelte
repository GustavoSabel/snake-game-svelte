<script lang="ts">
	import type { Direction } from '../../types/Direction';
	import BodyPart from './BodyPart.svelte';

	export let direction: Direction;

	const round = {
		frontLeft: true,
		frontRight: true
	};
</script>

<BodyPart {direction} {round}>
	<div class="eyes">
		<div class="eye eye1" />
		<div class="eye eye2" />
	</div>
</BodyPart>

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
		top: 15px;
		padding: 5px;
	}
</style>
