import { random, range, sample, shuffle } from 'lodash'

import { type Level, Levels } from './enums'
import type { Board, Coordinate } from './types'

const clone = (arg: unknown) => JSON.parse(JSON.stringify(arg))

const BLANK = Array(9).fill(Array(9).fill(0))

const newBoxRange = () => Array.from({ length: 9 }).map((_, i) => i + 1)

const newBoard = () => clone(BLANK)

const isValidCell = (board: Board, num: number, coor: Coordinate): boolean => {
  const [row, col] = coor

  if (board[row].includes(num)) return false

  const cols = board.map(r => r[col])

  if (cols.includes(num)) return false

  const boxRow = Math.floor(row / 3)
  const boxCol = Math.floor(col / 3)

  const boxes = board
    .slice(boxRow * 3, (boxRow + 1) * 3)
    .flatMap(b => b.slice(boxCol * 3, (boxCol + 1) * 3))

  if (boxes.includes(num)) return false

  return true
}

const isValidBoard = (board: Board): boolean => {
  const rowsValid = areRowsValid(board)

  const invertedRows = clone(board)

  for (const row of range(board.length)) {
    for (const col of range(board[0].length)) {
      invertedRows[col][row] = board[row][col]
    }
  }

  const colsValid = areRowsValid(invertedRows)

  /** @type {Board} */
  const boxes = []

  for (const row of range(3)) {
    for (const col of range(3)) {
      boxes.push(
        board
          .slice(row * 3, (row + 1) * 3)
          .flatMap((/** @type {number[]} */ b) =>
            b.slice(col * 3, (col + 1) * 3),
          ),
      )
    }
  }

  const boxesValid = areRowsValid(boxes)

  return rowsValid && colsValid && boxesValid
}

const isSolved = (board: Board): boolean =>
  !findSpace(board) && isValidBoard(board)

const areRowsValid = (board: Board): boolean =>
  !board
    .map(row => {
      const rowV = row.filter(Boolean)
      const rowU = new Set(rowV)
      return rowV.length === rowU.size
    })
    .some(v => v === false)

const findSpace = (board: Board): Coordinate => {
  for (const row of range(9)) {
    for (const col of range(9)) {
      if (!board[row][col]) {
        return [row, col]
      }
    }
  }
}

const solveBoard = (board: Board): Board => {
  if (isSolved(board)) return board

  const space = findSpace(board)

  if (space) {
    const [row, col] = space

    const nums = shuffle(range(1, 10))

    for (const num of nums) {
      const rboard = clone(board)
      if (isValidCell(rboard, num, space)) {
        rboard[row][col] = num
        const sboard = solveBoard(rboard)
        if (sboard) return sboard
      }
    }
  }
}

const generateBaseBoard = (): Board => {
  const board = newBoard()

  for (const box of range(3)) {
    const nums = newBoxRange()
    const min = box * 3
    const max = (box + 1) * 3

    for (const row of range(min, max)) {
      for (const col of range(min, max)) {
        const num = sample(nums)
        board[row][col] = num
        nums.splice(nums.indexOf(num), 1)
      }
    }
  }

  return board
}

export const generateBoard = (level: Level): Board => {
  let board = generateBaseBoard()
  const solved = solveBoard(board)

  if (solved) {
    board = clone(solved)
    let count = Levels.indexOf(level) * 12 + 32

    while (count) {
      const row = random(0, 8)
      const col = random(0, 8)

      if (board[row][col]) {
        board[row][col] = 0
        count--
      }
    }
  }

  return board
}
