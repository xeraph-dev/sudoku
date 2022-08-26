<script lang="ts">
  import type { Posn } from '../types'
  import Square from './Square.svelte'

  export let posn: Posn
</script>

<div>
  {#each Array(3).fill(0) as _, i}
    {#each Array(3).fill(0) as _, j}
      <Square posn={{ x: i + 3 * posn.x, y: j + 3 * posn.y }} />
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
