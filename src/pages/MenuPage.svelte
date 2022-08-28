<script>
  import { exit } from '@tauri-apps/api/process'
  import { Page } from '../enums'
  import { gamesSize, hasGame, page } from '../stores'
</script>

<section>
  <ul>
    <li><button type="button" on:click={() => page.set(Page.Levels)}>New game</button></li>
    {#if $hasGame}
      <li><button type="button" on:click={() => page.set(Page.Game)}>Continue</button></li>
    {/if}
    {#if $gamesSize}
      <li><button type="button" on:click={() => page.set(Page.Games)}>Games</button></li>
    {/if}
    <li><button type="button" on:click={() => page.set(Page.Settings)}>Settings</button></li>
    <li><button type="button" on:click={() => exit(0)}>Exit</button></li>
  </ul>
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

    &:active {
      box-shadow: var(--inner-shadow-3);
    }
  }
</style>
