<script lang="ts">
	import { gameConfig } from '../GameStore';

	$: blockSize = $gameConfig.blockSize;
</script>

<div style:width="{blockSize - 2}px" style:height="{blockSize - 2}px">
	<slot />
</div>

<style>
	div {
		background-color: #425e3d;
		border: 1px solid #5a5a5a;
	}
</style>
