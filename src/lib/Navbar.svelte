<script>
  import { Page } from '../enums'
  import { hasGame, page, selected, sudoku } from '../stores'
  import ArrowLeftIcon from './icons/ArrowLeftIcon.svelte'
  import DeleteIcon from './icons/DeleteIcon.svelte'

  async function deleteGame() {
    await sudoku.remove()
    hasGame.set(false)
    page.set(Page.Menu)
    selected.set(undefined)
  }
</script>

<header>
  {#if $page !== Page.Menu}
    <button type="button" on:click={() => page.set(Page.Menu)}><ArrowLeftIcon /></button>
  {/if}
  <div />
  {#if $page === Page.Game}
    <button type="button" on:click={deleteGame}><DeleteIcon /></button>
  {/if}
</header>

<style lang="postcss">
  header {
    grid-area: navbar;
    padding: var(--size-2) var(--size-3);
    display: flex;
    align-items: center;
  }

  div {
    flex-grow: 1;
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
