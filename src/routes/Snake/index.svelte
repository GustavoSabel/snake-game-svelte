<script lang="ts">
	import type { Direction } from '../../types/Direction';
	import { createEventDispatcher, onMount } from 'svelte';
	import { gameConfig } from '../GameStore';
	import type { SnakeBodyPart, SnakeType } from '../../types/SnakeType';
	import BodyPart from './BodyPart.svelte';
	import Head from './Head.svelte';
	import Position from '../Position.svelte';
	import { error } from '@sveltejs/kit';
	const dispatch = createEventDispatcher();

	$: fieldWidth = $gameConfig.fieldWidth;
	$: fieldHeight = $gameConfig.fieldHeight;

	let nextDirection: Direction = 'down';
	let increment = false;
	let snake: SnakeType = {
		direction: 'down',
		body: []
	};

	function createInicialSnakeBody(size: number, direction: Direction) {
		const positions = [];
		const middleY = Math.round(fieldWidth / 2) - 1;
		for (let i = 0; i < size; i++) {
			positions.push({
				x: i + 2,
				y: middleY,
				key: i,
				direction
			});
		}
		return positions;
	}

	export function changeDirectionTo(newDirection: Direction) {
		if (snake.direction === 'up' && newDirection === 'down') return;
		if (snake.direction === 'down' && newDirection === 'up') return;
		if (snake.direction === 'left' && newDirection === 'right') return;
		if (snake.direction === 'right' && newDirection === 'left') return;
		nextDirection = newDirection;
	}

	export function run() {
		if (!increment) {
			snake.body.shift();
		}
		increment = false;
		const oldHead = snake.body[snake.body.length - 1];

		const newHead: SnakeBodyPart = {
			x: oldHead.x,
			y: oldHead.y,
			key: oldHead.key + 1,
			direction: nextDirection
		};

		snake.direction = nextDirection;
		if (snake.direction === 'down') {
			newHead.x = (newHead.x + 1) % fieldHeight;
		} else if (snake.direction === 'right') {
			newHead.y = (newHead.y + 1) % fieldWidth;
		} else if (snake.direction === 'up') {
			newHead.x = newHead.x - 1;
			if (newHead.x < 0) newHead.x = fieldHeight - 1;
		} else if (snake.direction === 'left') {
			newHead.y = newHead.y - 1;
			if (newHead.y < 0) newHead.y = fieldWidth - 1;
		}

		snake.body.push(newHead);
		snake = snake;

		dispatch('move', snake.body);
	}

	export function restart() {
		nextDirection = 'down';
		snake = {
			direction: nextDirection as Direction,
			body: createInicialSnakeBody(5, nextDirection)
		};
	}

	export function incrementSize() {
		increment = true;
	}

	onMount(() => {
		restart();
	});

	function getDirectionNumber(direction: Direction) {
		switch (direction) {
			case 'up':
				return 0;
			case 'left':
				return 1;
			case 'down':
				return 2;
			default:
				return 3;
		}
	}

	function turnLeft(partBefore: SnakeBodyPart, partAfter: SnakeBodyPart) {
		return turnPart(partBefore, partAfter) === 'left';
	}

	function turnRight(partBefore: SnakeBodyPart, partAfter: SnakeBodyPart) {
		return turnPart(partBefore, partAfter) === 'right';
	}

	function turnPart(partBefore: SnakeBodyPart, partAfter: SnakeBodyPart) {
		return turn(partBefore.direction, partAfter.direction);
	}

	function turn(directionBefore: Direction, directionAfter: Direction) {
		if (directionBefore === directionAfter) {
			return '';
		}

		const directionBeforeNumber = getDirectionNumber(directionBefore);
		const directionAfterNumber = getDirectionNumber(directionAfter);

		if ((directionBeforeNumber + 1) % 4 === directionAfterNumber) {
			return 'left';
		}
		return 'right';
	}
</script>

{#each snake.body as part, index (part.key)}
	<Position {...part}>
		{#if index === snake.body.length - 1}
			<Head direction={part.direction} />
		{:else if index === 0}
			<BodyPart
				direction={part.direction}
				round={{
					frontLeft: turnRight(part, snake.body[index + 1]),
					frontRight: turnLeft(part, snake.body[index + 1]),
					bottonLeft: !turnLeft(part, snake.body[index + 1]),
					bottonRight: !turnRight(part, snake.body[index + 1])
				}}
			/>
		{:else}
			<BodyPart
				direction={part.direction}
				round={{
					frontLeft: turnRight(part, snake.body[index + 1]),
					frontRight: turnLeft(part, snake.body[index + 1])
				}}
			/>
		{/if}
	</Position>
{/each}
