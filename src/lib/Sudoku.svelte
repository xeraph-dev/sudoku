<script>
  import SquareGroup from './SquareGroup.svelte'
</script>

<div>
  {#each Array(3).fill(0) as _, row}
    {#each Array(3).fill(0) as _, col}
      <SquareGroup posn={{ row, col }} />
      {#if col < 2}
        <span />
      {/if}
    {/each}
    {#if row < 2}
      <span />
      <span class="middle" />
      <span />
      <span class="middle" />
      <span />
    {/if}
  {/each}
</div>

<style lang="postcss">
  div {
    display: grid;
    gap: var(--size-2);
    grid-template-columns: 1fr 1px 1fr 1px 1fr;
    grid-template-rows: 1fr 1px 1fr 1px 1fr;
  }

  :global(html[color-scheme='dark']) {
    span {
      --divide: var(--divide-dark);
    }
  }

  :global(html[color-scheme='light']) {
    span {
      --divide: var(--divide-light);
    }
  }

  span {
    --divide-light: var(--orange-3);
    --divide-dark: var(--gray-6);
    --divide: var(--divide-light);
    background-color: var(--divide);
    border-radius: var(--radius-round);

    @media (--OSdark) {
      --divide: var(--divide-dark);
    }

    &.middle {
      background-color: transparent;
      position: relative;

      &:after {
        content: '';
        display: flex;
        top: var(--size-00);
        left: var(--size-00);
        right: var(--size-00);
        bottom: var(--size-00);
        border: 1px solid var(--divide);
        border-radius: var(--radius-round);
        box-shadow: var(--inner-shadow-1);
        position: absolute;
      }
    }
  }
</style>
