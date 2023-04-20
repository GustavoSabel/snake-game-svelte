<script lang="ts">
	import { gameConfig } from './GameStore';

	export let status: string;

	$: fieldWidth = $gameConfig.fieldWidth;
	$: fieldHeight = $gameConfig.fieldHeight;
	$: blockSize = $gameConfig.blockSize;
</script>

<div style:width="{fieldWidth * blockSize}px" style:height="{fieldHeight * blockSize}px">
  <span>{status}</span>
</div>

<style>
  div {
    position: absolute;
    border: 1px solid;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1;
  }
	span {
		color: rgba(59, 59, 59, 0.726);
    font-size: 200px;
	}
</style>
