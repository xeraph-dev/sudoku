<script>
  import SquareGroup from './SquareGroup.svelte'
</script>

<div>
  {#each Array(3).fill(0) as _, row}
    {#each Array(3).fill(0) as _, col}
      <SquareGroup posn={{ row, col }} />
    {/each}
  {/each}
</div>

<style>
  div {
    display: grid;
    gap: var(--size-2);
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, 1fr);
  }
</style>
