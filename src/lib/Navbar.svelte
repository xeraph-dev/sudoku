<script lang="ts">
  import { Page } from '../enums'
  import { games, hasGame, page, selected, sudoku } from '../stores'
  import Grow from './Grow.svelte'
  import ArrowLeftIcon from './icons/ArrowLeftIcon.svelte'
  import CheckmarkCircleIcon from './icons/CheckmarkCircleIcon.svelte'
  import DeleteIcon from './icons/DeleteIcon.svelte'
  import _ from 'lodash'
  import { isSolved, sudokuToBoard } from '../generate'
  import { getName } from '@tauri-apps/api/app'

  let timeout
  let invalid = false

  async function checkGame() {
    clearTimeout(timeout)
    if (isSolved(sudokuToBoard($sudoku))) {
      await sudoku.remove()
      games.deleteGame($sudoku)
      hasGame.set(false)
      selected.set(undefined)
      page.set(Page.Levels)
    } else {
      invalid = true
      timeout = setTimeout(() => {
        invalid = false
        clearTimeout(timeout)
      }, 2000)
    }
  }

  async function deleteGame() {
    await sudoku.remove()
    games.deleteGame($sudoku)
    hasGame.set(false)
    selected.set(undefined)
    page.set(Page.Menu)
  }
</script>

<header data-tauri-drag-region>
  {#if $page !== Page.Menu}
    <button type="button" on:click={() => page.set(Page.Menu)} title="Go back to menu"><ArrowLeftIcon /></button>
  {/if}
  {#await getName() then name}
    <h4 data-tauri-drag-region>
      {#if $page === Page.Game}
        {_.capitalize($sudoku.level)}
      {:else if $page === Page.Menu}
        {_.capitalize(name)}
      {:else}
        {_.capitalize($page)}
      {/if}
    </h4>
  {/await}
  <Grow />
  {#if $page === Page.Game}
    <button type="button" on:click={checkGame} class:invalid title="Check game and finish if valid">
      <CheckmarkCircleIcon />
    </button>
    <button type="button" on:click={deleteGame} title="Delete game"><DeleteIcon /></button>
  {/if}
</header>

<style lang="postcss">
  header {
    grid-area: navbar;
    padding: var(--size-2) var(--size-3);
    display: flex;
    align-items: center;
    gap: var(--size-2);
  }

  h4 {
    padding-left: var(--size-2);
    cursor: default;
  }

  :global(html[color-scheme='dark']) {
    button {
      --invalid: var(--invalid-dark);
    }
  }

  :global(html[color-scheme='light']) {
    button {
      --invalid: var(--invalid-light);
    }
  }

  button {
    aspect-ratio: var(--ratio-square);
    padding: var(--size-1);
    border-radius: var(--radius-round);
    background-color: transparent;
    box-shadow: var(--inner-shadow-2);
    transition: none;
    --invalid-dark: var(--red-7);
    --invalid-light: var(--red-1);
    --invalid: var(--invalid-light);

    @media (--OSdark) {
      --invalid: var(--invalid-dark);
    }

    &:hover {
      background-color: var(--_border);
      box-shadow: var(--shadow-2);
    }

    &.invalid {
      background-color: var(--invalid);
      border-color: var(--invalid);
      box-shadow: var(--shadow-2);
    }
  }
</style>
