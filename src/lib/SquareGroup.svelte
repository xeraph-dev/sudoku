<script lang="ts">
  import type { Posn } from '../types'
  import Square from './Square.svelte'

  export let posn: Posn
</script>

<div>
  {#each Array(3).fill(0) as _, row}
    {#each Array(3).fill(0) as _, col}
      <Square posn={{ row: row + 3 * posn.row, col: col + 3 * posn.col }} />
    {/each}
  {/each}
</div>

<style>
  div {
    display: grid;
    gap: var(--size-1);
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, 1fr);
  }
</style>
