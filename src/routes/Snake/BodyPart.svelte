<script lang="ts">
	import { gameConfig } from '../GameStore';

	$: blockSize = $gameConfig.blockSize;
</script>

<div style:width="{blockSize - 2}px" style:height="{blockSize - 2}px">
	<slot />
</div>

<style>
	div {
		background-color: #3a5a34;
		margin: 1px;
	}
</style>
 