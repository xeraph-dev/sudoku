<script>
  import { Page } from '../enums'
  import { page } from '../stores'
  import ArrowLeftIcon from './icons/ArrowLeftIcon.svelte'
</script>

<header>
  {#if $page !== Page.Menu}
    <button type="button" on:click={() => page.set(Page.Menu)}><ArrowLeftIcon /></button>
  {/if}
</header>

<style>
  header {
    grid-area: navbar;
    padding: var(--size-2) var(--size-3);
  }

  button {
    aspect-ratio: var(--ratio-square);
    padding: var(--size-1);
    border-radius: var(--radius-round);
    background-color: transparent;
    box-shadow: var(--inner-shadow-2);
  }

  button:hover {
    background-color: var(--gray-7);
    box-shadow: var(--shadow-2);
  }
</style>
