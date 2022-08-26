<script>
  import { exit } from '@tauri-apps/api/process'
  import { Page } from '../enums'
  import { page } from '../stores'
</script>

<section>
  <ul>
    <li><button type="button" on:click={() => page.set(Page.Levels)}>New game</button></li>
    <li><button type="button" on:click={() => page.set(Page.Game)}>Continue</button></li>
    <li><button type="button" on:click={() => page.set(Page.Settings)}>Settings</button></li>
    <li><button type="button" on:click={() => exit(0)}>Exit</button></li>
  </ul>
</section>

<style>
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
  }

  button:hover {
    background-color: var(--gray-7);
    box-shadow: var(--shadow-2);
  }
</style>
