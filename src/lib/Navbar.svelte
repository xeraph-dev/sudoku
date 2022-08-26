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

<style lang="postcss">
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

    &:hover {
      background-color: var(--_border);
      box-shadow: var(--shadow-2);
    }
  }
</style>
