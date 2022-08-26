export interface Posn {
  x: number
  y: number
}

export type Move = 'left' | 'right' | 'up' | 'down'

export type SudokuKey = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 'locked' | 'default'

export type Sudoku = Record<SudokuKey, boolean>[][]

export type Board = number[][]

export type Coordinate = [number, number]
