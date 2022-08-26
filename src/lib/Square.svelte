<script lang="ts">
  import type { Posn } from '../types'
  import { selected, sudoku } from '../stores'
  import _ from 'lodash'

  export let posn: Posn

  $: curr = $sudoku[posn.x][posn.y]
  $: isNum = Object.entries(curr).filter(([k, v]) => k.match(/^[1-9]$/) && v).length === 1
  $: num = Object.entries(curr).find(([k, v]) => k.match(/^[1-9]$/) && v)?.[0]
</script>

<div class="root" class:selected={_.isEqual($selected, posn)} class:locked={curr.locked}>
  <div on:click={() => selected.set(posn)} class:isNum>
    {#if isNum}
      <span>{num}</span>
    {:else}
      {#each Object.entries(curr) as [k, v]}
        {#if k.match(/^[1-9]$/) && v}
          <span data-num={k}>{k}</span>
        {/if}
      {/each}
    {/if}
  </div>
</div>

<style>
  .root {
    position: relative;
    --color: var(--indigo-9);
    border: var(--border-size-1) solid var(--color);
    box-shadow: var(--inner-shadow-4);
    aspect-ratio: var(--ratio-square);
    border-radius: var(--radius-2);
    transition: box-shadow 145ms var(--ease-4);
  }

  .root.selected {
    background-color: var(--color);
    box-shadow: var(--shadow-2);
  }

  .root > div {
    position: absolute;
    display: grid;
    place-items: center;
    padding: var(--size-1);
    height: 100%;
    width: 100%;
  }

  .root > div > span {
    line-height: 0;
  }

  .root.locked {
    background-color: var(--gray-8);
    border-color: var(--gray-8);
    box-shadow: none;
  }

  .root.locked.selected {
    border: var(--border-size-1) solid var(--color);
    box-shadow: var(--shadow-2);
  }

  .root > div.isNum > span {
    font-size: var(--font-size-4);
  }

  .root > div:not(.isNum) {
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr;
    grid-template-areas:
      'num7 num8 num9'
      'num4 num5 num6'
      'num1 num2 num3';
  }

  .root > div:not(.isNum) span {
    font-size: 8px;
  }

  .root > div:not(.isNum) > span[data-num='1'] {
    grid-area: num1;
  }

  .root > div:not(.isNum) > span[data-num='2'] {
    grid-area: num2;
  }

  .root > div:not(.isNum) > span[data-num='3'] {
    grid-area: num3;
  }

  .root > div:not(.isNum) > span[data-num='4'] {
    grid-area: num4;
  }

  .root > div:not(.isNum) > span[data-num='5'] {
    grid-area: num5;
  }

  .root > div:not(.isNum) > span[data-num='6'] {
    grid-area: num6;
  }

  .root > div:not(.isNum) > span[data-num='7'] {
    grid-area: num7;
  }

  .root > div:not(.isNum) > span[data-num='8'] {
    grid-area: num8;
  }

  .root > div:not(.isNum) > span[data-num='9'] {
    grid-area: num9;
  }
</style>
