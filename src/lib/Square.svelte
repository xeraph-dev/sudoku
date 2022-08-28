<script lang="ts">
  import type { Posn } from '../types'
  import { selected, sudoku } from '../stores'
  import _ from 'lodash'

  export let posn: Posn

  $: curr = $sudoku.data[posn.row][posn.col]
  $: isNum = Object.entries(curr).filter(([k, v]) => k.match(/^[1-9]$/) && v).length === 1
  $: num = Object.entries(curr).find(([k, v]) => k.match(/^[1-9]$/) && v)?.[0]
</script>

<div
  class="root"
  class:selected={_.isEqual($selected, posn)}
  class:locked={curr.locked}
  class:default={curr.default}
  class:invalid={isNum && curr.invalid[num]}
>
  <div on:click={() => selected.set(posn)} class:isNum>
    {#if isNum}
      <span>{num}</span>
    {:else}
      {#each Object.entries(curr) as [k, v]}
        {#if k.match(/^[1-9]$/) && v}
          <span data-num={k} class:invalid={!isNum && curr.invalid[k]}>{k}</span>
        {/if}
      {/each}
    {/if}
  </div>
</div>

<style lang="postcss">
  :global(html[color-scheme='dark']) {
    .root {
      --bg: var(--bg-dark);
      --lock: var(--lock-dark);
      --default: var(--default-dark);
      --invalid: var(--invalid-dark);
    }
  }

  :global(html[color-scheme='light']) {
    .root {
      --bg: var(--bg-light);
      --lock: var(--lock-light);
      --default: var(--default-light);
      --invalid: var(--invalid-light);
    }
  }

  .root {
    --bg-dark: var(--indigo-9);
    --lock-dark: var(--gray-8);
    --default-dark: var(--gray-7);
    --invalid-dark: var(--red-7);
    --bg-light: var(--indigo-1);
    --lock-light: var(--gray-4);
    --default-light: var(--gray-1);
    --invalid-light: var(--red-1);
    --bg: var(--bg-light);
    --lock: var(--lock-light);
    --default: var(--default-light);
    --invalid: var(--invalid-light);
    position: relative;
    border: var(--border-size-1) solid var(--bg);
    box-shadow: var(--inner-shadow-2);
    aspect-ratio: var(--ratio-square);
    border-radius: var(--radius-2);
    transition: box-shadow 145ms var(--ease-4);

    @media (--OSdark) {
      --bg: var(--bg-dark);
      --lock: var(--lock-dark);
      --default: var(--default-dark);
      --invalid: var(--invalid-dark);
    }

    &.selected {
      background-color: var(--bg);
      box-shadow: var(--shadow-2);
    }

    &.locked {
      background-color: var(--lock);
      border-color: var(--lock);
      box-shadow: none;

      &.selected {
        border-color: var(--bg);
        box-shadow: var(--shadow-2);
      }
    }

    &.default {
      background-color: var(--default);
      border-color: var(--default);
      box-shadow: none;

      &.selected {
        border-color: var(--bg);
        box-shadow: var(--shadow-2);
      }
    }

    &.invalid {
      background-color: var(--invalid);
      border-color: var(--invalid);
      box-shadow: none;

      &.selected {
        border-color: var(--bg);
        box-shadow: var(--shadow-2);
      }
    }

    & > div {
      position: absolute;
      display: grid;
      place-items: center;
      padding: var(--size-1);
      height: 100%;
      width: 100%;

      & > span {
        line-height: 0;
        font-family: var(--font-mono);
      }

      &.isNum > span {
        font-size: var(--font-size-4);
      }

      &:not(.isNum) {
        grid-template-columns: 1fr 1fr 1fr;
        grid-template-rows: 1fr 1fr 1fr;
        grid-template-areas:
          'num7 num8 num9'
          'num4 num5 num6'
          'num1 num2 num3';

        & > span {
          font-size: 8px;

          &.invalid {
            color: var(--invalid-dark);
          }

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
    }
  }
</style>
