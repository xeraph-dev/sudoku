<script>
  import { gamePaused } from '../stores'
  import Keyboard from '../lib/Keyboard.svelte'
  import Sudoku from '../lib/Sudoku.svelte'
</script>

<section>
  {#if $gamePaused}
    <div />
    <h2>Paused</h2>
  {/if}
  <Sudoku />
  <Keyboard />
</section>

<style>
  section {
    display: flex;
    flex-direction: column;
    gap: var(--size-3);
    position: relative;
  }

  div {
    position: absolute;
    top: var(--size-000);
    left: var(--size-000);
    right: var(--size-000);
    bottom: var(--size-000);
    background-color: var(--surface-2);
    z-index: var(--layer-4);
    border-radius: var(--radius-2);
    opacity: 0.1;
    backdrop-filter: blur(4px);
    box-shadow: var(--shadow-2);
  }

  h2 {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: var(--surface-1);
    padding: var(--size-2);
    border-radius: var(--radius-2);
    box-shadow: var(--shadow-2);
    z-index: var(--layer-5);
  }
</style>
