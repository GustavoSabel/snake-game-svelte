<script lang="ts">
	import { gameConfig } from "./GameStore";

  export let x: number;
  export let y: number;

	$: blockSize = $gameConfig.blockSize;
</script>

<div
	style:top="{x * blockSize}px"
	style:left="{y * blockSize}px"
>
<slot></slot>
</div>

<style>
	div {
		position: absolute;
	}
</style>
