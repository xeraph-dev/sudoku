<script>
  import PenIcon from './icons/PenIcon.svelte'
  import { penActive, sudoku, selected } from '../stores'
  import LockOpen from './icons/LockOpen.svelte'
  import LockClose from './icons/LockClose.svelte'

  $: curr = $selected ? $sudoku[$selected.x][$selected.y] : { locked: false, default: false }
  $: isNum = Object.entries(curr).filter(([k, v]) => k.match(/^[1-9]$/) && v).length === 1
</script>

<div>
  {#each Array(9) as _, i}
    <button type="button" class="num" data-num={i + 1} on:click={() => sudoku.setValue(i + 1)}>{i + 1}</button>
  {/each}
  <button type="button" class="pen" class:active={$penActive} on:click={() => penActive.set(!$penActive)}>
    <PenIcon />
  </button>
  <button
    type="button"
    class="lock"
    class:active={curr.locked}
    on:click={() => sudoku.setLock(!curr.locked)}
    disabled={!($selected && isNum) || curr.default}
  >
    {#if curr.locked}
      <LockClose />
    {:else}
      <LockOpen />
    {/if}
  </button>
</div>

<style lang="postcss">
  :global(html[color-scheme='dark']) {
    button {
      --bg: var(--bg-dark);
    }
  }

  :global(html[color-scheme='light']) {
    button {
      --bg: var(--bg-light);
    }
  }

  div {
    place-self: center;
    display: grid;
    gap: var(--size-2);
    grid-template-columns: repeat(3, var(--size-8));
    grid-template-rows: repeat(3, var(--size-8));
    grid-template-areas:
      'num7 num8 num9'
      'num4 num5 num6'
      'num1 num2 num3'
      'pen . lock';
  }

  button {
    --bg-dark: var(--violet-9);
    --bg-light: var(--violet-1);
    --bg: var(--bg-light);
    aspect-ratio: var(--ratio-square);
    font-size: var(--font-size-2);
    padding: var(--size-2);
    transition: box-shadow 145ms var(--ease-4);
    border-width: var(--border-size-1);
    border-style: solid;
    font-family: var(--font-mono);

    @media (--OSdark) {
      --bg: var(--bg-dark);
    }

    &:not(:disabled) {
      border-color: var(--bg);
      background-color: transparent;
      box-shadow: var(--inner-shadow-2);
    }

    &:not(:is(:disabled, .pen, .lock)):hover {
      background-color: var(--bg);
      box-shadow: var(--shadow-2);
    }

    &:active {
      box-shadow: var(--shadow-1);
    }

    &.pen {
      grid-area: pen;
    }

    &.lock {
      grid-area: lock;
    }

    &.num {
      grid-area: num;
    }

    &:is(.pen, .lock).active {
      background-color: var(--bg);
      box-shadow: var(--shadow-2);
    }

    &.num {
      &[data-num='1'] {
        grid-area: num1;
      }

      &[data-num='2'] {
        grid-area: num2;
      }

      &[data-num='3'] {
        grid-area: num3;
      }

      &[data-num='4'] {
        grid-area: num4;
      }

      &[data-num='5'] {
        grid-area: num5;
      }

      &[data-num='6'] {
        grid-area: num6;
      }

      &[data-num='7'] {
        grid-area: num7;
      }

      &[data-num='8'] {
        grid-area: num8;
      }

      &[data-num='9'] {
        grid-area: num9;
      }
    }
  }
</style>
