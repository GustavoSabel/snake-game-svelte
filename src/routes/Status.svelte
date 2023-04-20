<script lang="ts">
	import { gameConfig, gameStatus } from './GameStore';

	$: fieldWidth = $gameConfig.fieldWidth;
	$: fieldHeight = $gameConfig.fieldHeight;
	$: blockSize = $gameConfig.blockSize;

  let message = '';
  $: {
    if($gameStatus === 'stopped') {
      message = 'GAME PAUSED';
    } else if($gameStatus === 'losted') {
      message = 'GAME OVER';
    } else {
      message = '';
    } 
  };
</script>

<div style:width="{fieldWidth * blockSize}px" style:height="{fieldHeight * blockSize}px">
  <span>{message}</span>
</div>

<style>
  div {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1;
  }
	span {
		color: rgba(59, 59, 59, 0.726);
    font-size: 100px;
	}
</style>
