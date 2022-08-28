<script lang="ts">
  import { toHHMMSS } from '../utils'

  import { Page } from '../enums'
  import { gamePaused, page, sudoku } from '../stores'
  import PauseIcon from './icons/PauseIcon.svelte'
  import PlayIcon from './icons/PlayIcon.svelte'

  $: timer = toHHMMSS($sudoku.timer)
</script>

{#if $page === Page.Game}
  <div>
    <time>{timer}</time>
    <button type="button" on:click={() => gamePaused.set(!$gamePaused)}>
      {#if $gamePaused}
        <PlayIcon />
      {:else}
        <PauseIcon />
      {/if}
    </button>
  </div>
{/if}

<style>
  div {
    font-size: var(--font-size-0);
    font-family: var(--font-mono);
    display: flex;
    gap: var(--size-2);
    align-items: center;
  }

  button {
    padding: 0;
    box-shadow: var(--shadow-2);
  }
</style>
