import type { Level } from './enums'

export interface Posn {
  col: number
  row: number
}

export type Move = 'left' | 'right' | 'up' | 'down'

export type SudokuKey =
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 'locked'
  | 'default'
  | 'invalid'

export type Sudoku = {
  data: Record<SudokuKey, boolean>[][]
  date: number
  level?: Level
  timer: number
  uuid: string
}

export type Board = number[][]

export type Games = Record<string, Sudoku>
