<script lang="ts">
	import { gameConfig } from "./GameStore";

	$: blockSize = $gameConfig.blockSize;
</script>

<div
	style:width="{blockSize}px"
	style:height="{blockSize}px"
/>

<style>
	div {
		background-color: #cc4848;
		position: absolute;
		border-radius: 100%;
	}
</style>
