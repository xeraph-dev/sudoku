<script lang="ts">
  import CloseIcon from './icons/CloseIcon.svelte'

  export let open = false
</script>

{#if open}
  <div class="backdrop" on:click={() => (open = false)} />
  <dialog>
    <div>
      <button type="button" on:click={() => (open = false)}><CloseIcon /></button>
      <div>
        <slot />
      </div>
    </div>
  </dialog>
{/if}

<style lang="postcss">
  .backdrop {
    background-color: var(--gray-8);
    backdrop-filter: blur(4px);
    opacity: 0.4;
    position: absolute;
    z-index: var(--layer-4);
    height: 100vh;
    width: 100vw;
  }

  dialog {
    position: absolute;
    height: 100vh;
    width: 100vw;
    display: flex;
    background-color: transparent;
    padding: var(--size-6);

    & > div {
      z-index: var(--layer-5);
      position: relative;
      height: 100%;
      width: 100%;
      background-color: transparent;
      display: flex;
      justify-content: center;
      align-items: center;

      & > button {
        position: absolute;
        top: var(--size-2);
        right: var(--size-2);
        padding: var(--size-0);
        box-shadow: var(--shadow-1);
        font-size: var(--font-size-0);
      }

      & > div {
        background-color: var(--surface-1);
        border-radius: var(--radius-3);
        box-shadow: var(--shadow-2);
        padding: var(--size-3);
        height: 100%;
        width: 100%;
      }
    }
  }
</style>
