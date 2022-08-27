<script lang="ts">
  import { onMount, onDestroy } from 'svelte'
  import Footer from './lib/Footer.svelte'
  import Navbar from './lib/Navbar.svelte'
  import { page, penActive, selected, sudoku, initStores } from './stores'
  import { Page } from './enums'
  import type { Move } from './types'
  import MenuPage from './pages/MenuPage.svelte'
  import GamePage from './pages/GamePage.svelte'
  import HelpPage from './pages/HelpPage.svelte'
  import SettingsPage from './pages/SettingsPage.svelte'
  import LevelsPage from './pages/LevelsPage.svelte'

  onMount(() => {
    document.addEventListener('keydown', event => {
      if (event.key.startsWith('Arrow')) selected.move(event.key.replace('Arrow', '').toLowerCase() as Move)
      else if (event.key.match(/^[1-9]$/)) sudoku.setValue(+event.key)
      else if (event.key === '0') penActive.set(!$penActive)
      else if (event.key === '.') sudoku.setLock(!$sudoku[$selected.row][$selected.col].locked)
    })
  })

  onDestroy(() => {
    document.removeEventListener('keydown', undefined)
  })
</script>

{#await initStores() then}
  <div>
    <Navbar />
    <main>
      {#if $page === Page.Menu}
        <MenuPage />
      {:else if $page === Page.Help}
        <HelpPage />
      {:else if $page === Page.Settings}
        <SettingsPage />
      {:else if $page === Page.Levels}
        <LevelsPage />
      {:else if $page === Page.Game}
        <GamePage />
      {/if}
    </main>
    <Footer />
  </div>
{/await}

<style lang="postcss">
  div {
    display: grid;
    max-height: 100vh;
    min-height: 100vh;
    overflow: hidden;
    gap: var(--size-2);
    grid-template-columns: auto;
    grid-template-rows: 40px 1fr 30px;
    grid-template-areas:
      'navbar'
      'main'
      'footer';
  }

  main {
    grid-area: main;
    padding: var(--size-3);
  }
</style>
