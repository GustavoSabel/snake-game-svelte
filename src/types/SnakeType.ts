import type { Direction } from "./Direction";

export type SnakeType = {
  direction: Direction;
  body: SnakeBody;
}

export type SnakeBody = SnakeBodyPart[]

export type Turn = 'left' | 'right'

export type SnakeBodyPart = { x: number; y: number; key: number, direction: Direction; willTurn?: Turn }