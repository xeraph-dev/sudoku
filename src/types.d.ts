import type { Level } from './enums'

export interface Posn {
  col: number
  row: number
}

export type Move = 'left' | 'right' | 'up' | 'down'

export type SudokuNum = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9

export interface SudokuCell extends Record<SudokuNum, boolean> {
  default: boolean
  invalid: Record<SudokuNum, boolean>
  locked: boolean
}

export interface Sudoku {
  data: SudokuCell[][]
  date: number
  level?: Level
  timer: number
  uuid: string
}

export type Board = number[][]

export type Games = Record<string, Sudoku>
