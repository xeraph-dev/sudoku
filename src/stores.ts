import { get, writable } from 'svelte/store'

import { Page } from './enums'
import type { Move, Posn, Sudoku } from './types'

export const penActive = writable(false)

export const selected = (() => {
  const { set, subscribe, update } = writable<Posn>()

  return {
    subscribe,
    set,
    move(move: Move) {
      update(n =>
        !n
          ? { x: 0, y: 0 }
          : move === 'left'
          ? { ...n, y: n.y > 0 ? n.y - 1 : 0 }
          : move === 'right'
          ? { ...n, y: n.y < 8 ? n.y + 1 : 8 }
          : move === 'up'
          ? { ...n, x: n.x > 0 ? n.x - 1 : 0 }
          : move === 'down'
          ? { ...n, x: n.x < 8 ? n.x + 1 : 0 }
          : n,
      )
    },
  }
})()

const createSudoku = () => {
  const sudoku: Sudoku = []

  for (let x = 0; x <= 8; x++) {
    sudoku[x] = []
    for (let y = 0; y <= 8; y++) {
      sudoku[x][y] = Array(9)
        .fill(false)
        .reduce((acc, curr, i) => ({ ...acc, [i + 1]: curr }), {
          locked: false,
        })
    }
  }

  return sudoku
}

export const sudoku = (() => {
  const { set, subscribe, update } = writable<Sudoku>(createSudoku())

  return {
    subscribe,
    set,
    setLock(lock: boolean) {
      const $selected = get(selected)
      update(n => {
        const curr = n[$selected.x][$selected.y]
        if (
          Object.entries(curr).filter(([k, v]) => k.match(/^[1-9]$/) && v)
            .length === 1
        ) {
          curr.locked = lock
        }
        return n
      })
    },
    setValue(value: number) {
      if (value >= 1 && value <= 9) {
        const $selected = get(selected)
        const $penActive = get(penActive)

        if ($selected)
          update(n => {
            const curr = n[$selected.x][$selected.y]
            if (!curr.locked) {
              const prev = curr[value]
              if (!$penActive) {
                Array(9)
                  .fill(false)
                  .forEach((_, i) => {
                    curr[i + 1] = false
                  })
              }
              curr[value] = !prev
            }
            return n
          })
      }
    },
  }
})()

export const page = writable<Page>(Page.Menu)
