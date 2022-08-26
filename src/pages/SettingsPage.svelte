<script>
  import { theme } from '../stores'
</script>

<section>
  <ul>
    <li>
      <span>Theme</span>
      <select bind:value={$theme}>
        <option selected value="system">System</option>
        <option value="dark">Dark</option>
        <option value="light">Light</option>
      </select>
    </li>
  </ul>
</section>

<style lang="postcss">
  section {
    padding-inline: var(--size-2);
  }

  ul {
    padding: 0;
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: var(--size-2);
  }

  li {
    display: grid;
    grid-template-columns: 1fr auto;
    align-items: center;
  }
</style>
