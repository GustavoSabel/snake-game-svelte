import type { Direction } from "./Direction";
import type { Position } from "./Position";

export type SnakeType = {
  direction: Direction;
  body: SnakeBody;
}

export type SnakeBody = SnakeBodyPart[]

export type Turn = 'left' | 'right'

export type SnakeBodyPart = Position & { key: number, direction: Direction; willTurn?: Turn }