<script lang="ts">
  import { games, hasGame, page, selected, sudoku } from '../stores'
  import _ from 'lodash'
  import { toHHMMSS } from '../utils'
  import type { Sudoku } from '../types'
  import DeleteIcon from '../lib/icons/DeleteIcon.svelte'
  import { DateTime } from 'luxon'
  import { Page } from '../enums'

  function toGame(game: Sudoku) {
    sudoku.set(game)
    hasGame.set(true)
    selected.set(undefined)
    page.set(Page.Game)
  }

  function deleteGame(game: Sudoku) {
    games.deleteGame(game)
    if ($sudoku.uuid === game.uuid) {
      hasGame.set(false)
      selected.set(undefined)
    }
  }
</script>

<section>
  <ul>
    {#each Object.values($games) as game}
      <li>
        <div on:click={() => toGame(game)} />
        <span class="title">
          <h5>{_.capitalize(game.level)}</h5>
          <time>{DateTime.fromMillis(game.date).toFormat('dd/LL/yy')}</time>
        </span>
        <span class="timer"><strong>time</strong><time>{toHHMMSS(game.timer)}</time></span>
        <button type="button" on:click={() => deleteGame(game)}><DeleteIcon /></button>
      </li>
    {/each}
  </ul>
</section>

<style lang="postcss">
  section {
    padding: var(--size-3);
    max-height: 100%;

    overflow: hidden;
    overflow-y: auto;

    scrollbar-color: var(--surface-2) var(--surface-1);
    scrollbar-width: var(--border-size-4);
    scroll-behavior: smooth;

    &::-webkit-scrollbar {
      width: var(--border-size-4);
    }

    &::-webkit-scrollbar-track {
      background-color: var(--surface-1);
    }

    &::-webkit-scrollbar-thumb {
      background-color: var(--surface-3);
    }
  }
  ul {
    display: flex;
    flex-direction: column;
    gap: var(--size-3);
    list-style: none;
    padding: 0;
  }

  li {
    cursor: pointer;
    position: relative;
    background-color: var(--surface-2);
    padding: var(--size-2);
    border-radius: var(--radius-2);
    box-shadow: var(--shadow-1);
    gap: var(--size-2);
    display: grid;
    grid-template-columns: 1fr auto;
    overflow: hidden;
    align-items: center;
    grid-template-areas:
      'title delete'
      'timer delete';

    &:hover {
      box-shadow: var(--shadow-2);
    }
  }

  div {
    position: absolute;
    height: 100%;
    width: 100%;
    z-index: var(--layer-1);
  }

  .title {
    grid-area: title;
    display: flex;
    align-items: center;
    gap: var(--size-2);
    line-height: 1;
  }

  time {
    font-family: var(--font-mono);
    font-size: var(--font-size-1);
  }

  .timer {
    grid-area: timer;
    display: flex;
    align-items: center;
    gap: var(--size-2);
    line-height: 1;
  }

  button {
    grid-area: delete;
    padding: var(--size-2);
    aspect-ratio: var(--ratio-square);
    box-shadow: var(--inner-shadow-1);
    color: var(--red-6);
    z-index: var(--layer-2);

    &:hover {
      box-shadow: var(--shadow-2);
    }

    &:active {
      box-shadow: var(--inner-shadow-1);
    }
  }

  time {
    font-family: var(--font-mono);
  }
</style>
