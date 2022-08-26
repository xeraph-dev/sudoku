<script>
  import SquareGroup from './SquareGroup.svelte'
</script>

<div>
  {#each Array(3).fill(0) as _, i}
    {#each Array(3).fill(0) as _, j}
      <SquareGroup posn={{ x: i, y: j }} />
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
