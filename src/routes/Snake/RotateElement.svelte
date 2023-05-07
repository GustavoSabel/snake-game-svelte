<script lang="ts">
	import type { Direction } from '../../types/Direction';

	export let direction: Direction;
	let rotate = 0;

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
	<slot />
</div>
