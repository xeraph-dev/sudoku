<script>
  import { Page } from '../enums'
  import { games, hasGame, page, selected, sudoku } from '../stores'
  import Grow from './Grow.svelte'
  import ArrowLeftIcon from './icons/ArrowLeftIcon.svelte'
  import CheckmarkCircleIcon from './icons/CheckmarkCircleIcon.svelte'
  import DeleteIcon from './icons/DeleteIcon.svelte'
  import SaveIcon from './icons/SaveIcon.svelte'
  import _ from 'lodash'

  function checkGame() {
    //
  }

  async function saveGame() {
    games.setGame($sudoku)
    await deleteGame()
  }

  async function deleteGame() {
    await sudoku.remove()
    hasGame.set(false)
    page.set(Page.Menu)
    selected.set(undefined)
  }
</script>

<header data-tauri-drag-region>
  {#if $page !== Page.Menu}
    <button type="button" on:click={() => page.set(Page.Menu)} title="Go back to menu"><ArrowLeftIcon /></button>
  {/if}
  {#if $page === Page.Game}
    <h4 data-tauri-drag-region>{_.capitalize($sudoku.level)}</h4>
  {/if}
  <Grow />
  {#if $page === Page.Game}
    <button type="button" on:click={checkGame} title="Check game and finish if valid"><CheckmarkCircleIcon /></button>
    <button type="button" on:click={saveGame} title="Save game to play later"><SaveIcon /></button>
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

  button {
    aspect-ratio: var(--ratio-square);
    padding: var(--size-1);
    border-radius: var(--radius-round);
    background-color: transparent;
    box-shadow: var(--inner-shadow-2);

    &:hover {
      background-color: var(--_border);
      box-shadow: var(--shadow-2);
    }
  }
</style>
