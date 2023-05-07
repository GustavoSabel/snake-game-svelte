<svelte:head>
	<title>Snake Game</title>
</svelte:head>

<slot />

<style>
	:global(html, body) {
		height: 100%;
	}
	:global(body) {
		margin: 0;
		background-color: #223a1d;
		font-family: Arial, sans-serif;
	}
</style>
