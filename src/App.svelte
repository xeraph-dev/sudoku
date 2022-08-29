<script lang="ts">
  import { onMount, onDestroy } from 'svelte'
  import Footer from './lib/Footer.svelte'
  import Navbar from './lib/Navbar.svelte'
  import { page, penActive, selected, sudoku, initStores } from './stores'
  import { Page } from './enums'
  import type { Move } from './types'
  import MenuPage from './pages/MenuPage.svelte'
  import GamePage from './pages/GamePage.svelte'
  import SettingsPage from './pages/SettingsPage.svelte'
  import LevelsPage from './pages/LevelsPage.svelte'
  import GamesPage from './pages/GamesPage.svelte'

  onMount(() => {
    document.addEventListener('keydown', event => {
      if (event.key.startsWith('Arrow')) selected.move(event.key.replace('Arrow', '').toLowerCase() as Move)
      else if (event.key.match(/^[1-9]$/)) sudoku.setValue(+event.key)
      else if (event.key === '0') penActive.set(!$penActive)
      else if (event.key === '.') sudoku.setLock(!$sudoku.data[$selected.row][$selected.col].locked)
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
      {:else if $page === Page.Games}
        <GamesPage />
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
    height: 100vh;
    grid-template-columns: auto;
    grid-template-rows: 40px 570px 30px;
    overflow: hidden;
    grid-template-areas:
      'navbar'
      'main'
      'footer';
  }

  main {
    grid-area: main;
  }

  :global(:where(*)) {
    user-select: none;
  }

  :global(:where(h1, h2, h3, h4, h5, h6, p, span, time, div)) {
    cursor: default;
  }
</style>
