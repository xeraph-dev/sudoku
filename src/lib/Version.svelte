<script>
  import { getVersion } from '@tauri-apps/api/app'
</script>

{#await getVersion() then version}
  <span>v{version}</span>
{/await}

<style lang="postcss">
  span {
    font-size: var(--font-size-0);
    font-family: var(--font-mono);
    display: flex;
    gap: var(--size-2);
    align-items: center;
  }
</style>
