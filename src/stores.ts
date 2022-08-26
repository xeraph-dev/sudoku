import { get, writable } from 'svelte/store'
import { Store } from 'tauri-plugin-store-api'

import { Page, Theme } from './enums'
import type { Move, Posn, Sudoku } from './types'

const store = new Store('.settings.dat')

export const theme = (() => {
  const key = 'color-scheme'
  const { set: _set, subscribe } = writable(Theme.System)

  subscribe(async run => {
    await store.set(key, run)
    await store.save()
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
      const data = await store.get(key)
      if (data) theme.set(data as Theme)
    },
  }
})()

export const penActive = writable(false)

export const selected = (() => {
  const key = 'selected'
  const { set, subscribe, update } = writable<Posn>()

  subscribe(async run => {
    if (run) {
      await store.set(key, run)
      await store.save()
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
      const data = await store.get(key)
      if (data) set(data as Posn)
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
  const key = 'current-game'
  const { set, subscribe, update } = writable<Sudoku>(createSudoku())

  subscribe(async run => {
    await store.set(key, run)
    await store.save()
  })

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
    async init() {
      const data = await store.get(key)
      if (data) set(data as Sudoku)
    },
  }
})()

export const page = (() => {
  const key = 'page'
  const { set, subscribe, update } = writable<Page>(Page.Menu)

  subscribe(async run => {
    if (run === Page.Game) {
      await store.set(key, run)
      await store.save()
    } else {
      await store.delete(key)
      await store.save()
    }
  })

  return {
    set,
    update,
    subscribe,
    async init() {
      const data = await store.get(key)
      if (data) set(data as Page)
    },
  }
})()

export const initStores = async () => {
  await store.load()
  await theme.init()
  await page.init()
  await sudoku.init()
  await selected.init()
}
