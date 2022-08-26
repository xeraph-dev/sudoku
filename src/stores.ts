import { get, writable } from 'svelte/store'

import { Page, Theme } from './enums'
import { storage } from './storage'
import type { Board, Move, Posn, Sudoku } from './types'

export const theme = (() => {
  const key = 'color-scheme'
  const { set: _set, subscribe } = writable(Theme.System)

  subscribe(async run => {
    await storage.set(key, run)
    await storage.save()
  })

  return {
    subscribe,
    set(value: Theme) {
      if (value === Theme.System)
        document.documentElement.removeAttribute('color-scheme')
      else document.documentElement.setAttribute('color-scheme', value)
      _set(value)
    },
    async init() {
      const data = await storage.get<Theme>(key)
      if (data) theme.set(data)
    },
  }
})()

export const penActive = writable(false)

export const selected = (() => {
  const key = 'selected'
  const { set, subscribe, update } = writable<Posn>()

  subscribe(async run => {
    if (run) {
      await storage.set(key, run)
      await storage.save()
    }
  })

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
    async init() {
      const data = await storage.get<Posn>(key)
      if (data) set(data)
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
          default: false,
        })
    }
  }

  return sudoku
}

export const sudoku = (() => {
  const key = 'current-game'
  const { set, subscribe, update } = writable<Sudoku>(createSudoku())

  subscribe(async run => {
    await storage.set(key, run)
    await storage.save()
  })

  return {
    subscribe,
    set,
    setBoard(board: Board) {
      update(n => {
        n = createSudoku()
        board.forEach((rows, x) => {
          rows.forEach((v, y) => {
            if (v) {
              n[x][y].default = true
              n[x][y][v] = true
            }
          })
        })

        return n
      })
    },
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
            if (!curr.locked && !curr.default) {
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
    async init() {
      const data = await storage.get<Sudoku>(key)
      if (data) set(data)
    },
  }
})()

export const page = (() => {
  const key = 'page'
  const { set, subscribe, update } = writable<Page>(Page.Menu)

  subscribe(async run => {
    if (run === Page.Game) {
      await storage.set(key, run)
      await storage.save()
    } else {
      await storage.delete(key)
      await storage.save()
    }
  })

  return {
    set,
    update,
    subscribe,
    async init() {
      const data = await storage.get<Page>(key)
      if (data) set(data)
    },
  }
})()

export const hasGame = (() => {
  const key = 'has-game'
  const { set, subscribe, update } = writable(false)

  subscribe(async run => {
    await storage.set(key, run)
    await storage.save()
  })

  return {
    set,
    subscribe,
    update,
    async init() {
      const data = await storage.get<boolean>(key)
      if (data) set(data)
    },
  }
})()

export const initStores = async () => {
  await storage.load()
  await theme.init()
  await page.init()
  await sudoku.init()
  await hasGame.init()
  await selected.init()
}
