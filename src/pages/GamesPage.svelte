<script lang="ts">
  import { games, hasGame, page, savedGame, selected, sudoku } from '../stores'
  import _ from 'lodash'
  import { toHHMMSS } from '../utils'
  import type { Sudoku } from '../types'
  import DeleteIcon from '../lib/icons/DeleteIcon.svelte'
  import { Page } from '../enums'
  import { DateTime } from 'luxon'

  function toGame(game: Sudoku) {
    sudoku.set(game)
    hasGame.set(true)
    savedGame.set(true)
    selected.set(undefined)
    page.set(Page.Game)
  }
</script>

<section>
  <ul>
    {#each Object.values($games) as game}
      <li on:click={() => toGame(game)}>
        <span class="title">
          <h5>{_.capitalize(game.level)}</h5>
          <time>{DateTime.fromMillis(game.date).toFormat('dd/LL/yy')}</time>
        </span>
        <span class="timer"><strong>time</strong><time>{toHHMMSS(game.timer)}</time></span>
        <button type="button" on:click={() => games.deleteGame(game)}><DeleteIcon /></button>
      </li>
    {/each}
  </ul>
</section>

<style lang="postcss">
  ul {
    display: flex;
    flex-direction: column;
    gap: var(--size-3);
    list-style: none;
    padding: 0;
  }

  li {
    cursor: pointer;
    background-color: var(--surface-2);
    padding: var(--size-2);
    border-radius: var(--radius-2);
    box-shadow: var(--shadow-1);
    gap: var(--size-2);
    display: grid;
    grid-template-columns: 1fr auto;
    align-items: center;
    grid-template-areas:
      'title delete'
      'timer delete';

    &:hover {
      box-shadow: var(--shadow-2);
    }
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
