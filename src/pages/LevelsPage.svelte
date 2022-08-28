<script lang="ts">
  import { Level, Levels, Page } from '../enums'
  import _ from 'lodash'
  import { hasGame, page, selected, sudoku } from '../stores'
  import { generateBoard } from '../generate'
  import CubeLoader from '../lib/loaders/CubeLoader.svelte'

  let loading = false

  function toLevel(level: Level) {
    loading = true
    sudoku.setBoard(generateBoard(level), level)
    hasGame.set(true)
    page.set(Page.Game)
    selected.set(undefined)
    loading = false
  }
</script>

<section>
  {#if loading}
    <CubeLoader />
  {:else}
    <ul>
      {#each Levels as level}
        <li><button type="button" on:click={() => toLevel(level)}>{_.capitalize(level)}</button></li>
      {/each}
    </ul>
  {/if}
</section>

<style lang="postcss">
  section {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }

  ul {
    display: flex;
    justify-content: center;
    flex-direction: column;
    list-style: none;
    gap: var(--size-3);
    padding: 0;
  }

  button {
    width: 100%;
    box-shadow: var(--inner-shadow-3);
    background-color: transparent;

    &:hover {
      background-color: var(--_border);
      box-shadow: var(--shadow-2);
    }
  }
</style>
