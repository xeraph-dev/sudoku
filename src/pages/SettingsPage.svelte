<script>
  import { lang, message, theme } from '../stores'
</script>

<section>
  <ul>
    <li>
      <span>{$message.Theme}</span>
      <select bind:value={$theme}>
        <option selected value="system">{$message.System}</option>
        <option value="dark">{$message.Dark}</option>
        <option value="light">{$message.Light}</option>
      </select>
    </li>
    <li>
      <span>{$message.Language}</span>
      <select bind:value={$lang}>
        <option selected value="en">English</option>
        <option value="es">Español</option>
      </select>
    </li>
  </ul>
</section>

<style lang="postcss">
  section {
    padding: var(--size-3);
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
